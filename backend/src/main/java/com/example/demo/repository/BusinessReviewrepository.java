package com.example.demo.repository;

import com.example.demo.domain.BusinessReview;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BusinessReviewrepository extends JpaRepository<BusinessReview,Integer> {


    @Query(value="select * from business_review b where b.review_business_id = ?1",nativeQuery = true)
    List<BusinessReview> findByreview_business_id(int revbusid);



    @Query(value = "select * from business_review WHERE business_review.review_user_id = ?1 ORDER BY business_review.business_review_id  DESC LIMIT 2",nativeQuery = true)
    List<BusinessReview> findByreview_user_id(int user_id);







}
