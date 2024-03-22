package com.cooking.service.utility;

public class ErrorMessage {
    private String innerMessage;
    private String message;
    private ErrorStatus status;

    public ErrorMessage(String innerMessage, String message, ErrorStatus status) {
        this.innerMessage = innerMessage;
        this.message = message;
        this.status = status;
    }

    public String getInnerMessage() {
        return innerMessage;
    }

    public void setInnerMessage(String innerMessage) {
        this.innerMessage = innerMessage;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public ErrorStatus getStatus() {
        return status;
    }

    public void setStatus(ErrorStatus status) {
        this.status = status;
    }
}
