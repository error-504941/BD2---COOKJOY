import React from 'react';
import './ImageCard.css'

const ImageCard = ({ imageUrl, altText, value, name, content, onClick}) => {
  return (
    <div className="medium-image-card" onClick={onClick}>
      <img src={imageUrl} alt={altText} name={name} className="card-img" value={value}/>
      {content && 
        <div className="card-content">
          {content}
        </div>
      }
  </div>
  );
};

export default ImageCard;
