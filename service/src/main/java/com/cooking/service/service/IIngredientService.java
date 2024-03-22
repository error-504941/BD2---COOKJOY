package com.cooking.service.service;

import com.cooking.service.model.Ingredient;
import com.cooking.service.model.Recipe;

import java.util.List;

public interface IIngredientService {

    public List<Ingredient> findIngredientsByName(String ingredientName);
}
