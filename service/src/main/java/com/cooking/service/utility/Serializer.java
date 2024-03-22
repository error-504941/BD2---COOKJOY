package com.cooking.service.utility;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.type.CollectionType;
import org.apache.tomcat.util.codec.binary.Base64;
import org.bson.types.Binary;
import org.springframework.stereotype.Component;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Component

public class Serializer {

    public static Binary convertImageToBinary(byte[] imageData) {
        return new Binary(imageData);
    }

    public static byte[] convertBinaryToImage(Binary binaryData) {
        return binaryData.getData();
    }

    public static String convertBinaryToBase64(Binary binary) {
        byte[] data = binary.getData();
        return Serializer.encodeImageToBase64(data);
    }

    public static String convertImageToString(BufferedImage image, String formatName) throws IOException {
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        ImageIO.write(image, formatName, outputStream);

        byte[] imageBytes = outputStream.toByteArray();
        return Base64.encodeBase64String(imageBytes);
    }

    public static String encodeImageToBase64(byte[] imageData) {
        return Base64.encodeBase64String(imageData);
    }

    public static byte[] decodeBase64ToImage(String base64Data) {
        return Base64.decodeBase64(base64Data);
    }

    /** CONVERSIONE FORMATI JSON */
    public static String toJson(Object objectToSerialize) throws IOException {
        ObjectMapper mapper = new ObjectMapper();
        return mapper.writeValueAsString(objectToSerialize);

    }

    public static <T> T fromJson(String json, Class<T> valueType) throws IOException {
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            if (json.trim().startsWith("[")) {

                CollectionType listType =
                        objectMapper.getTypeFactory().constructCollectionType(ArrayList.class, valueType);
                return objectMapper.readValue(json, listType);
            } else {
                return objectMapper.readValue(json, valueType);
            }
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
}