package com.cooking.service.service;

import com.cooking.service.model.Ingredient;
import com.cooking.service.model.Recipe;
import com.cooking.service.repository.IngredientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;

@Service
public class IngredientService {
    private final MongoTemplate mongoTemplate;
    private final IngredientRepository ingredientRepository;

    @Autowired
    public IngredientService(MongoTemplate mongoTemplate, IngredientRepository ingredientRepository) {
        this.mongoTemplate = mongoTemplate;
        this.ingredientRepository = ingredientRepository;
    }

    public List<Ingredient> findIngredientsByName(String ingredientName) {
        Query query = new Query(Criteria.where("name").regex(".*" + ingredientName + ".*", "i"));
        return mongoTemplate.find(query, Ingredient.class);
    }
}