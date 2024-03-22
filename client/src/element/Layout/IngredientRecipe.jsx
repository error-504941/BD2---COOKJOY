import Input from '../../components/input/Input';
import Button from '../../components/button/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';

const IngredientRecipe = ({callbackIngredient, defaultList= []}) => {
    const [ingredient, setIngredient] = useState(defaultList);

    const [ingredientObj, setIngredientObj] = useState({
        name: "",
        quantity: "",
        unit: ""
    });


    const onIngredientNameHandler = (event) =>{
        setIngredientObj(prev => {
            return(
                {
                    ...prev,
                    name: event.target.value
                }
            )
        });
    }
    const onIngredientQuantityHandler = (event) =>{
        setIngredientObj(prev => {
            return(
                {
                    ...prev,
                    quantity: event.target.value
                }
            )
        });
    }
    const onIngredientUnitHandler = (event) =>{
        setIngredientObj(prev => {
            return(
                {
                    ...prev,
                    unit: event.target.value
                }
            )
        });
    }

    const deleteformList = (position) =>{
        const updatedIngredient = ingredient.filter((_, index) => index !== position);
        setIngredient(prev => {
            callbackIngredient(updatedIngredient);
            return updatedIngredient
        });
    }


        // Function to add a new item to the array
    const addItem = () => { 
        if(ingredientObj.name == ""){
            return;
        }

        setIngredient(prev=>{
            callbackIngredient([...prev, ingredientObj]);
            return [...prev, ingredientObj];
        });

        setIngredientObj(prev =>{
            return({
                name: "",
                quantity: "",
                unit: ""
            });
        });
    };
    return (
        <div className='ingredient'>
            <Input value={ingredientObj.name} onChange={onIngredientNameHandler} placeholder={'nome ingrediente*'}/>
            <div className='quantity-unit'>
                <Input value={ingredientObj.quantity} onChange={onIngredientQuantityHandler} placeholder={'quantità'}/>
                <Input value={ingredientObj.unit} onChange={onIngredientUnitHandler} placeholder={'unità di misura/ q.b'}/>
            </div>
            <Button onClick={addItem} className={'add-items'}>Aggiungi</Button>
            <div className='list-ingredient'>
                <ul>
                    {ingredient.map((item, index) => (
                        <li key={Math.random() + '-'+ index} className='ingredient-item'>
                            <span>{item.name}</span>
                            <span>{item.quantity}</span>
                            <span>{item.unit}</span>
                            <FontAwesomeIcon icon="fa-solid fa-trash"  onClick={() => deleteformList(index)} className='trash-ingredient'/>
                        </li>
                    ))}
                </ul> 
            </div>
            
        </div>
    );
};

export default IngredientRecipe;