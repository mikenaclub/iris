package com.example.demo.Usercontroller;

import com.example.demo.HashingPassword.BCrypt;
import com.google.gson.Gson;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.xml.ws.Response;
import java.util.List;
import java.util.Map;

/**
 * Created by STR02119 on 7/18/2017.
 */
@CrossOrigin(origins = "http://localhost:8090")
@RestController
@RequestMapping("/api")
public class Usercontroller {

    @Autowired
    Userrepository userrepository;

    @RequestMapping("/queryall")
    public List<Usermodel> queryall() {
        List<Usermodel> user = userrepository.queryall();
        return user;
    }

    @RequestMapping("/registeruser")
    public ResponseEntity<?> registeruser(@RequestBody String userinfo) {
        System.out.println("Regis Start!!!");
        System.out.println(userinfo);
        Gson gson = new Gson();
        Usermodel user = gson.fromJson(userinfo, Usermodel.class);
        boolean result = userrepository.register(user);
        System.out.println(result);
        if (result)
            return ResponseEntity.status(HttpStatus.CREATED).body(null);
        else
            return ResponseEntity.status(HttpStatus.CONFLICT).body("User duplicate");
    }

    @RequestMapping("/login")
    public ResponseEntity<?> Login(@RequestBody String userinfo) {
        System.out.println("Login!!!");
        System.out.println(userinfo);
        Gson gson = new Gson();
        Usermodel user = gson.fromJson(userinfo, Usermodel.class);
        boolean result = userrepository.login(user);

        if (result)
            return ResponseEntity.status(HttpStatus.ACCEPTED).body(null);
        else
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Login fail!! Please check username and password");
    }

}
