package com.cooking.service.response;

import com.cooking.service.utility.ErrorMessage;

public class JwtResponse {
    private JwtOutDTO data;
    private ErrorMessage error;

    public JwtResponse(){}

    public JwtOutDTO getData() {
        return data;
    }

    public void setData(JwtOutDTO data) {
        this.data = data;
    }

    public ErrorMessage getError() {
        return error;
    }

    public void setError(ErrorMessage error) {
        this.error = error;
    }
}

