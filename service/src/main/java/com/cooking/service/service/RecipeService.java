package com.cooking.service.service;

import com.cooking.service.model.*;
import com.cooking.service.repository.ImageRepository;
import com.cooking.service.repository.IngredientRepository;
import com.cooking.service.repository.InstructionRepository;
import com.cooking.service.repository.RecipeRepository;
import com.cooking.service.utility.Pagination;
import com.cooking.service.utility.Serializer;
import lombok.SneakyThrows;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.aggregation.Aggregation;
import org.springframework.data.mongodb.core.aggregation.GroupOperation;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.*;
import java.util.concurrent.TimeUnit;
import java.util.stream.Collectors;


@Service
public class RecipeService extends Pagination<List<Recipe>, RecipeService.RecipeResult>  implements  IRecipeService {

    @Autowired
    private RedisTemplate<String, Object> redisTemplate;

    private final RecipeRepository recipeRepository;
    private final MongoTemplate mongoTemplate;

    private final IngredientRepository ingredientRepository;
    private final InstructionRepository instructionRepository;
    private  final ImageRepository imageRepository;

    @Autowired
    private IngredientService ingredientService;

    @Autowired
    public RecipeService(RecipeRepository recipeRepository, MongoTemplate mongoTemplate,
                         IngredientRepository ingredientRepository,InstructionRepository instructionRepository,
                         ImageRepository imageRepository) {
        this.recipeRepository = recipeRepository;
        this.mongoTemplate = mongoTemplate;
        this.ingredientRepository = ingredientRepository;
        this.instructionRepository = instructionRepository;
        this.imageRepository = imageRepository;
    }


    @Override
    public Map<FoodCategory, Integer> categoryNameCount() {
        GroupOperation groupOperation = Aggregation.group("category").count().as("count");

        Aggregation aggregation = Aggregation.newAggregation(groupOperation);

        List<Map> result = mongoTemplate.aggregate(aggregation, Recipe.class, Map.class).getMappedResults();

        Map<FoodCategory, Integer> categoryCountMap = new HashMap<>();
        for (Map map : result) {
            try {
                String category = (String) map.get("_id");
                FoodCategory foodCategory = FoodCategory.valueOf(category.toUpperCase());
                Integer count = (Integer) map.get("count");
                categoryCountMap.put(foodCategory, count);
            } catch (IllegalArgumentException e) {
            }
        }

        return categoryCountMap;
    }


    @SneakyThrows
    @Override
    public RecipeResult searchByNameCategory(String name, FoodCategory category, int pageNumber, int pageSize){

        String redisKey = "recipe-category:" + category;
        Object cachedRecipe = redisTemplate.opsForValue().get(redisKey);
        List<Recipe> recipes = new ArrayList<>();
       /* if (cachedRecipe == null) {*/
            Criteria nameCriteria = Criteria.where("name").regex(".*" + name + ".*", "i");
            Query query;
            if (category != FoodCategory.ALL) {
                Criteria categoryCriteria = Criteria.where("category").is(category);
                query = new Query(new Criteria().andOperator(nameCriteria, categoryCriteria));
            } else {
                query = new Query(nameCriteria);
            }
            recipes = mongoTemplate.find(query, Recipe.class);
            String serializeResponse = Serializer.toJson(recipes);
            redisTemplate.opsForValue().set(redisKey, serializeResponse);
            redisTemplate.expire(redisKey, 1000, TimeUnit.SECONDS);
       /* } else {
            recipes = (List<Recipe>) Serializer.fromJson((String) cachedRecipe, Recipe.class);
            // filtri per il nome
            recipes = recipes.stream()
                        .filter(recipe -> recipe.getName().toLowerCase().contains(name.toLowerCase()))
                        .collect(Collectors.toList());
        }*/

        return pagination(recipes, pageNumber, pageSize);
    }

