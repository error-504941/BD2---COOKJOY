package com.cooking.service.mapper;

import com.cooking.service.dto.IngredientDTO;
import com.cooking.service.dto.InstructionDTO;
import com.cooking.service.model.Ingredient;
import com.cooking.service.model.Instruction;
import com.cooking.service.model.Recipe;
import com.cooking.service.dto.RecipeDTO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

import java.util.List;

@Mapper
public interface IRecipeMapper {

    IRecipeMapper INSTANCE = Mappers.getMapper(IRecipeMapper.class);

    @Mapping(target = "image", ignore = true) // Ignore Binary field during conversion
    Recipe toEntity(RecipeDTO dto);

    RecipeDTO toDTO(Recipe entity);

}
