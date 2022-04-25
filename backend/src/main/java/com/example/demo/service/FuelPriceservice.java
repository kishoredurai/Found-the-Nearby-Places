package com.example.demo.service;

import com.example.demo.domain.FuelPrice;
import com.example.demo.exception.ApiRequestException;
import com.example.demo.repository.FuelPricerespository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FuelPriceservice {

    @Autowired
    private FuelPricerespository fuelPricerespository;

    public List<FuelPrice> fuel_price_get(FuelPrice fuelPrice) {
        if(!fuelPrice.getFuel_category().isEmpty()) {
            try
            {

                fuelPrice.setFuel_category(fuelPrice.getFuel_category().toLowerCase());
                return fuelPricerespository.findByfstateandfcategory(fuelPrice.getFuel_state(), fuelPrice.getFuel_category());
            }
            catch (Exception e)
            {
                throw new ApiRequestException("Server is busy !!");
            }
        }
        else
            throw new ApiRequestException("Data is Empty");
    }

}
