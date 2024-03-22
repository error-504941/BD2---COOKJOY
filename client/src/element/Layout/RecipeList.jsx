// RecipeList.js

import React, {useState} from 'react';
import Modal from '../../components/modal/Modal';
import RecipeCard from './RecipeCard';
import Message from '../../components/message/Message';
import RecipeContent from './RecipeContent';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Loader from '../../components/loader/Loader'
import UpdateRecipe from './UpdateRecipe';
import { useUserRecipeContext } from '../context/UserRecipeProveder';

const RecipeList = ({ recipes, updateRecipe }) => {
  const {message, loading, fetchDeleteRecipe} = useUserRecipeContext();

  const[openRecipe, setOpenRecipe] = useState({
    id: null, status: false
  });

  const [selectRecipe, setSelectRecipe] = useState({
    id: null, type: null
  });

  const onDeleteRecipeHandler = (id, nome) =>{
    const result = window.confirm("Vuoi eliminare la ricetta " + nome + "?");
    if (result) {
      fetchDeleteRecipe(id);
      setSelectRecipe({id: id, type: null});
      updateRecipe();
    } 

  }

  const onUpdateRecipeHandler = (id, nome) =>{
    const result = window.confirm("Vuoi modificare la ricetta " + nome + "?");
    if (result) {
      setSelectRecipe({id: id, type: "update"});
    } 
    return;
  }

  const onOpenRecipeHandler = (id) =>{
    setOpenRecipe(prev =>{
      return({
        id: id
      });
    });
  }

  const onCloseRecipeHandler = () =>{
    setOpenRecipe({id: null});
  }

  const onCloseUpdateRecipeHandler = () =>{
    setSelectRecipe({id: null, type: null});
  }

  return (
    <div className="recipe-list">
      {recipes != null && recipes.map((recipe) =>{


        let difficultyIcon = "";
        switch(recipe.difficulty){
          case 'HARD':
            difficultyIcon = 
            <div className='details'>
              <FontAwesomeIcon icon="fa-solid fa-fire" />
              <FontAwesomeIcon icon="fa-solid fa-fire" />
              <FontAwesomeIcon icon="fa-solid fa-fire" />
            </div>
          break;
          case 'MEDIUM':
            difficultyIcon = 
            <div className='details'>
              <FontAwesomeIcon icon="fa-solid fa-fire" />
              <FontAwesomeIcon icon="fa-solid fa-fire" />
            </div>
          break;
          case 'EASY':
            difficultyIcon = 
            <div className='details'>
              <FontAwesomeIcon icon="fa-solid fa-fire" />
            </div>
          break;
        }


        return(
          <React.Fragment>
            <div className='recipe-card'>
              <RecipeCard
                key={recipe.id}
                title={recipe.name}
                imageSrc={recipe.image}
                category={recipe.category}
                onClick={() => onOpenRecipeHandler(recipe.id)}
              >
                {(loading && recipe.id == selectRecipe.id) ? <Loader/> :
                  <div className='recipe-details'>
                  {difficultyIcon}
                    <div className='details'>
                      <span>{recipe.prepTime}</span>
                      <span>{recipe.cookTime}</span>
                      <FontAwesomeIcon icon="fa-solid fa-clock" />
                    </div>
                    <div className='details'>
                      <span>{recipe.servings}</span>
                      <FontAwesomeIcon icon="fa-solid fa-utensils" />
                    </div>
                  </div>
                }
                {(recipe.id == selectRecipe.id && message) && 
                  <Message type="success" className='user-feedback'>
                      <span>{message}</span>
                  </Message>
                }
                
              </RecipeCard>
              <div className='recipe-footer'>
                  <FontAwesomeIcon icon="fa-solid fa-pen-to-square" onClick={() => onUpdateRecipeHandler(recipe.id, recipe.name)} />
                  <FontAwesomeIcon icon="fa-solid fa-trash"  onClick={() => onDeleteRecipeHandler(recipe.id, recipe.name)}/>
              </div>
            </div>
            {openRecipe.id == recipe.id && <Modal size="fullscreen" onClose={onCloseRecipeHandler}><RecipeContent recipe={recipe}/></Modal>}
            {(recipe.id == selectRecipe.id && selectRecipe.type == "update") && <Modal size="fullscreen" onClose={onCloseUpdateRecipeHandler}><UpdateRecipe recipeSelected={recipe} /></Modal>}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default RecipeList;
