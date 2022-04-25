package com.example.demo.service;

import com.example.demo.domain.user;
import com.example.demo.exception.ApiRequestException;
import com.example.demo.repository.userrepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Random;

@Service
public class userservice {


    //  user interface object
    @Autowired
    private userrepository  userrepository;




    //emailservice object

    @Autowired
    EmailSenderService emailsenderservice;



    //OTP generate function
    public static char[] otp_generate()
    {
        System.out.println("Generating OTP using random() : ");
        System.out.print("You OTP is : ");

        // Using numeric values
        String numbers = "0123456789";

        // Using random method
        Random rndm_method = new Random();

        char[] otp = new char[4];

        for (int i = 0; i < 4; i++)
        {
            // Use of charAt() method : to get character value
            // Use of nextInt() as it is scanning the value as int
            otp[i] = numbers.charAt(rndm_method.nextInt(numbers.length()));
        }
        return otp;
    }



    // static hasing function

    public static String p_hash(String s)
    {
        String passwordToHash = s;
        String generatedPassword = null;

        try
        {
            MessageDigest md = MessageDigest.getInstance("MD5");

            // Add password bytes to digest
            md.update(passwordToHash.getBytes());

            // Get the hash's bytes
            byte[] bytes = md.digest();

            // This bytes[] has bytes in decimal format. Convert it to hexadecimal format
            StringBuilder sb = new StringBuilder();
            for (int i = 0; i < bytes.length; i++) {
                sb.append(Integer.toString((bytes[i] & 0xff) + 0x100, 16).substring(1));
            }

            // Get complete hashed password in hex format
            generatedPassword = sb.toString();

         } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
        }
        return generatedPassword;
    }



    // function to check user login

    public user logincheck(user logindetails)
    {


            logindetails.setPassword(p_hash(logindetails.getPassword()));
            user users=userrepository.findusernameandpasword(logindetails.getEmail(),logindetails.getPassword());

            if(users == null)
            {
                throw new ApiRequestException("username and password doesn't exist");
            }
            else
            {
                if(users.getStatus().equals("NO"))
                {
                //System.out.println(users);
                throw new ApiRequestException("Oops your account is inactive");
                 }
                else
                {
                    users.setPassword(null);
                   users.setOtp(null);
                }
            }
//
                return users;


    }



    // function to check email for otp login

    public user emailcheck(user logindetails)
    {
        user data=userrepository.findByemail(logindetails.getEmail());
        if(data == null){
            throw new ApiRequestException("Enter email doesn't exist");
        }
        else{

        String otp = new String(otp_generate());
        data.setOtp(otp);
        System.out.println("OTP is:"+otp);

        // send email
        try {
            emailsenderservice.sendEmail(data.getEmail(),
                    "THis is the OTP verification",
                    "The OTP for the verification is : "+otp);
        }
        catch (Exception e)
        {
            throw new ApiRequestException("Error in the Mail server");
        }

        try
        {
            userrepository.save(data);

            // set password and otp as null to return the values
            data.setPassword(null);
            data.setOtp(null);
        }
        catch (Exception e)
        {
            throw new ApiRequestException("Server is too busy !!");
        }
        return data;
        }
    }




    // function to check the otp for both login and registering with otp

    public user otp_check(user otp_details)
    {
        user data=userrepository.findById(otp_details.getId()).get();
        if(data.getOtp().equals(otp_details.getOtp()))
        {
            if(data.getStatus().equals("NO"))
            {
                data.setStatus("YES");
                try {
                    userrepository.save(data);
                }
                catch (Exception e)
                {
                    throw new ApiRequestException("Server is too busy in insertion");
                }

            }

            data.setPassword(null);
            data.setOtp(null);

            return data;
        }
        else {
            throw new ApiRequestException("OTP doesn't match");
        }

    }




    // function to check email exist or not for signup

    public user user_register_email_checks(user login_details)
    {
        user data=userrepository.findByemail(login_details.getEmail());
        data.setPassword(null);
        data.setOtp(null);
        return data;
    }



    /// function to save the user details to  db

    public user user_register(user user_details)
    {
        user data=userrepository.findByemail(user_details.getEmail());
        if(data == null)
        {
            try {
                user_details.setPassword(p_hash(user_details.getPassword()));
                String otp=new String(otp_generate());
                user_details.setOtp(otp);
                user_details.setStatus("NO");
                System.out.println("OTP : "+otp);
                userrepository.save(user_details);

                try
                {
                    emailsenderservice.sendEmail(user_details.getEmail(),
                            "THis is the OTP verification",
                            "The OTP for the verification is : "+otp);
                }
                catch (Exception e)
                {
                    throw new ApiRequestException("Email server is down");
                }

             }catch (Exception e)
            {
                throw new ApiRequestException("Server is too busy !!");
            }
        }
        else {
            throw new ApiRequestException("Email ID already exist");
        }
        user details=userrepository.findByemail(user_details.getEmail());
        details.setPassword(null);
        details.setOtp(null);
        return details;
    }
}
