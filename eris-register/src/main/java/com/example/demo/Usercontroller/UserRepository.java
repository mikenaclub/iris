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

    @Autowired
    BCrypt bCrypt = new BCrypt();

    @Autowired
    private JdbcTemplate jdbcTemplate = new JdbcTemplate();

    public List<UserModel> queryall() {
        List<UserModel> user = jdbcTemplate.query(
                "SELECT id,username,password FROM User",
                (rs, rowNum) -> (new UserModel(rs.getInt("id"),
                        rs.getString("username"), rs.getString("password")))
        );
        return user;
    }

    public boolean register(UserModel user) {
        try {
            jdbcTemplate.update("INSERT INTO User (username,password) VALUE (?,?)",
                    new Object[]{user.getUsername(), bCrypt.encode(user.getPassword())});
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    public boolean login(UserModel user) {
        UserModel datafromdatabase = (UserModel) jdbcTemplate.queryForObject("SELECT * FROM User WHERE username = ?"
                , new Object[]{user.getUsername()}, (rs, rowNum) -> new UserModel(rs.getInt("id"),
                        rs.getString("username"), rs.getString("password")));

        /*System.out.println(datafromdatabase.getPassword());
        System.out.println(user.getPassword());
        System.out.println(bCrypt.matchpass(user.getPassword(), datafromdatabase.getPassword()));*/
        if (datafromdatabase != null) {
            if (bCrypt.matchpass(user.getPassword(), datafromdatabase.getPassword()))
                return true;
            else
                return false;
        } else
            return false;

    }
}
