package com.cooking.service.repository;

import com.cooking.service.model.Recipe;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface RecipeRepository extends MongoRepository<Recipe, String> {
    // Additional query methods can be defined here
}
