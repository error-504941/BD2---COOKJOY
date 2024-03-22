package com.cooking.service.model;

public enum FoodCategory {
    ALL("All"),
    BREAKFAST("Breakfast"),
    LUNCH("Lunch"),
    DINNER("Dinner"),
    DESSERT("Dessert"),
    MAINDISK("MainDish"),
    DRINK("Drink"),
    OTHER("Other"),
    UNKNOWN("Unknown");

    private final String label;

    FoodCategory(String label) {
        this.label = label;
    }

    public String getLabel() {
        return label;
    }
}
