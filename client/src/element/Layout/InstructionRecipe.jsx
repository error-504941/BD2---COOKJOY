import React, { useState } from 'react';
import Input from '../../components/input/Input';
import Button from '../../components/button/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const InstructionRecipe = ({callbackInstruction, defaultList= []}) => {
    const [items, setItems] = useState(defaultList);
    const [step, setStep] = useState(1);
    const [instruction, setInstruction] = useState("");

    const addItem = () => { 
        if(instruction == ""){
            return;
        }

        const newItem = 
              {
                "stepNumber": step,
                "description": instruction
              }
        setItems(prev =>{
            callbackInstruction([...prev, newItem]);
            return [...prev, newItem];
        });
        setStep(prev => prev+1);
        setInstruction(prev => "");
    };
   

    const onInstructionHandler = (event) =>{
        setInstruction(prev => event.target.value);
    }

    const deleteformList = (position) =>{
        const updatedInstruction = items.filter((_, index) => index !== position);
        setItems(prev => {
            callbackInstruction(updatedInstruction);
            return updatedInstruction
        });
    }

  
    return (
        <div className='instruction-container'>
            <span>STEP:{step}</span>
            <Input onChange={onInstructionHandler}  value={instruction} placeholder={"descrivi le varie fasi"}/>
            <Button onClick={addItem} className={'add-items'}>Aggiungi</Button>
            <div className='list-ingredient'>
                <ul>
                    {items.map((item, index) => (
                        <li key={item.stepNumber}>
                            <span>{item.description}</span>
                          <FontAwesomeIcon icon="fa-solid fa-trash"  onClick={() => deleteformList(index)} className='trash-ingredient'/>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default InstructionRecipe;