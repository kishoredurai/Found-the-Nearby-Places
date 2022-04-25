package com.example.demo.domain;

import com.fasterxml.jackson.annotation.JsonBackReference;

import javax.persistence.*;

@Entity
@Table(name = "business_details")
public class BusinessDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "business_id")
    int business_id;

    @Column(name = "business_name")
    String business_name;

    @Column(name = "business_mobile")
    String business_mobile;

    @Column(name = "business_mail")
    String business_mail;

    @Column(name = "business_website")
    String business_website;

    @Column(name = "business_category")
    String business_category;

    @Column(name = "business_timing")
    String business_timing;

    @Column(name = "business_description")
    String business_description;

    @Column(name = "business_userid")
    int business_user_id;

    @OneToOne(mappedBy = "businessDetails",cascade = CascadeType.ALL)
    @JsonBackReference
    private BusinessAddress businessAddress;




    //getters and setters


    public int getBusiness_id() {
        return business_id;
    }

    public void setBusiness_id(int business_id) {
        this.business_id = business_id;
    }

    public String getBusiness_name() {
        return business_name;
    }

    public void setBusiness_name(String business_name) {
        this.business_name = business_name;
    }

    public String getBusiness_mobile() {
        return business_mobile;
    }

    public void setBusiness_mobile(String business_mobile) {
        this.business_mobile = business_mobile;
    }

    public String getBusiness_mail() {
        return business_mail;
    }

    public void setBusiness_mail(String business_mail) {
        this.business_mail = business_mail;
    }

    public String getBusiness_category() {
        return business_category;
    }

    public void setBusiness_category(String business_category) {
        this.business_category = business_category;
    }



    public String getBusiness_timing() {
        return business_timing;
    }

    public void setBusiness_timing(String business_timing) {
        this.business_timing = business_timing;
    }

    public String getBusiness_description() {
        return business_description;
    }

    public void setBusiness_description(String business_description) {
        this.business_description = business_description;
    }

    public String getBusiness_website() {
        return business_website;
    }

    public void setBusiness_website(String business_website) {
        this.business_website = business_website;
    }

    public int getBusiness_user_id() {
        return business_user_id;
    }

    public void setBusiness_user_id(int business_user_id) {
        this.business_user_id = business_user_id;
    }

    public BusinessAddress getBusinessAddress() {
        return businessAddress;
    }

    public void setBusinessAddress(BusinessAddress businessAddress) {
        this.businessAddress = businessAddress;
    }
}
