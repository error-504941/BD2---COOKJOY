package com.cooking.service.mapper;

import com.cooking.service.dto.ImageDTO;
import com.cooking.service.dto.IngredientDTO;
import com.cooking.service.dto.InstructionDTO;
import com.cooking.service.model.Image;
import com.cooking.service.model.Ingredient;
import com.cooking.service.model.Instruction;
import com.cooking.service.model.Recipe;
import com.cooking.service.dto.RecipeDTO;
import org.apache.tomcat.util.codec.binary.Base64;
import org.mapstruct.Mapping;
import org.modelmapper.ModelMapper;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Component;

import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.List;

@Component
public class RecipeMapper implements IRecipeMapper {
    private final ModelMapper modelMapper;

    public RecipeMapper(ModelMapper modelMapper) {
        this.modelMapper = modelMapper;
    }

    public RecipeDTO toDTO(Recipe entity) {
        RecipeDTO dto = new RecipeDTO();
        modelMapper.map(entity, dto);

        if(entity.getImage() != null){
            ImageDTO image = new ImageDTO();
            image.setImageName(entity.getImage().getImageName());
            image.setImageContentType(entity.getImage().getImageContentType());
            image.setImage(Base64.encodeBase64String(entity.getImage().getImage()));

            dto.setImage(image);
        }

        return dto;
    }

    public Recipe toEntity(RecipeDTO dto) {
        Recipe entity = new Recipe();

        //check sualla quantità degli ingredienti
        if(dto.getIngredients() != null){
            for (IngredientDTO ingredient : dto.getIngredients()) {
                ingredient.setQuantity(ingredient.getQuantity().replace(",", "."));
            }
        }


        modelMapper.map(dto, entity);
        if(dto.getImage() != null){
            Image image = new Image();
            image.setImageName(dto.getImage().getImageName());
            image.setImageContentType(dto.getImage().getImageContentType());
            image.setImage(Base64.decodeBase64(dto.getImage().getImage()));

            entity.setImage(image);
        }

        return entity;
    }
}







