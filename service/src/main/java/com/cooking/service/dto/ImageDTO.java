package com.cooking.service.dto;

public class ImageDTO {
    private String image;
    private String imageName;
    private String imageContentType;

    public ImageDTO(){

    }

    public ImageDTO(String image, String imageName, String imageContentType) {
        this.image = image;
        this.imageName = imageName;
        this.imageContentType = imageContentType;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public String getImageName() {
        return imageName;
    }

    public void setImageName(String imageName) {
        this.imageName = imageName;
    }

    public String getImageContentType() {
        return imageContentType;
    }

    public void setImageContentType(String imageContentType) {
        this.imageContentType = imageContentType;
    }
}
