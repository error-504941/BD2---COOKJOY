package com.cooking.service.controller;

import com.cooking.service.mapper.RecipeMapper;
import com.cooking.service.model.FoodCategory;
import com.cooking.service.model.Recipe;
import com.cooking.service.request.RecipeRequest;
import com.cooking.service.dto.RecipeDTO;
import com.cooking.service.response.JwtResponse;
import com.cooking.service.response.MessageResponse;
import com.cooking.service.response.RecipeResponse;
import com.cooking.service.service.RecipeService;
import com.cooking.service.utility.CheckUser;
import com.cooking.service.utility.ErrorMessage;
import com.cooking.service.utility.ErrorStatus;
import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/recipes")
public class RecipeController {

    private final RecipeService recipeService;
    @Autowired
    private CheckUser checkUser;

    private final RecipeMapper recipeMapper;

    @Autowired
    public RecipeController(RecipeService recipeService, RecipeMapper recipeMapper) {
        this.recipeService = recipeService;
        this.recipeMapper = recipeMapper;
    }

    @GetMapping("v1/category/count")
    public Map<FoodCategory, Integer> categoryNumber(){
        HttpHeaders headers = new HttpHeaders();
        headers.add("Access-Control-Allow-Origin", "http://localhost:3000");
        Map<FoodCategory, Integer> map =  recipeService.categoryNameCount();
        return map;
    }

    @PostMapping("v1/recipe/search")
    public RecipeResponse searchRecipeByNameAndCategory(@Valid @RequestBody RecipeRequest request){
        RecipeResponse response = new RecipeResponse();
        try{
            FoodCategory category = FoodCategory.valueOf(request.getCategory());

            RecipeService.RecipeResult recipeResult = recipeService.searchByNameCategory(request.getName(), category, request.getPageNumber(), request.getPageSize());

            List<Recipe> recipes = recipeResult.getRecipe();
            if(recipes.size() > 0){
                List<RecipeDTO> data = new ArrayList<>();
                for (Recipe recipe : recipes) {
                    if (recipe != null) {
                        data.add(recipeMapper.toDTO(recipe));
                    }
                }

                response.setData(data, recipeResult.getTotalItem());
            }
            else{
                response.setData(Collections.emptyList(), 0);
            }
        }catch (Exception ex){
        response.setError(new ErrorMessage("BAD_REQUEST-",
                "Si è verificato un'errore duntate il recupero dei  dati",
                ErrorStatus.BAD_REQUEST));
    }

        return response;

    }

    @GetMapping("v1/recipe/{categoryName}/{ingredientName}/{pageNumber}/{pageSize}")
    public RecipeResponse searchRecipeByIngredientName(@PathVariable String categoryName, @PathVariable String ingredientName, @PathVariable int pageNumber, @PathVariable int pageSize){
        RecipeResponse response = new RecipeResponse();
        try {
            if(pageNumber == 0){
                pageNumber = 1;
            }

            if(pageSize == 0){
                pageSize = 6;
            }

            try {
                FoodCategory category = FoodCategory.valueOf(categoryName);
                RecipeService.RecipeResult recipeResult = recipeService.findRecipesByIngredientName(ingredientName, category, pageNumber, pageSize);

                List<Recipe> recipes = recipeResult.getRecipe();
                if(recipes != null && recipes.size() > 0){
                    List<RecipeDTO> data = new ArrayList<>();
                    for (Recipe recipe : recipes) {
                        if (recipe != null) {
                            data.add(recipeMapper.toDTO(recipe));
                        }
                    }

                    response.setData(data, recipeResult.getTotalItem());
                }
                else{
                    response.setData(Collections.emptyList(), 0);
                }
            } catch (IllegalArgumentException e) {
                response.setError(new ErrorMessage("BAD_REQUEST- categry not found into enum",
                        "Categoria non trovata",
                        ErrorStatus.BAD_REQUEST));
            }

        }catch (Exception ex){
            response.setError(new ErrorMessage("BAD_REQUEST-",
                    "Si è verificato un'errore duntate il recupero dei  dati",
                    ErrorStatus.BAD_REQUEST));
        }

        return response;
    }

    @GetMapping("v1/recipe/category/{categoryName}/{pageNumber}/{pageSize}")
    public RecipeResponse filterByCategory(@PathVariable String categoryName, @PathVariable int pageNumber, @PathVariable int pageSize){
        RecipeResponse response = new RecipeResponse();
        try {
            if(pageNumber == 0){
                pageNumber = 1;
            }

            if(pageSize == 0){
                pageSize = 6;
            }

            try {
                FoodCategory category = FoodCategory.valueOf(categoryName);

                RecipeService.RecipeResult recipeResult = recipeService.filterByCategory(category, pageNumber, pageSize);

                List<Recipe> recipes = recipeResult.getRecipe();
                if(recipes != null && recipes.size() > 0){
                    List<RecipeDTO> data = new ArrayList<>();
                    for (Recipe recipe : recipes) {
                        if (recipe != null) {
                            data.add(recipeMapper.toDTO(recipe));
                        }
                    }

                    response.setData(data, recipeResult.getTotalItem());
                }
                else{
                    response.setData(Collections.emptyList(), 0);
                }
            } catch (IllegalArgumentException e) {
                response.setError(new ErrorMessage("BAD_REQUEST- category not found into enum",
                        "Categoria non trovata",
                        ErrorStatus.BAD_REQUEST));
            }

        }catch (Exception ex){
            response.setError(new ErrorMessage("BAD_REQUEST-",
                    "Si è verificato un'errore duntate il recupero dei  dati",
                    ErrorStatus.BAD_REQUEST));
        }

        return response;
    }


