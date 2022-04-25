package com.example.demo.repository;

import com.example.demo.domain.FuelPrice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface FuelPricerespository extends JpaRepository<FuelPrice,Integer> {

//    List<FuelPrice> findByfcategory(String fcategory);


    @Query(value = "select * from fuel_price_details f where f.fuel_category = ?1",nativeQuery = true)
    List<FuelPrice> findByfuel_category(String fcategory);




    @Query(value = "select * from fuel_price_details fp where fp.fuel_state = ?1 and fp.fuel_category = ?2",nativeQuery = true)
    List<FuelPrice>findByfstateandfcategory(String fstate,String fcategory);
}
