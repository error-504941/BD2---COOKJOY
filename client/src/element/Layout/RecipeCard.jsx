// RecipeCard.js

import React from 'react';
import Card from '../../components/card/Card'
const RecipeCard = ({ title, imageSrc, category, children, onClick }) => {
  return (
    <Card
        onClick={onClick}
        imageSrc={`data:${imageSrc.imageContentType};base64,${imageSrc.image}`}
        title={title}>
         <p className="recipe-card-category">{category}</p>
         {children && children}
    </Card>
  );
};

export default RecipeCard;
