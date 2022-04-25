package com.example.demo.controller;

import com.example.demo.domain.BusinessAddress;
import com.example.demo.exception.ApiRequestException;
import com.example.demo.repository.BusinessAddressrepository;
import com.example.demo.service.Businessservice;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")                                          //restrict the
@RestController
public class businesscontroller {


    @Autowired
    private BusinessAddressrepository businessAddressrepository;

    @Autowired
    private Businessservice businessservice;



    // controller to save the business details ((( need to be modified )))

    @PostMapping(value = "/business/save", consumes = "application/JSON")
    BusinessAddress business_Address_save(@RequestBody BusinessAddress businessAddress)
    {
        try{
            businessAddressrepository.save(businessAddress);
        }catch (Exception e)
        {





            throw new ApiRequestException("server busy in saving data");
        }

        try
        {
            System.out.println("userid: "+businessAddress.getBusinessDetails().getBusiness_user_id());
            return businessAddressrepository.findBybusinessdetails_lastuserid(businessAddress.getBusinessDetails().getBusiness_user_id());
        }
        catch (Exception e)
        {
            throw new ApiRequestException("server busy in saving data");
        }

    }


    //Controller to get all business details

    @GetMapping(value = "/business/get/{id}")
    List<BusinessAddress> business_Address_get(@PathVariable("id") int id)
    {
        //System.out.println("get requuest");
        List<BusinessAddress> test =businessservice.businessdetails(id);
        System.out.println(test);
        return test;
    }

    //Controller to get individual business details by business id

    @GetMapping(value = "/business/detail/get/{id}")
    List<BusinessAddress> business_Address_get_individual(@PathVariable("id") int id)
    {
        //System.out.println("get requuest");
        List<BusinessAddress> test =businessAddressrepository.findAllById(id);
        System.out.println(test);
        return test;
    }




    // controller for search field to get business details

    @GetMapping(value="/business/search")
    List<BusinessAddress> business_address_search(@RequestParam(name="search") String search)
    {
        //System.out.println("get requuest");

        List<BusinessAddress> test = businessservice.business_detail_search(search);
        System.out.println(test);
        return test;
    }





    // controller for search field to get business details which are bookmarked by user

    @GetMapping(value="/business/{id}/search")
    List<BusinessAddress> business_address_search_bookmark(@PathVariable("id") int id,@RequestParam(name="search") String search)
    {
        //System.out.println("get requuest");

        List<BusinessAddress> test = businessservice.business_detail_search_bookmark(id,search);
        System.out.println(test);
        return test;
    }



    // controller for search field to get business details which are added by user

    @GetMapping(value="/business/user/{id}/search")
    List<BusinessAddress> business_address_search_useradded(@PathVariable("id") int id,@RequestParam(name="search") String search)
    {
        System.out.println("get requuest");

        List<BusinessAddress> test = businessservice.business_detail_search_useraddded(id,search);
        System.out.println(test);
        return test;
    }


    // controller for search field to get business details for place details page

    @GetMapping(value="/place/details/{id}/search")
    List<BusinessAddress> business_address_search_placedetails(@PathVariable("id") int id,@RequestParam(name="search") String search)
    {
        System.out.println("get requuest");

        List<BusinessAddress> test = businessservice.business_detail_search_placedetails(id,search);
        System.out.println(test);
        return test;
    }






    // controller to get business details which are bookmarked by user (bookmark page)

    @GetMapping(value = "/bookmark/user/{id}")
    List<BusinessAddress> bookmarkgetallbyuser(@PathVariable("id") int user_id)
    {
        return businessservice.bookmark_userid_getall(user_id);
    }



    /// controller to get the business details added by user


    @GetMapping(value = "/business/user/{id}")
    List<BusinessAddress> businessAddressesaddedbyuser(@PathVariable("id") int user_id)
    {

        return businessservice.business_details_useradded(user_id);
    }




    /// Controller to delete business details

    @DeleteMapping(value="/business/delete/{id}")
    boolean businessAddressdelete(@PathVariable("id") int badd_id)
    {
           return businessservice.business_detail_delete(badd_id);
    }





    // controller for get the individual place details

    @GetMapping(value="/place/details")
    List<BusinessAddress> business_address_place_details(@RequestParam(name="id") int id)
    {
        //System.out.println("get requuest");

        List<BusinessAddress> test = businessservice.business_detail_place_details(id);
        System.out.println(test);
        return test;
    }





}