    @PostMapping("v1/recipe/save")
    public MessageResponse saveRecipe(@Valid @RequestBody RecipeDTO recipeDTO, @RequestHeader Map<String, String> headers) throws IOException {
        MessageResponse response = new MessageResponse();
        JwtResponse user = checkUser.checkUserByJWT(headers);
        if(user == null){
            response.setError(new ErrorMessage("NOT AUTHORIZED",
                    "Sessione scaduta si prega di effettuare l'accesso",
                    ErrorStatus.UNAUTHORIZED));
        }
        try{
            if(recipeDTO == null){
                response.setError(new ErrorMessage("RecipeDTO is null",
                        "Dati non validi",
                        ErrorStatus.UNAUTHORIZED));
            }
            Recipe recipe = recipeMapper.toEntity(recipeDTO);
            Boolean result = recipeService.addRecipe(recipe, user.getData().getId());

            if(result){
                response.setMessage("Ricetta aggiunta con successo");
            }else{
                response.setError(new ErrorMessage("Error", "Operazione non riuscita", ErrorStatus.NOT_FOUND));
            }
        }catch (Exception ex){
            response.setError(new ErrorMessage("ERROR",
                    "Si è verificato un'errore duntante l'inserimento. Riprovare",
                    ErrorStatus.BAD_REQUEST));
        }
        return response;
    }

    @DeleteMapping("v1/recipe/delete/{idRecipe}")
    public MessageResponse deleteRecipe(@PathVariable String idRecipe, @RequestHeader Map<String, String> headers){
        MessageResponse response = new MessageResponse();

        JwtResponse user = checkUser.checkUserByJWT(headers);
        if(user == null){
            response.setError(new ErrorMessage("NOT AUTHORIZED",
                    "Sessione scaduta si prega di effettuare l'accesso",
                    ErrorStatus.UNAUTHORIZED));
        }

        if(idRecipe == null){
            response.setError(new ErrorMessage("id recipe is null", "Id non valido", ErrorStatus.NOT_FOUND));
        }

        Boolean result = recipeService.deleteRecipe(idRecipe, user.getData().getId());
        if(result){
            response.setMessage("Ricetta eliminata con successo");
        }else{
            response.setError(new ErrorMessage("Error", "Operazione non riuscita", ErrorStatus.NOT_FOUND));
        }
        return response;
    }

    @PutMapping("v1/recipe/update/{recipeId}")
    public MessageResponse updateRecipe(@PathVariable String recipeId, @RequestBody RecipeDTO updatedRecipeDTO,
                                       @RequestHeader Map<String, String> headers) {

        MessageResponse response = new MessageResponse();
        JwtResponse user = checkUser.checkUserByJWT(headers);
        if(user == null){
            response.setError(new ErrorMessage("NOT AUTHORIZED",
                    "Sessione scaduta si prega di effettuare l'accesso",
                    ErrorStatus.UNAUTHORIZED));
        }
        try{
            if(updatedRecipeDTO == null){
                response.setError(new ErrorMessage("RecipeDTO is null",
                        "Dati non validi",
                        ErrorStatus.UNAUTHORIZED));
            }
            Recipe recipe = recipeMapper.toEntity(updatedRecipeDTO);
            Boolean result = recipeService.updateRecipe(recipeId, recipe, user.getData().getId());

            if(result){
                response.setMessage("Ricetta aggiunta con successo");
            }else{
                response.setError(new ErrorMessage("Error", "Operazione non riuscita", ErrorStatus.NOT_FOUND));
            }
        }catch (Exception ex){
            response.setError(new ErrorMessage("ERROR",
                    "Si è verificato un'errore duntante l'inserimento. Riprovare",
                    ErrorStatus.BAD_REQUEST));
        }
        return response;
    }

    @GetMapping("v1/recipe/user/{pageNumber}/{pageSize}")
    public RecipeResponse  recipebyUser(@RequestHeader Map<String, String> headers, @PathVariable int pageNumber, @PathVariable int pageSize){
        RecipeResponse response = new RecipeResponse();
       try{
           JwtResponse user = checkUser.checkUserByJWT(headers);

           if(pageNumber == 0){
               pageNumber = 1;
           }

           if(pageSize == 0){
               pageSize = 10;
           }
           RecipeService.RecipeResult recipesRes = recipeService.recipesByUser(user.getData().getId(), pageNumber, pageSize);

           List<Recipe> recipes = recipesRes.getRecipe();
           if(recipes.size() > 0){
               List<RecipeDTO> data = new ArrayList<>();
               for (Recipe recipe : recipes) {
                   if (recipe != null) {
                       data.add(recipeMapper.toDTO(recipe));
                   }
               }

               response.setData(data, recipesRes.getTotalItem());
           }
           else{
               response.setData(Collections.emptyList(), 0);
           }

       }catch (Exception e){
           response.setError(
                   new ErrorMessage(
                           "Si è verificato un\' errore durante il recuper dei dati",
                           "error",
                           ErrorStatus.BAD_REQUEST
                   )
           );
       }

        return response;
    }
}
