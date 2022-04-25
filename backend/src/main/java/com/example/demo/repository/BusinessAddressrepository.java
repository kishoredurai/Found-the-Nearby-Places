package com.example.demo.repository;

import com.example.demo.domain.BusinessAddress;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BusinessAddressrepository extends JpaRepository<BusinessAddress,Integer> {


  //  SELECT * FROM business_address_details INNER JOIN business_details on business_address_details.business_details_id = business_details.business_id LEFT JOIN bookmark_details on bookmark_details.bookmark_business_id = business_address_details.business_address_id and bookmark_details.bookmark_user_id=3;



    @Query(value = "SELECT * FROM business_address_details INNER JOIN business_details ON business_address_details.business_details_id=business_details.business_id \n" +
            "WHERE business_details.business_name like CONCAT('%',:search,'%') or business_address_details.business_address like CONCAT('%',:search,'%');",nativeQuery = true)
    List<BusinessAddress> findBybusiness_addressandbusiness_name(@Param("search") String search);


    @Query(value = "SELECT * FROM business_address_details INNER JOIN business_details ON business_address_details.business_details_id=business_details.business_id INNER JOIN bookmark_details ON bookmark_details.bookmark_business_id=business_address_details.business_details_id WHERE ( business_address_details.business_address like CONCAT('%',:search,'%') or business_details.business_name like CONCAT('%',:search,'%')) AND bookmark_details.bookmark_user_id=CONCAT(:id);",nativeQuery = true)
    List<BusinessAddress> findBybusiness_addressandbusiness_name_bookmarked(@Param("search") String search,@Param("id") int id);


    @Query(value="SELECT * FROM business_address_details INNER JOIN business_details ON business_address_details.business_details_id=business_details.business_id where (business_address_details.business_address LIKE CONCAT('%',:search,'%') or business_details.business_name like CONCAT('%',:search,'%')) AND business_details.business_userid=CONCAT(:id)",nativeQuery = true)
    List<BusinessAddress> findBybusiness_addressandbusiness_name_useradded(@Param("search") String search,@Param("id") int id);


    @Query(value = "SELECT * FROM business_address_details INNER JOIN business_details ON business_address_details.business_details_id=business_details.business_id INNER JOIN bookmark_details ON bookmark_details.bookmark_business_id=business_address_details.business_details_id where bookmark_details.bookmark_user_id=?1",nativeQuery = true)
    List<BusinessAddress>findBybusiness_user_id(int id);


    //find business details based on userid last entry for save
    @Query(value = "SELECT * FROM business_address_details INNER JOIN business_details ON business_address_details.business_details_id=business_details.business_id where business_details.business_userid= ?1 ORDER BY business_address_details.business_address_id DESC LIMIT 1;",nativeQuery = true)
    BusinessAddress findBybusinessdetails_lastuserid(int id);


    // find business details added bu user

    @Query(value = "SELECT * from business_address_details INNER JOIN business_details ON business_address_details.business_details_id=business_details.business_id WHERE business_details.business_userid = ?1",nativeQuery = true)
    List<BusinessAddress> findBybusiness_userid_user(int id);



    // find buisness details for mail sending reccommendation  ( add id to not showing this details)

    @Query(value = "SELECT * FROM business_address_details INNER JOIN business_details on business_address_details.business_details_id = business_details.business_id where business_address_details.business_address LIKE CONCAT('%',:search,'%') and business_address_details.business_address_id != CONCAT(:id)",nativeQuery = true)
    List<BusinessAddress> findBybusiness_details_business_address(@Param("search") String search ,@Param("id") int id);



    //temp

    @Query(value = "SELECT * FROM business_address_details INNER JOIN business_details on business_address_details.business_details_id = business_details.business_id INNER JOIN bookmark_details on bookmark_details.bookmark_business_id = business_address_details.business_address_id and bookmark_details.bookmark_user_id= 3 ;",nativeQuery = true)
    List<BusinessAddress> findByalldetails();


    // find the business details for individual details

    @Query(value = "SELECT * FROM business_address_details INNER JOIN business_details on business_address_details.business_details_id = business_details.business_id where business_address_details.business_address_id = CONCAT(:id)",nativeQuery = true)
    List<BusinessAddress> findAllById(int id);



    // find the business details based on the review added by the user

    @Query(value = "SELECT * from business_address_details INNER JOIN business_details on business_address_details.business_address_id=business_details.business_id INNER JOIN business_review on business_review.review_business_id=business_address_details.business_address_id where business_review.review_user_id= CONCAT(:id) ORDER BY business_review.business_review_id DESC;",nativeQuery = true)
    List<BusinessAddress> findBybusiness_review_id(@Param("id") int id);




    // find the business details based on searching for individual data page


    @Query(value = "SELECT * FROM business_address_details INNER JOIN business_details ON business_address_details.business_details_id=business_details.business_id WHERE( business_details.business_name like CONCAT('%',:search,'%') or business_address_details.business_address like CONCAT('%',:search,'%') )and business_details.business_userid = CONCAT(:id);",nativeQuery = true)
    List<BusinessAddress> findBybusiness_addressandbusiness_name_details(@Param("search") String search,@Param("id") int id);



}
