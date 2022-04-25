package com.example.demo.domain;

import javax.persistence.*;


@Entity
@Table(name = "fuel_price_details")
public class FuelPrice {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
            @Column(name = "fuel_id")
    int fuel_id;

    @Column(name = "fuel_state")
    String fuel_state;

    @Column(name = "fuel_old_price")
    float fuel_old_price;

    @Column(name = "fuel_new_price")
    float fuel_new_price;

    @Column(name = "fuel_type")
    String fuel_type;

    @Column(name = "fuel_category")
    String fuel_category;


    // getters and setters


    public int getFuel_id() {
        return fuel_id;
    }

    public void setFuel_id(int fuel_id) {
        this.fuel_id = fuel_id;
    }

    public String getFuel_state() {
        return fuel_state;
    }

    public void setFuel_state(String fuel_state) {
        this.fuel_state = fuel_state;
    }

    public float getFuel_old_price() {
        return fuel_old_price;
    }

    public void setFuel_old_price(float fuel_old_price) {
        this.fuel_old_price = fuel_old_price;
    }

    public float getFuel_new_price() {
        return fuel_new_price;
    }

    public void setFuel_new_price(float fuel_new_price) {
        this.fuel_new_price = fuel_new_price;
    }

    public String getFuel_type() {
        return fuel_type;
    }

    public void setFuel_type(String fuel_type) {
        this.fuel_type = fuel_type;
    }

    public String getFuel_category() {
        return fuel_category;
    }

    public void setFuel_category(String fuel_category) {
        this.fuel_category = fuel_category;
    }
}
