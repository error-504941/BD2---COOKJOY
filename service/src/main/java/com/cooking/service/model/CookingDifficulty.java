package com.cooking.service.model;
public enum CookingDifficulty {
    EASY("Easy"),
    MEDIUM("Medium"),
    HARD("Hard");

    private final String label;

    CookingDifficulty(String label) {
        this.label = label;
    }

    public String getLabel() {
        return label;
    }
}
