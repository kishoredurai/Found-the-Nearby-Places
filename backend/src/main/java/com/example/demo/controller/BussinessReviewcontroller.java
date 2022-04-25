package com.example.demo.controller;

import com.example.demo.domain.BusinessAddress;
import com.example.demo.domain.BusinessReview;
import com.example.demo.service.BusinessReviewservice;
import com.example.demo.service.Businessservice;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;


@CrossOrigin(origins = "http://localhost:3000")                                          //restrict the

@RestController
public class BussinessReviewcontroller {


    @Autowired
    private BusinessReviewservice businessReviewservice;

    @Autowired
    private Businessservice businessservice;


        @GetMapping(value = "/review/bus/{id}")
    List<BusinessReview> BussinessReview_getall_bus_id(@PathVariable("id") int bus_id)
    {
        return businessReviewservice.busreview_getall_busid(bus_id);
    }



    //testing send mail using recommendation

    @GetMapping(value = "/review/mail")
    void teemp()
    {
                businessReviewservice.business_recommendation();
    }


    //ave the review details to database

    @PostMapping(value = "/review",consumes = "application/JSON")
    List<BusinessReview> BussinessReview_save(@RequestBody BusinessReview businessReview)
    {
        return businessReviewservice.busreview_save(businessReview);
    }



    // controller to get the business details for recommentation page based on the userid

    @GetMapping(value = "/recommendation/user/{id}")
    List<BusinessAddress> BussinessDetails_review_user_id(@PathVariable("id") int user_id)
    {
        return businessservice.businessdetails_review_user_id(user_id);


    }



    // controller to get the business details for recommendation page based on the userid home page

    @GetMapping(value = "/recommendation/home/{id}")
    List<BusinessReview> BussinessDetails_review_user_id_homepage(@PathVariable("id") int user_id)
    {
        //return businessReviewservice.busreview_getall_busid(bus_id);
//        return businessservice.businessdetails_review_user_id(user_id);
        return businessservice.businessdetails_review_user_id_home(user_id);
    }


    @GetMapping(value="/recommendation/user/{id}/search")
    List<BusinessAddress> recommendataion_search(@PathVariable("id") int id,@RequestParam(name="search") String search)
    {
        System.out.println("get requuest");

        List<BusinessAddress> test = businessservice.business_detail_search_useraddded(id,search);
        System.out.println(test);
        return test;
    }

}
