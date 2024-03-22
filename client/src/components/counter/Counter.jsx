import React, { useState, useEffect } from 'react';
import Button from '../button/Button';
import './Counter.css'
const Counter = ({className, size, defaultValue = 1, min= 0, max = 100, callbackCounter}) => {
    const [counter, setCounter] = useState(defaultValue);
    let customclass = ["counter-component"]
    const [incrementIntervalId, setIncrementIntervalId] = useState(null);
    const [decrementIntervalId, setDecrementIntervalId] = useState(null);

    useEffect(() => {
        return () => {
        clearIntervals();
        };
    }, []);

    const clearIntervals = () => {
        clearInterval(incrementIntervalId);
        clearInterval(decrementIntervalId);
    };

    if(className != ""){
        customclass.push(className);
    }
    if(typeof className == "object"){
        customclass = [...customclass, ...className]
    }

    if(size != ''){
        let _size = "";
        switch(size){
            case 'small':
                _size = "counter-small";
                break;
            case 'medium':
                _size = "counter-medium";
                break;
            default:
                _size = "counter-small"
                break;
        }
        customclass.push(_size);
    }

    const onIncrement = () =>{
        setCounter(prev =>{
            let increment = prev + 1;
            if(increment > max ){
                callbackCounter(max);
                return max;
            }
            callbackCounter(increment);
            return increment;
        });
    }

    const onDecrement = () =>{
        setCounter(prev =>{
            let decrement = prev - 1;
            if(decrement < min ){
                callbackCounter(min);
                return min;
            }
            callbackCounter(decrement);
            return decrement;
        });
    }

    const onIncrementDown = () => {
        clearIntervals();
        const id = setInterval(() => {
          onIncrement();
        }, 200);
        setIncrementIntervalId(id);
    };
    
    const onDecrementDown = () => {
        clearIntervals();
        const id = setInterval(() => {
          onDecrement();
        }, 200);
        setDecrementIntervalId(id);
    };
    
    const onIncrementUp = () => {
        clearInterval(incrementIntervalId);
    };
    
    const onDecrementUp = () => {
        clearInterval(decrementIntervalId);
    };
    
    return (
        <div className={customclass.join(" ")}>
            <Button onClick={onDecrement} 
            onMouseDown={onDecrementDown} onMouseUp={onDecrementUp}
            className={'counter-btn'}><span className='btn-press'>-</span></Button>
            <span className='counter-value'>{counter}</span>
            <Button onClick={onIncrement} 
            onMouseDown={onIncrementDown} onMouseUp={onIncrementUp}
            className={'counter-btn'}><span className='btn-press'>+</span></Button>
        </div>
    );
};

export default Counter;