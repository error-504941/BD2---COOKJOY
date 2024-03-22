import React, { useState } from 'react';
import RecipeCard from '../Layout/RecipeCard';
import Modal from '../../components/modal/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import RecipeContent from '../Layout/RecipeContent';
const MainContent = ({recipes}) => {
    const[openRecipe, setOpenRecipe] = useState(false);
    let recipeList = null;
    if(recipes != null && recipes.length > 0){
        recipeList =  recipes.map(recipe =>{
            let difficultyIcon = "";
            switch(recipe.difficulty){
              case 'HARD':
                difficultyIcon = 
                <div className='mc-details'>
                  <FontAwesomeIcon icon="fa-solid fa-fire" />
                  <FontAwesomeIcon icon="fa-solid fa-fire" />
                  <FontAwesomeIcon icon="fa-solid fa-fire" />
                </div>
              break;
              case 'MEDIUM':
                difficultyIcon = 
                <div className='mc-details'>
                  <FontAwesomeIcon icon="fa-solid fa-fire" />
                  <FontAwesomeIcon icon="fa-solid fa-fire" />
                </div>
              break;
              case 'EASY':
                difficultyIcon = 
                <div className='mc-details'>
                  <FontAwesomeIcon icon="fa-solid fa-fire" />
                </div>
              break;
            }
           return(
              <React.Fragment>
                <RecipeCard
                    key={recipe.id}
                    title={recipe.name}
                    imageSrc={recipe.image}
                    category={recipe.category}
                    onClick={() => setOpenRecipe(recipe.id)}>
                        <div className='mc-recipe-footer'>
                           {difficultyIcon}
                        </div>
                    </RecipeCard>
                {openRecipe == recipe.id && <Modal size="medium" scrollbar onClose={() => setOpenRecipe(null)}><RecipeContent recipe={recipe}/></Modal>}
              </React.Fragment>
           );
        });
    }
    return (
      <React.Fragment>
          <div className='main-content'>
              {recipeList}
          </div>
      </React.Fragment>
    );
};

export default MainContent;