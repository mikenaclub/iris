package com.example.demo.Usercontroller;

import com.google.gson.Gson;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Created by STR02119 on 7/18/2017.
 */
@CrossOrigin(origins = "http://localhost:8080")
@RestController
@RequestMapping("/registerApi/v1/")
public class UserController {

    private final UserRepository userRepository;

    @Autowired
    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @RequestMapping(value = "/user", method = RequestMethod.GET)
    public List<UserModel> queryall() {
        List<UserModel> user = userRepository.queryall();
        return user;
    }

    @RequestMapping(value = "/user", method = RequestMethod.POST)
    public ResponseEntity<?> registerUser(@RequestBody String userInfo) {
        Gson gson = new Gson();
        UserModel user = gson.fromJson(userInfo, UserModel.class);
        boolean result = userRepository.register(user);
        System.out.println(result);
        if (result)
            return ResponseEntity.status(HttpStatus.CREATED).body(null);
        else
            return ResponseEntity.status(HttpStatus.CONFLICT).body("User duplicate");
    }

    @RequestMapping("/login")
    public ResponseEntity<?> Login(@RequestBody String userInfo) {
        System.out.println("Login!!!");
        System.out.println(userInfo);
        Gson gson = new Gson();
        UserModel user = gson.fromJson(userInfo, UserModel.class);
        boolean result = userRepository.login(user);

        if (result)
            return ResponseEntity.status(HttpStatus.ACCEPTED).body(null);
        else
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Login fail!! Please check username and password");
    }

}
