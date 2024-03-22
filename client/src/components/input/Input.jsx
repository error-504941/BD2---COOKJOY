import React from 'react';
import './Input.css'

const Input = ({onChange, value , placeholder , className, id, type="text", children}) => {
    let customclass = ["input-component"]

    if(className != ""){
        customclass.push(className);
    }
    if(typeof className == "object"){
        customclass = [...customclass, ...className]
    }
    return (
        <div className={customclass.join(' ')}>
            <input className= "inner-input" id={id} onChange={onChange} type={type} value={value} placeholder={placeholder}/>
            <label className="label" htmlFor={id}>{placeholder}</label>
            {children && children}
        </div>
    );
};

export default Input;