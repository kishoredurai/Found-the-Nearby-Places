package com.example.demo.controller;


import com.example.demo.domain.Bookmark;
import com.example.demo.domain.BusinessAddress;
import com.example.demo.repository.Bookmarkrepository;
import com.example.demo.service.Bookmarkservice;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class Bookmarkcontroller {


  @Autowired
    private Bookmarkservice bookmarkservice;



  // Controller to add bookmark data and delete the bookmark data and return true or false

  @PostMapping(value = "/bookmark",consumes = "application/JSON")
  String  bookmarksave(@RequestBody Bookmark bookmark)
  {
    System.out.println(bookmark.getBookmark_business_id()+" data "+bookmark.getBookmark_user_id());
    return bookmarkservice.bookmark_save(bookmark);
  }


//  // Controller to get the bookmark based on business id   ! ( change)))))
//
//  @GetMapping(value = "/bookmark/bs/{id}")
//  List<Bookmark> bookmarkgetallbybusid(@PathVariable("id") int user_id)
//  {
//    return bookmarkservice.bookmark_busid_getall(user_id);
//  }


  /// Controller to check the business details is  bookmarked  ( note required)

  @PostMapping(value = "/bookmark/check" ,consumes = "application/JSON")
  Bookmark  bookmark_check(@RequestBody Bookmark bookmark)
  {
    return bookmarkservice.bookmark_check(bookmark);
  }


}
