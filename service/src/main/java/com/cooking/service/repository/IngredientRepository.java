package com.cooking.service.repository;

import com.cooking.service.model.Ingredient;
import org.springframework.data.mongodb.repository.MongoRepository;


public interface IngredientRepository extends MongoRepository<Ingredient, String> {
    // Additional query methods can be defined here
}
