package com.example.demo.domain;

import net.bytebuddy.dynamic.loading.ClassReloadingStrategy;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "user_details")
public class user {


    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "user_id")
    int id;

    @Column(name = "user_name")
    String name;

    @Column(name="user_email")
    String email;

    @Column(name="user_password")
    String password;

    @Column(name="user_age")
    int age;

    @Column(name = "user_otp")
    String otp;

    @Column(name = "user_status")
    String status;

    @Column(name = "user_last_login")
    String last_login;


    public String getOtp() {
        return otp;
    }

    public void setOtp(String otp) {
        this.otp = otp;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public String getLast_login() {
        return last_login;
    }

    public void setLast_login(String last_login) {
        this.last_login = last_login;
    }


    //Getters and setters


}
