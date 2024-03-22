import React, { useState } from 'react';
import Counter from '../../components/counter/Counter';
import Input from '../../components/input/Input';
import Select from '../../components/select/Select';
import Button from '../../components/button/Button';
import ImageUpload from '../../components/imageUpload/ImageUpload';
import InstructionRecipe from './InstructionRecipe';
import IngredientRecipe from './IngredientRecipe';
import Message from '../../components/message/Message';
import {foodCategoryAddRecipe, cookingDifficult} from '../../utils/constants';
import Loader from '../../components/loader/Loader';
import { useUserRecipeContext } from '../context/UserRecipeProveder';

const UpdateRecipe = ({recipeSelected}) => {
    const {loading, message, error, fetchUpdateRecipe} = useUserRecipeContext();

    const [recipe, setRecipe] = useState({
        name: recipeSelected.name,
        cuisine: recipeSelected.cuisine,
        category: recipeSelected.category,
        difficulty: recipeSelected.difficulty,
        prepTime: recipeSelected.prepTime,
        cookTime: recipeSelected.cookTime,
        servings: recipeSelected.servings,
        ingredients: recipeSelected.ingredients,
        instructions: recipeSelected.instructions,
        image: recipeSelected.image

    });


    const parseDataUri = (dataUri)  => {
        let base64Data  = null;
        if (dataUri != null && dataUri.startsWith("data:")) {
            let commaIndex = dataUri.indexOf(",");
            if (commaIndex != -1) {
                base64Data = dataUri.substring(commaIndex + 1);
               
            }
        }
        return base64Data;
    }

    const recipeNameHandler = (event) =>{
        setRecipe(prev => {
            return(
                {
                    ...prev,
                    name: event.target.value
                }
            )
        });
    }
    const recipeCuisineHandler = (event) =>{
        setRecipe(prev => {
            return(
                {
                    ...prev,
                    cuisine: event.target.value
                }
            )
        });
    }
    const recipecategoryHandler = (event) =>{
        setRecipe(prev => {
            return(
                {
                    ...prev,
                    category: event.target.value
                }
            )
        });
    }
    const recipeDifficultyHandler = (event) =>{
        setRecipe(prev => {
            return(
                {
                    ...prev,
                    difficulty: event.target.value
                }
            )
        });
    }

    const callbackPrepTime =(counter) =>{
        setRecipe(prev => {
            return(
                {
                    ...prev,
                    prepTime: counter
                }
            )
        });
    }
    const callbackcookingTime =(counter) =>{
        setRecipe(prev => {
            return(
                {
                    ...prev,
                    cookTime: counter
                }
            )
        });
    }

    const callbackServings =(counter) =>{
        setRecipe(prev => {
            return(
                {
                    ...prev,
                    servings: counter
                }
            )
        });
    }

    const callbackImage = (name, type, imagesrc) =>{
        let image = parseDataUri(imagesrc);
        setRecipe(prev => {
            return(
                {
                    ...prev,
                    image: {
                        image: image,
                        imageName: name,
                        imageContentType:type

                    }
                }
            )
        });
    }

    const onSaveIngredient = (ingredient) =>{
        setRecipe(prev => {
            return(
                {
                    ...prev,
                    ingredients: ingredient
                }
            )
        });
    }

    const onSaveInstruction = (instruction) =>{
        setRecipe(prev => {
            return(
                {
                    ...prev,
                    instructions:instruction
                }
            )
        });
    }


    //chiamata al servizio
    const addRecipe = () =>{
        if(recipe.name == "" || recipe.cuisine == "" || recipe.ingredients == [] || recipe.instructions == [] || recipe.image == null){
            return;
        }
        fetchUpdateRecipe(recipe, recipeSelected.id);

    }

    return (
        <div className='add-recipe'>
            {loading && <Loader/>}
             {error && 
                <Message type="error" className='user-feedback'>
                    <span>{error.message}</span>
                </Message>
            }
            {message && 
                <Message type="success" className='user-feedback'>
                    <span>{message}</span>
                </Message>
            }
            <h2>Aggiorna la ricetta </h2>
            {/**NOME RICETTA */}
            <div className='form-add-recipe'>
                <div className='left-recipe-side'>
                    <div className='first-section'>
                        <Input placeholder="titolo ricetta" onChange={recipeNameHandler} value={recipe.name}/>
                        <div className='recipe-select-section'>
                            <Select options={foodCategoryAddRecipe} onChange={recipecategoryHandler} selectedOption={recipe.category}/>
                            <Select options={cookingDifficult} onChange={recipeDifficultyHandler} selectedOption={recipe.difficulty}/>
                        </div>
                        <Input placeholder="cucina" onChange={recipeCuisineHandler} value={recipe.cuisine}/>
                    </div>
                    <div className='second-section'>
                        <div className='prep-time counter-section'>
                            <span className='section-title'>T. di preparazione (min)</span>
                            <Counter defaultValue={recipe.prepTime} callbackCounter={callbackPrepTime}/>
                        </div>
                        <div className='cook-time counter-section'>
                            <span className='section-title' >T. di cottura (min)</span>
                            <Counter defaultValue={recipe.cookTime} callbackCounter={callbackcookingTime}/>
                        </div>
                       <div className='serving counter-section'>
                            <span className='section-title'>N. di porzioni</span>
                            <Counter defaultValue={recipe.servings} callbackCounter={callbackServings}/>
                       </div>
                    </div>
                    <div className='third-section'>
                        <div>
                            <ImageUpload callbackImage={callbackImage} dafaultImage={`data:${recipe.image.imageContentType};base64,${recipe.image.image}`}/>
                        </div>
                    </div>
                </div>
                <div className='right-recipe-side'>
                
                    <div>
                        {/**ingredienti */}
                        <IngredientRecipe callbackIngredient={onSaveIngredient} defaultList={recipe.ingredients}/>
                        </div>
                        <div>
                            {/**istruzioni */}
                            <InstructionRecipe callbackInstruction={onSaveInstruction} defaultList={recipe.instructions}/>
                        </div>

                    <Button onClick={addRecipe} className={'add-recipe-btn'}>Aggiorna una ricetta</Button>
                </div>
            </div>
        </div>
    );
};

export default UpdateRecipe;