    @Override
    public RecipeResult recipesByUser(String userid, int pageNumber, int pageSize) throws IOException {

        String redisKey = "recipe-user:" + userid;
        Object cachedRecipe = redisTemplate.opsForValue().get(redisKey);
        List<Recipe> recipes = new ArrayList<>();
        if (cachedRecipe == null) {
            Query query = new Query(Criteria.where("userId").is(userid));
            recipes = mongoTemplate.find(query, Recipe.class);
            String serializeResponse = Serializer.toJson(recipes);
            redisTemplate.opsForValue().set(redisKey, serializeResponse);
            redisTemplate.expire(redisKey, 1000, TimeUnit.SECONDS);
        } else {
            recipes = (List<Recipe>) Serializer.fromJson((String) cachedRecipe, Recipe.class);
        }

        return pagination(recipes, pageNumber, pageSize);

    }

    @Override
    public RecipeResult filterByCategory(FoodCategory category, int pageNumber, int pageSize){
        List<Recipe> recipes = new ArrayList<>();
        if(category == FoodCategory.UNKNOWN){
            return new RecipeResult();
        }

        String redisKey = "recipe-category:" + category;
        Object cachedRecipe = redisTemplate.opsForValue().get(redisKey);
        if (cachedRecipe == null) {
            Query query;
            if (category != FoodCategory.ALL) {
                query = new Query(Criteria.where("category").is(category));
            }else {
                query = new Query();
            }

            recipes = mongoTemplate.find(query, Recipe.class);

            try {
                String serializeResponse = Serializer.toJson(recipes);
                redisTemplate.opsForValue().set(redisKey, serializeResponse);
                redisTemplate.expire(redisKey, 1000, TimeUnit.SECONDS);
            } catch (IOException e) {
                e.printStackTrace();
                return new RecipeResult();
            }

        } else {
            try {
                recipes = (List<Recipe>) Serializer.fromJson((String) cachedRecipe, Recipe.class);
            } catch (IOException e) {
                e.printStackTrace();
                return new RecipeResult();
            }
        }

        return pagination(recipes, pageNumber, pageSize);
    }

    @Override
    public Boolean addRecipe(Recipe recipe, String userId) {
        Boolean response = false;
       try {
           recipe.setUserId(userId);
           if(recipe.getIngredients() != null){
               for (Ingredient ingredient : recipe.getIngredients()) {
                   ingredientRepository.save(ingredient);
               }
           }

           if(recipe.getInstructions() != null){
               for (Instruction instruction : recipe.getInstructions()) {
                   instructionRepository.save(instruction);
               }
           }

           if(recipe.getImage() != null){
               imageRepository.save(recipe.getImage());
           }

           Recipe rc = recipeRepository.save(recipe);
           if(rc != null) {
               String redisKey = "recipe-category:" + recipe.getCategory();
               Object cachedRecipe = redisTemplate.opsForValue().get(redisKey);
               if(cachedRecipe != null) {
                   redisTemplate.delete(redisKey);
               }

               String redisUserKey = "recipe-user:" + userId;
               cachedRecipe = redisTemplate.opsForValue().get(redisUserKey);
               if(cachedRecipe != null) {
                   redisTemplate.delete(redisUserKey);
               }

               return true;
           }
       } catch (DataAccessException ex) {
           ex.printStackTrace();
           return false;
       }
       return false;
    }

  @Override
  public Boolean updateRecipe(String recipeId, Recipe recipe, String userId) {
      try {
          Recipe oldRecipe = recipeRepository.findById(recipeId).orElse(null);

          if (oldRecipe != null) {
              try {
                  recipe.setUserId(userId);

                  if (recipe.getIngredients() != null) {
                      for (Ingredient ingredient : recipe.getIngredients()) {
                          ingredientRepository.save(ingredient);
                      }
                  }

                  if (recipe.getInstructions() != null) {
                      for (Instruction instruction : recipe.getInstructions()) {
                          instructionRepository.save(instruction);
                      }
                  }

                  if (recipe.getImage() != null) {
                      String imageId = oldRecipe.getImage().getId();
                      recipe.getImage().setId(imageId);
                      imageRepository.save(recipe.getImage());
                  }

                  recipe.setId(recipeId);
                  Recipe rc = recipeRepository.save(recipe);
                  if(rc != null) {
                      String redisKey = "recipe-category:" + recipe.getCategory();
                      Object cachedRecipe = redisTemplate.opsForValue().get(redisKey);
                      if(cachedRecipe != null) {
                          redisTemplate.delete(redisKey);
                      }

                      String redisUserKey = "recipe-user:" + userId;
                      cachedRecipe = redisTemplate.opsForValue().get(redisUserKey);
                      if(cachedRecipe != null) {
                          redisTemplate.delete(redisUserKey);
                      }
                      return true;
                  }
              } catch (DataAccessException ex) {
                  // Log the specific exception details
                  ex.printStackTrace();
                  return false;
              }
          }

          return false;

      } catch (DataAccessException ex) {
          ex.printStackTrace();
          return false;
      }
  }


