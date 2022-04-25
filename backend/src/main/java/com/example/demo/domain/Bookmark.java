package com.example.demo.domain;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import javax.persistence.*;

@Entity
@Table(name = "bookmark_details")
public class Bookmark {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "bookmark_id")
    int bookmark_id;

    @Column(name = "bookmark_user_id")
    int bookmark_user_id;

    @Column(name = "bookmark_business_id")
    int bookmark_business_id;





//    @OneToOne
//    @JoinColumn(name = "business_address_business_address_id")
//    @JsonBackReference
//    private BusinessAddress businessAddress;
//
//    public BusinessAddress getBusinessAddress() {
//        return businessAddress;
//    }


    ////  getters and setters


    public int getBookmark_id() {
        return bookmark_id;
    }

    public void setBookmark_id(int bookmark_id) {
        this.bookmark_id = bookmark_id;
    }

    public int getBookmark_user_id() {
        return bookmark_user_id;
    }

    public void setBookmark_user_id(int bookmark_user_id) {
        this.bookmark_user_id = bookmark_user_id;
    }

    public int getBookmark_business_id() {
        return bookmark_business_id;
    }

    public void setBookmark_business_id(int bookmark_business_id) {
        this.bookmark_business_id = bookmark_business_id;
    }
}

