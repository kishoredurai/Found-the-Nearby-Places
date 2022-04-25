package com.example.demo.domain;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import javax.persistence.*;

@Entity
@Table(name = "business_address_details")
public class BusinessAddress {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "business_address_id")
    int business_address_id;

    @Column(name = "business_address")
    String business_address;

    @Column(name = "business_state")
    String business_state;

    @Column(name = "business_pincode")
    String business_pincode;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name="business_details_id")
    @JsonManagedReference
    private BusinessDetails businessDetails;


    @Transient
    private Bookmark bookmark;

    @Transient
    private BusinessReview businessReview;


    public Bookmark getBookmark() {
        return bookmark;
    }
//

//    @OneToOne(mappedBy = "businessAddress",cascade = CascadeType.ALL)
//    @JsonManagedReference
//    private Bookmark bookmark;

    // getters and setters


    public BusinessReview getBusinessReview() {
        return businessReview;
    }

    public void setBusinessReview(BusinessReview businessReview) {
        this.businessReview = businessReview;
    }

    public void setBookmark(Bookmark bookmark) {
        this.bookmark = bookmark;
    }

    public int getBusiness_address_id() {
        return business_address_id;
    }

    public void setBusiness_address_id(int business_address_id) {
        this.business_address_id = business_address_id;
    }

    public String getBusiness_address() {
        return business_address;
    }

    public void setBusiness_address(String business_address) {
        this.business_address = business_address;
    }

    public String getBusiness_state() {
        return business_state;
    }

    public void setBusiness_state(String business_state) {
        this.business_state = business_state;
    }

    public String getBusiness_pincode() {
        return business_pincode;
    }

    public void setBusiness_pincode(String business_pincode) {
        this.business_pincode = business_pincode;
    }

    public BusinessDetails getBusinessDetails() {
        return businessDetails;
    }

    public void setBusinessDetails(BusinessDetails businessDetails) {
        this.businessDetails = businessDetails;
    }
}
