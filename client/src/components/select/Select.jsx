import React from 'react';
import './Select.css'

const Select = ({selectedOption, options, onChange, className}) => {
  
  let customclass = ["select-component"]

  if(className != ""){
      customclass.push(className);
  }
  if(typeof className == "object"){
      customclass = [...customclass, ...className]
  }
    return (
        <div className={customclass.join('')}>
              <select value={selectedOption} onChange={onChange}>
                {options.map(op => <option value={op.value}>{op.name}</option>)}
              </select>
        </div>
    );
};

export default Select;