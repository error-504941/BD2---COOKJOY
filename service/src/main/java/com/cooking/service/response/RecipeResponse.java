package com.cooking.service.response;

import com.cooking.service.dto.RecipeDTO;
import com.cooking.service.utility.ErrorMessage;

import java.util.List;

public class RecipeResponse {
    private InnerRecipe data;
    private ErrorMessage error;

    public RecipeResponse() {}

    public RecipeResponse(InnerRecipe data, ErrorMessage error) {
        this.data = data;
        this.error = error;
    }

    public InnerRecipe getData() {
        return data;
    }

    public void setData(List<RecipeDTO> recipe, int total) {
        this.data = new InnerRecipe(recipe, total);
    }

    public ErrorMessage getError() {
        return error;
    }

    public void setError(ErrorMessage error) {
        this.error = error;
    }

    static class InnerRecipe {
        private List<RecipeDTO> recipe;
        private int totalNumber;

        public InnerRecipe(List<RecipeDTO> recipe, int totalNumber) {
            this.recipe = recipe;
            this.totalNumber = totalNumber;
        }

        public List<RecipeDTO> getRecipe() {
            return recipe;
        }

        public void setRecipe(List<RecipeDTO> recipe) {
            this.recipe = recipe;
        }

        public int getTotalNumber() {
            return totalNumber;
        }

        public void setTotalNumber(int totalNumber) {
            this.totalNumber = totalNumber;
        }
    }
}
