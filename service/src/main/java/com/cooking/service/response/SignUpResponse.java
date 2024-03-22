package com.cooking.service.response;

import com.cooking.service.utility.ErrorMessage;

public class SignUpResponse {
    private String message;
    private ErrorMessage error;

    public SignUpResponse() {}

    public String getData() {
        return message;
    }

    public void setData(String message) {
        this.message = message;
    }

    public ErrorMessage getError() {
        return error;
    }

    public void setError(ErrorMessage error) {
        this.error = error;
    }
}




