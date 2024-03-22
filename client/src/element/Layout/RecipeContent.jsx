import React from 'react';

const RecipeContent = ({recipe}) => {
    return (
        <div className='recipe-container'>
            <h2 className='recipe-title'>{recipe.name}</h2>
            <div className='hr-img-container'>
                <img src={`data:${recipe.image.imageContentType};base64,${recipe.image.image}`}/>
            </div>
            <div className='recipe-header'>
                <div className='recipe-header-ingredient'>
                    <h4 className='title'>INGREDIENTI</h4>
                    <ul className="list-ingredient-recipe">
                        {recipe.ingredients.map((ingredient)=>(
                            <li className='header-ingredient-list'>
                                <span className='name-ingredient'>{ingredient.name}</span>
                                {ingredient.quantity > 0 && <span>{parseInt(ingredient.quantity)}</span>}
                                <span>{ingredient.unit}</span>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className='recipe-summary'>
                    <ul className='recipe-summary-list'>
                        <li>
                            <span className='summary-category'>Cucina:</span>
                            <span className='summary-value'>{recipe.cuisine}</span>
                        </li>
                        <li>
                            <span className='summary-category'>Porzioni:</span>
                            <span className='summary-value'>{recipe.servings}</span>
                        </li>
                        <li>
                            <span className='summary-category'>Tempo di preparazione:</span>
                            <span className='summary-value'>{recipe.prepTime} min</span>
                        </li>
                    {recipe.cookTime > 0 && <li><span className='summary-category'>Tempo di cottura:</span>{recipe.cookTime} min</li>}
                    </ul>
                </div>
            </div>
            <div className='recipe-content'>
                <div className='recipe-instruction'>
                <h4 className='title'>Procedimento</h4>
                {recipe.instructions.map((instruction)=>(
                    <div className='instruction'>
                        <span className='instruction-step'>{instruction.stepNumber}</span>
                        <p className='instruction-description'>{instruction.description}</p>
                    </div>
                ))}
                </div>
            </div>
        </div>
    );
};

export default RecipeContent;