package com.example.demo.controller;


import com.example.demo.domain.user;
import com.example.demo.exception.ApiRequestException;
import com.example.demo.service.userservice;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")                                          //restrict the
@RestController
@RequestMapping("/")
public class logincontroller {


    @Autowired                                                                        //depinj
    private userservice userservice;


    @PostMapping(value="/login" , consumes = "application/JSON")
    public user usernamelogin(@RequestBody user users)
    {
        user found=userservice.logincheck(users);

        if(found == null) {
            throw new ApiRequestException("Oops username and password does note exist");
        }
        else {
            return found;
        }
    }

    @PostMapping(value="/login/otp" , consumes = "application/JSON")
    public user otp_login(@RequestBody user users)
    {
        user found=userservice.emailcheck(users);
        if(found == null)
            throw new ApiRequestException("Oops username does note exist");
        else
            return found;
    }


    @PostMapping(value="/login/otp/verify" , consumes = "application/JSON")
    public user otp_verify_login(@RequestBody user users)
    {
        user found=userservice.otp_check(users);
        return found;
    }



    @PostMapping(value="/signup/emailcheck" , consumes = "application/JSON")
    public user userregistercheck(@RequestBody user users)
    {

        user done= userservice.user_register_email_checks(users);
        if(done == null)
            throw new ApiRequestException("Email id doesnt exists");
        else
            return done;

    }

    @PostMapping(value="/signup" , consumes = "application/JSON")
    public user userregister(@RequestBody user users)
    {
        user done= userservice.user_register(users);
        if(done == null)
            throw new ApiRequestException("Oops There is error with data");
        else
            return done;

    }

}
