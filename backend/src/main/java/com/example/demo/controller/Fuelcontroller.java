package com.example.demo.controller;


import com.example.demo.domain.FuelPrice;
import com.example.demo.service.FuelPriceservice;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin(origins =  "http://localhost:3000")
@RestController
public class Fuelcontroller {

    @Autowired
    private FuelPriceservice fuelPriceservice;


    @PostMapping(value="/fuelprice",consumes = "application/JSON")
    List<FuelPrice> fuelprice_Get(@RequestBody FuelPrice fuelPrice)
    {
                return  fuelPriceservice.fuel_price_get(fuelPrice);
    }



}
