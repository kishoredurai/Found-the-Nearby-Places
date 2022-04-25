package com.example.demo.repository;

import com.example.demo.domain.BusinessDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.relational.core.sql.In;
import org.springframework.stereotype.Repository;

@Repository
public interface BusinessDetailsrepository extends JpaRepository<BusinessDetails, Integer> {
}
