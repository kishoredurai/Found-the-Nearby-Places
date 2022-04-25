package com.example.demo.repository;

import com.example.demo.domain.user;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface userrepository extends JpaRepository<user,Integer> {

//
//    @Query(value = "select user_id,user_name,user_email,user_age from user_details where user_email like CONCAT(:email);",nativeQuery = true)
//    List<user> findByuser_emailid(@Param("email") String email);

    @Query(value = "select * from user_details where user_email=CONCAT(:keyword1)  and user_password=CONCAT(:keyword2);",nativeQuery = true)
    user findusernameandpasword(@Param("keyword1") String keyword1, @Param("keyword2") String keyword2);

    user findByemail(String email);
    //List<user> finduserbyuser_email(String user_email);

}
