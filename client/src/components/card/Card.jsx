import React from 'react';
import './Card.css';

const Card = ({ title, imageSrc, children, className, onClick }) => {
  let customclass = ["card-component"]

  if(className != ""){
      customclass.push(className);
  }
  if(typeof className == "object"){
      customclass = [...customclass, ...className]
  }
  return (
    <div className={customclass.join('')} onClick={onClick}>
      {imageSrc && 
                <div className='card-image-container'>
                  <img src={imageSrc} alt={title} className="card-image" />
                </div>}
      <div className="card-content">
        <h3 className="card-title">{title}</h3>
        {children && children}
      </div>
    </div>
  );
};


export default Card;
