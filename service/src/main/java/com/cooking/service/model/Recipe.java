package com.cooking.service.model;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.datatype.jsr310.deser.LocalDateTimeDeserializer;
import com.fasterxml.jackson.datatype.jsr310.ser.LocalDateTimeSerializer;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.List;

@Document(collection = "recipes")
public class Recipe implements Serializable {

    @Id
    private String id;

    private String name;

    @JsonProperty("ingredients")
    @DBRef
    private List<Ingredient> ingredients;
    private String userId;
    private String cuisine;
    private FoodCategory category;
    private String difficulty;
    private int prepTime;
    private int cookTime;
    private int servings;
    @DBRef
    private Image image;
    @JsonProperty("instructions")
    @DBRef
    private List<Instruction> instructions;

    @JsonSerialize(using = LocalDateTimeSerializer.class)
    @JsonDeserialize(using = LocalDateTimeDeserializer.class)
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", shape = JsonFormat.Shape.STRING)
    @CreatedDate
    private LocalDateTime dateCreation;

    @JsonSerialize(using = LocalDateTimeSerializer.class)
    @JsonDeserialize(using = LocalDateTimeDeserializer.class)
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", shape = JsonFormat.Shape.STRING)
    @LastModifiedDate
    private LocalDateTime lastModifiedDate;

    public Recipe() {
    }

    public Recipe(String name, List<Ingredient> ingredients, String userId, String cuisine,
                  FoodCategory category, String difficulty, int prepTime, int cookTime, int servings,
                  Image image, List<Instruction> instructions) {
        this.name = name;
        this.ingredients = ingredients;
        this.userId = userId;
        this.cuisine = cuisine;
        this.category = category;
        this.difficulty = difficulty;
        this.prepTime = prepTime;
        this.cookTime = cookTime;
        this.servings = servings;
        this.image = image;
        this.instructions = instructions;
    }

    public Recipe(String name, List<Ingredient> ingredients, String userId, String cuisine,
                  FoodCategory category, String difficulty, int prepTime, int cookTime, int servings,
                  Image image, List<Instruction> instructions,
                  LocalDateTime dateCreation, LocalDateTime lastModifiedDate) {
        this.name = name;
        this.ingredients = ingredients;
        this.userId = userId;
        this.cuisine = cuisine;
        this.category = category;
        this.difficulty = difficulty;
        this.prepTime = prepTime;
        this.cookTime = cookTime;
        this.servings = servings;
        this.image = image;
        this.instructions = instructions;
        this.dateCreation = dateCreation;
        this.lastModifiedDate = lastModifiedDate;
    }


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

    public List<Ingredient> getIngredients() {
        return ingredients;
    }

    public void setIngredients(List<Ingredient> ingredients) {
        this.ingredients = ingredients;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
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

    public Image getImage() {
        return image;
    }

    public void setImage(Image image) {
        this.image = image;
    }

    public List<Instruction> getInstructions() {
        return instructions;
    }

    public void setInstructions(List<Instruction> instructions) {
        this.instructions = instructions;
    }

    public LocalDateTime getDateCreation() {
        return dateCreation;
    }

    public void setDateCreation(LocalDateTime dateCreation) {
        this.dateCreation = dateCreation;
    }

    public LocalDateTime getLastModifiedDate() {
        return lastModifiedDate;
    }

    public void setLastModifiedDate(LocalDateTime lastModifiedDate) {
        this.lastModifiedDate = lastModifiedDate;
    }
}