    @Override
    public Boolean deleteRecipe(String recipeId, String userId){
        Query query = new Query(Criteria.where("userId").is(userId).and("_id").is(recipeId));
        Recipe findRecipe = mongoTemplate.findOne(query, Recipe.class);
        if(findRecipe != null){
            try{

                Recipe recipe = recipeRepository.findById(recipeId).orElse(null);

                if (recipe != null) {
                    for (Ingredient ingredient : recipe.getIngredients()) {
                        mongoTemplate.remove(new Query(Criteria.where("_id").is(ingredient.getId())), Ingredient.class);
                    }
                    for (Instruction instruction: recipe.getInstructions()) {
                        mongoTemplate.remove(new Query(Criteria.where("_id").is(instruction.getId())), Instruction.class);
                    }
                    Image image = recipe.getImage();
                    if (image != null) {
                        mongoTemplate.remove(new Query(Criteria.where("_id").is(image.getId())), Image.class);
                    }

                    recipeRepository.deleteById(recipeId);
                    Recipe rc = recipeRepository.findById(recipeId).orElse(null);
                    if(rc != null) {
                        String redisKey = "recipe-category:" + recipe.getCategory();
                        Object cachedRecipe = redisTemplate.opsForValue().get(redisKey);
                        if (cachedRecipe != null) {
                            redisTemplate.delete(redisKey);
                        }

                        String redisUserKey = "recipe-user:" + userId;
                        cachedRecipe = redisTemplate.opsForValue().get(redisUserKey);
                        if(cachedRecipe != null) {
                            redisTemplate.delete(redisUserKey);
                        }
                        return true;
                    }
                }
                return false;
            } catch (DataAccessException ex) {
                ex.printStackTrace();
                return false;
            }
        }
        return false;
    }

    @SneakyThrows
    @Override
    public RecipeResult findRecipesByIngredientName(String ingredientName, FoodCategory category, int pageNumber, int pageSize) {

        List<Recipe> recipes = new ArrayList<>();
        List<Ingredient> matchingIngredients = ingredientService.findIngredientsByName(ingredientName);
        if (matchingIngredients == null || matchingIngredients.isEmpty()) {
            return new RecipeResult();
        }

        List<ObjectId> ingredientIds = matchingIngredients.stream()
                .map(Ingredient::getId)
                .map(ObjectId::new)
                .collect(Collectors.toList());

        Query query = new Query();

        if (category != null && category != FoodCategory.ALL) {
            query.addCriteria(Criteria.where("category").is(category));
        }

        if (ingredientName != null) {
            query.addCriteria(Criteria.where("ingredients.$id").in(ingredientIds));
        }


        recipes = mongoTemplate.find(query, Recipe.class);

        return pagination(recipes, pageNumber, pageSize);
    }

    @Override
    public RecipeResult pagination(List<Recipe> recipes, int pageNumber, int pageSize) {
        if (pageNumber <= 0) {
            pageNumber = 1;
        }
        if (pageSize <= 0) {
            pageSize = 6;
        }

        int totalNumber = recipes.size();
        int startIndex = (pageNumber - 1) * pageSize;
        int endIndex = Math.min(startIndex + pageSize, totalNumber);

        startIndex = Math.max(0, startIndex);
        endIndex = Math.max(startIndex, endIndex);

        List<Recipe> paginatedRecipes = recipes.subList(startIndex, endIndex);
        return new RecipeResult(paginatedRecipes, totalNumber);
    }


    public class RecipeResult {
        private List<Recipe> recipe;
        private int totalItems;

        public RecipeResult(){ }
        public RecipeResult(List<Recipe> recipe, int totalItems) {
            this.recipe = recipe;
            this.totalItems = totalItems;
        }

        public List<Recipe> getRecipe() {
            return recipe;
        }

        public int getTotalItem() {
            return totalItems;
        }
    }
}

