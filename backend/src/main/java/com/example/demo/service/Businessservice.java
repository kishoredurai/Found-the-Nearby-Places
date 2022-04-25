package com.example.demo.service;

import com.example.demo.domain.Bookmark;
import com.example.demo.domain.BusinessAddress;
import com.example.demo.domain.BusinessReview;
import com.example.demo.repository.Bookmarkrepository;
import com.example.demo.repository.BusinessAddressrepository;
import com.example.demo.repository.BusinessReviewrepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import java.util.ArrayList;
import java.util.List;

@Service
public class Businessservice {


    @Autowired
    private BusinessAddressrepository businessAddressrepository;


    @Autowired
    private Bookmarkrepository bookmarkrepository;

    @Autowired
    private BusinessReviewrepository businessReviewrepository;



    /// service to search the business details based on business_name and business_address

    public List<BusinessAddress> business_detail_search(String search)
    {

        List<BusinessAddress> buss= businessAddressrepository.findBybusiness_addressandbusiness_name(search);
        for (BusinessAddress element : buss) {

            Bookmark b= bookmarkrepository.findBybookmark_user_id_bookmark_business_id(element.getBusiness_address_id(),3);

            element.setBookmark(b);

        }

        return buss;



    }



    /// service to search the business details based on business_name and business_address based on bookmark and user id

    public List<BusinessAddress> business_detail_search_bookmark(int id,String search)
    {

            return businessAddressrepository.findBybusiness_addressandbusiness_name_bookmarked(search,id);

    }



    /// service to search the business details based on business_name and business_address based on user id because user added details

    public List<BusinessAddress> business_detail_search_useraddded(int id,String search)
    {

        return businessAddressrepository.findBybusiness_addressandbusiness_name_useradded(search,id);

    }





    /// service to search the business details based on business_name and business_address based on business id

    public List<BusinessAddress> business_detail_search_placedetails(int id,String search)
    {

        return businessAddressrepository.findBybusiness_addressandbusiness_name_details(search,id);

    }


    // service to fetch business details which are added by user

    public List<BusinessAddress> business_details_useradded(int id)
    {
        return businessAddressrepository.findBybusiness_userid_user(id);

    }



    // service to fetch business details which are all bookmarked by user

    public List<BusinessAddress> bookmark_userid_getall(int id)
    {
        return businessAddressrepository.findBybusiness_user_id(id);
    }





    // service to delete the business details based on business_id

    public boolean business_detail_delete(int badd_id)
    {

        try {
            businessAddressrepository.deleteById(badd_id);
            return true;
        }
        catch (Exception e)
        {
            return false;

        }

    }



    // service to get individual place details

    public List<BusinessAddress> business_detail_place_details(int id)
    {

        return businessAddressrepository.findAllById(id);

    }


    //service to get plce details which are review by user
    public  List<BusinessAddress> businessdetails_review_user_id(int id)
    {
        return businessAddressrepository.findBybusiness_review_id(id);
    }


    //service to get place details based on last entered review Home Page

    public  List<BusinessReview> businessdetails_review_user_id_home(int id)
    {
        List<BusinessReview> businessReview= businessReviewrepository.findByreview_user_id(id);


        for(BusinessReview review:businessReview)
        {
            BusinessAddress bb=businessAddressrepository.getById(review.getReview_business_id());

             review.setBusinessDetails(bb.getBusinessDetails());
        }

       return businessReview;
    }




    // service to get all the business details with bookmark details
    public List<BusinessAddress> businessdetails(int id)
    {
        List<BusinessAddress> buss=businessAddressrepository.findAll();

        for (BusinessAddress element : buss) {

            Bookmark b= bookmarkrepository.findBybookmark_user_id_bookmark_business_id(element.getBusiness_address_id(),id);

            element.setBookmark(b);

        }

        return buss;
    }
}
