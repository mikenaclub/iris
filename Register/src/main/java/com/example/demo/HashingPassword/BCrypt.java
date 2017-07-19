package com.example.demo.HashingPassword;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

/**
 * Created by STR02119 on 7/18/2017.
 */
@Service
public class BCrypt {

    BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public String encode(String password) {
        System.out.println("Encode !!!");
        password = passwordEncoder.encode(password);
        return password;
    }

    public boolean matchpass(String password1, String password2) {
        //default password(password check) , hash password (database)
        if (passwordEncoder.matches(password1, password2))
            return true;
        else
            return false;
    }
}
