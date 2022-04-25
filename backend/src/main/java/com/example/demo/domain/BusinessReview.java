package com.example.demo.domain;

import javax.persistence.*;

@Entity
@Table(name = "business_review")
public class BusinessReview {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "business_review_id")
    int review_id;

    @Column(name = "review_business_id")
    int review_business_id;

    @Column(name = "review_user_id")
    int review_user_id;

    @Column(name = "review_rating")
    int review_rating;

    @Column(name="review_description")
    String review_description ;

    @Transient
    private BusinessDetails businessDetails;

    /// getters and setters


    public BusinessDetails getBusinessDetails() {
        return businessDetails;
    }

    public void setBusinessDetails(BusinessDetails businessDetails) {
        this.businessDetails = businessDetails;
    }

    public int getReview_id() {
        return review_id;
    }

    public void setReview_id(int review_id) {
        this.review_id = review_id;
    }

    public int getReview_business_id() {
        return review_business_id;
    }

    public void setReview_business_id(int review_business_id) {
        this.review_business_id = review_business_id;
    }

    public int getReview_user_id() {
        return review_user_id;
    }

    public void setReview_user_id(int review_user_id) {
        this.review_user_id = review_user_id;
    }

    public int getReview_rating() {
        return review_rating;
    }

    public void setReview_rating(int review_rating) {
        this.review_rating = review_rating;
    }

    public String getReview_description() {
        return review_description;
    }

    public void setReview_description(String review_description) {
        this.review_description = review_description;
    }
}
