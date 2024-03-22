import React, { useCallback, useEffect } from 'react';
import CustomButton from '../../components/button/Button';
import Input from '../../components/input/Input';

const IngredientFilter = ({onSearchByIngredient, onIngredient, ingredient}) => {
    const onIngredientChange = (event) =>{
        onIngredient(event.target.value);
    }

    return (
       <div className='ingredient-filter-wrapper'>
         <div className='ingredient-filter'>
            <h4>Filtra le tue ricette per ingrediente: </h4>
            <div className='ingredient-filter-box'>
                <Input placeholder="Inserci qui l'ingrediente che vuoi cercare" value={ingredient} onChange={onIngredientChange}></Input>
                <CustomButton className="filter-ingredient-btn" onClick={onSearchByIngredient}>Cerca</CustomButton>
            </div>
        </div>
       </div>
    );
};

export default IngredientFilter;