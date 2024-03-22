package com.cooking.service.dto;

public class InstructionDTO {
    private int stepNumber;
    private String description;

    public InstructionDTO(){

    }

    public InstructionDTO(int stepNumber, String description) {
        this.stepNumber = stepNumber;
        this.description = description;
    }


    public int getStepNumber() {
        return stepNumber;
    }

    public void setStepNumber(int stepNumber) {
        this.stepNumber = stepNumber;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
