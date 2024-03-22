package com.cooking.service.dto;

import com.cooking.service.model.FoodCategory;
import com.cooking.service.model.Ingredient;
import com.cooking.service.model.Instruction;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;

public class RecipeDTO {
    private String id;
    private String name;
    private List<IngredientDTO> ingredients;
    private String cuisine;
    private FoodCategory category;
    private String difficulty;
    private int prepTime;
    private int cookTime;
    private int servings;
    private ImageDTO image;
    private List<InstructionDTO> instructions;

    public  RecipeDTO(){}

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<IngredientDTO> getIngredients() {
        return ingredients;
    }

    public void setIngredients(List<IngredientDTO> ingredients) {
        this.ingredients = ingredients;
    }

    public String getCuisine() {
        return cuisine;
    }

    public void setCuisine(String cuisine) {
        this.cuisine = cuisine;
    }

    public FoodCategory getCategory() {
        return category;
    }

    public void setCategory(FoodCategory category) {
        this.category = category;
    }

    public String getDifficulty() {
        return difficulty;
    }

    public void setDifficulty(String difficulty) {
        this.difficulty = difficulty;
    }

    public int getPrepTime() {
        return prepTime;
    }

    public void setPrepTime(int prepTime) {
        this.prepTime = prepTime;
    }

    public int getCookTime() {
        return cookTime;
    }

    public void setCookTime(int cookTime) {
        this.cookTime = cookTime;
    }

    public int getServings() {
        return servings;
    }

    public void setServings(int servings) {
        this.servings = servings;
    }

    public ImageDTO getImage() {
       return image;
    }

    public void setImage(ImageDTO  image) {
       this.image = image;
   }

    public List<InstructionDTO> getInstructions() {
        return instructions;
    }

    public void setInstructions(List<InstructionDTO> instructions) {
        this.instructions = instructions;
    }
}
