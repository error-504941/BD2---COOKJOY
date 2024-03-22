package com.cooking.service.repository;

import com.cooking.service.model.Image;
import org.springframework.data.mongodb.repository.MongoRepository;



public interface ImageRepository extends MongoRepository<Image, String> {
    // Additional query methods can be defined here
}
