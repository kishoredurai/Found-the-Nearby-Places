package com.example.demo.repository;

import com.example.demo.domain.Bookmark;
import com.example.demo.domain.BusinessAddress;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface Bookmarkrepository extends JpaRepository<Bookmark,Integer> {



    @Query(value = "select * from bookmark_details b where b.bookmark_business_id = ?1 and b.bookmark_user_id = ?2",nativeQuery = true)
    Bookmark findBybookmark_user_id_bookmark_business_id(int business_id,int user_id);


    @Query(value="select * from bookmark_details b where b.bookmark_business_id = ?1",nativeQuery = true)
    List<Bookmark> findBybookmark_business_id(int bookmark_business_id);



}
