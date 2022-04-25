package com.example.demo.service;


import com.example.demo.domain.BusinessAddress;
import com.example.demo.domain.BusinessReview;
import com.example.demo.domain.user;
import com.example.demo.exception.ApiRequestException;
import com.example.demo.repository.BusinessAddressrepository;
import com.example.demo.repository.BusinessReviewrepository;
import com.example.demo.repository.userrepository;
import jdk.swing.interop.LightweightFrameWrapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.w3c.dom.html.HTMLMetaElement;

import java.util.List;

@Service
public class BusinessReviewservice {


    @Autowired
    private BusinessReviewrepository businessReviewrepository;


    @Autowired
    private  BusinessAddressrepository businessAddressrepository;

    @Autowired
    private EmailSenderService emailSenderService;

    @Autowired
    private userrepository userrepository;


    // function to send mail

    public void sendmail(String to,String subject,String Message)
    {
// send email
        try {

            emailSenderService.sendEmail(to,
                    subject,Message
            );
        }
        catch (Exception e)
        {
            throw new ApiRequestException("Error in the Mail server");

        }

    }


    // mail to get the recommendation

    public  void mail_recommendation(int business_id,int ratings,String feedback,int user_id)
    {
        user user=userrepository.getById(user_id);
        String mailmessage = "<center><h2>Thank You for sahring your feedback</h2></center><br><br>";

        if(ratings>=3)
        {

            int count = 0;
            BusinessAddress businessAddress = businessAddressrepository.findById(business_id).get();
            // System.out.println(businessAddress.getBusiness_address());
            String Address = businessAddress.getBusiness_address();

            if (businessAddress != null) {
                String[] token = Address.split(",");

                for (String a : token) {
                    //System.out.println(a);
                    count++;
                }
                mailmessage += "<h3><u>Few Recommended Places to Visit</u></h3>";
                List<BusinessAddress> businessdetails = businessAddressrepository.findBybusiness_details_business_address(token[count - 2], businessAddress.getBusiness_address_id());
                for (BusinessAddress element : businessdetails) {
                    mailmessage += "<hr><br><br>";
                    mailmessage += "<h4>Place Name:</h4>" + element.getBusinessDetails().getBusiness_name();
                    mailmessage += "<h4>Place Link:</h4> localhost:3000/place/details?id=" + element.getBusiness_address_id();

                    System.out.println(element.getBusiness_address_id());
                }
                // System.out.println(token[count - 2]);

            }
            sendmail(user.getEmail(), "Thanks For review mail", mailmessage);

        }
        else
        {
            mailmessage+="Soory for the incovinence we will improve next time";
            sendmail(user.getEmail(), "Thanks For review mail", mailmessage);
        }


    }

    public List<BusinessReview> busreview_getall_busid(int bus_id)
    {
        try{
            return businessReviewrepository.findByreview_business_id(bus_id);
        }catch (Exception e) {
            throw new ApiRequestException("server is to busy");
        }

    }



    public List<BusinessReview> busreview_save(BusinessReview businessReview)
    {

        mail_recommendation(businessReview.getReview_business_id(),businessReview.getReview_rating(),businessReview.getReview_description(),businessReview.getReview_user_id());
        try{

            businessReviewrepository.save(businessReview);
            return businessReviewrepository.findByreview_business_id(businessReview.getReview_business_id());
        }catch (Exception e) {
            throw new ApiRequestException("server is to busy");
        }

    }


    public void business_recommendation()
    {
        mail_recommendation(20,2,"Good",3);
    }

}
