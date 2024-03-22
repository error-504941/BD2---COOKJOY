import React from 'react';
import './Button.css';

const CustomButton = ({ onClick, children , className, onMouseDown, onMouseUp, onMouseOut }) => {

  let customclass = ["btn-component"]

  if(className != ""){
    customclass.push(className);
  }
  if(typeof className == "object"){
    customclass = [...customclass, ...className]
  }

  return (
   <div className={customclass.join(" ")}>
      <button
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        onMouseOut={onMouseOut}
        className="default-btn"
        onClick={onClick}>
        {children && children}
    </button>
   </div>
  );
};


export default CustomButton;
