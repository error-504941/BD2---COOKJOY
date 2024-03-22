import React, { useState } from 'react';
import Select from '../../components/select/Select';
const CategoryFilter = ({onCategoryHandler, category, foodCategory}) => {
    return (
        <div className='category-filter'>
           <Select options={foodCategory} onChange={onCategoryHandler}  selectedOption={category}/>
        </div>
    );
};

export default CategoryFilter;