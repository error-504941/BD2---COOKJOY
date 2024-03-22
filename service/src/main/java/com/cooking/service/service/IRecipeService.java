package com.cooking.service.service;

import com.cooking.service.model.FoodCategory;
import com.cooking.service.model.Recipe;

import java.io.IOException;
import java.util.List;
import java.util.Map;

public interface IRecipeService {
    public Map<FoodCategory, Integer> categoryNameCount();
    public RecipeService.RecipeResult searchByNameCategory(String name, FoodCategory category, int pageNumber, int pageSize);

    public RecipeService.RecipeResult filterByCategory(FoodCategory category, int pageNumber, int pageSize);

    //filtro se si è loggati => scarico le mie ricette
    public RecipeService.RecipeResult recipesByUser(String userid, int pageNumber, int pageSize) throws IOException;
    //aggiungi una ricetta
    public Boolean addRecipe(Recipe recipe, String userId);
    //aggiorna una ricetta
    public Boolean updateRecipe(String recipeId, Recipe recipe, String userId);
    //elimina una ricetta
    public Boolean deleteRecipe(String recipeId, String userId);

    RecipeService.RecipeResult findRecipesByIngredientName(String ingredientName,FoodCategory category, int pageNumber, int pageSize);
}
