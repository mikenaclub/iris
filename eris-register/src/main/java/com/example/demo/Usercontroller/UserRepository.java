package com.example.demo.Usercontroller;

import com.example.demo.HashingPassword.BCrypt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Created by STR02119 on 7/18/2017.
 */
@Repository
public class UserRepository {

    private BCrypt bCrypt = new BCrypt();
    private JdbcTemplate jdbcTemplate = new JdbcTemplate();

    @Autowired
    public UserRepository(BCrypt bCrypt, JdbcTemplate jdbcTemplate) {
        this.bCrypt = bCrypt;
        this.jdbcTemplate = jdbcTemplate;
    }

    public List<UserModel> queryall() {
        List<UserModel> user = jdbcTemplate.query(
                "SELECT id,username,password FROM user",
                (rs, rowNum) -> (new UserModel(rs.getInt("id"),
                        rs.getString("username"), rs.getString("password")))
        );
        return user;
    }

    public boolean register(UserModel user) {
        try {
            jdbcTemplate.update("INSERT INTO user (username,password) VALUE (?,?)",
                    new Object[]{user.getUsername(), bCrypt.encode(user.getPassword())});
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    public boolean login(UserModel user) {
        try {
            UserModel datafromdatabase = (UserModel) jdbcTemplate.queryForObject("SELECT * FROM user WHERE username = ?"
                    , new Object[]{user.getUsername()}, (rs, rowNum) -> new UserModel(rs.getInt("id"),
                            rs.getString("username"), rs.getString("password")));
            if (datafromdatabase != null) {
                return bCrypt.matchpass(user.getPassword(), datafromdatabase.getPassword());
            } else
                return false;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
        /*System.out.println(datafromdatabase.getPassword());
        System.out.println(user.getPassword());
        System.out.println(bCrypt.matchpass(user.getPassword(), datafromdatabase.getPassword()));*/
        /*if (datafromdatabase != null) {
            return bCrypt.matchpass(user.getPassword(), datafromdatabase.getPassword());
        } else
            return false;*/

    }
}
