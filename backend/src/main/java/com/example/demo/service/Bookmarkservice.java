package com.example.demo.service;

import com.example.demo.domain.Bookmark;
import com.example.demo.domain.BusinessAddress;
import com.example.demo.exception.ApiRequestException;
import com.example.demo.repository.Bookmarkrepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class Bookmarkservice {


    @Autowired
    private Bookmarkrepository bookmarkrepository;


    // service to add bookmark and remove bookmark return true if added else false

    public String bookmark_save(Bookmark bookmark)
    {

        System.out.println(bookmark.getBookmark_business_id()+" data "+bookmark.getBookmark_user_id());
        Bookmark bookmark2=bookmarkrepository.findBybookmark_user_id_bookmark_business_id(bookmark.getBookmark_business_id(),bookmark.getBookmark_user_id());
        if(bookmark2 == null)
        {
            try {
                bookmarkrepository.save(bookmark);
                return "true";

            }
            catch (Exception e)
            {
                throw new ApiRequestException("can save server is busy");
            }
        }
        else
        {
            try
            {
                bookmarkrepository.deleteById(bookmark2.getBookmark_id());
                return "false";
            }
            catch (Exception e)
            {
                throw new ApiRequestException("Cant delete the data");
            }
        }


    }


    // service to check the bookmark is marked or not


    public Bookmark bookmark_check(Bookmark bookmark)
    {
        System.out.println(bookmark.getBookmark_business_id());
        return bookmarkrepository.findBybookmark_user_id_bookmark_business_id(bookmark.getBookmark_business_id(),bookmark.getBookmark_user_id());
    }


    // service to get all the bookmark details
    public List<Bookmark> bookmark_busid_getall(int id)
    {
        return bookmarkrepository.findBybookmark_business_id(id);
    }

}
