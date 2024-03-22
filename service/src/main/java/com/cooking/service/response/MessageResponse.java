package com.cooking.service.response;

import com.cooking.service.dto.RecipeDTO;
import com.cooking.service.utility.ErrorMessage;

import java.util.List;


public class MessageResponse {
    private String message;
    private ErrorMessage error;

    public MessageResponse(){}

    public MessageResponse(String message, ErrorMessage error) {
        this.message = message;
        this.error = error;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public ErrorMessage getError() {
        return error;
    }

    public void setError(ErrorMessage error) {
        this.error = error;
    }
}
