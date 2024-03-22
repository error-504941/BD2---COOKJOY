import React, { createContext, useContext, useState } from 'react';
import axiosRequest from '../../utils/AxiosRequest';
import { endpoint } from '../../utils/constants';

export const CookingContext = createContext();

export const CookingProvider = ({ children }) => {
  const [recipes, setRecipes] = useState([]);
  const [categoryRecipes, setCategoryRecipes] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const clearFilterbyCategory = () =>{
    setTotal(0);
    setCategoryRecipes([]);
    setError(null);
  }
  const clearFilterRecipe = () =>{
    setTotal(0);
    setRecipes([]);
    setError(null);
  }
  
  const fetchCategoryData =  async (req) =>{
     try {
        const categoryCountUrl = 
            endpoint +`/api/recipes/v1/recipe/category/${req.categoryName}/${req.pageNum}/${req.pageSize}`;
       
        setLoading(true);
        const response = axiosRequest("GET", categoryCountUrl, null);
        response.then(res =>{
            setLoading(false);
            if(res.data != null){
              setTotal(res.data.totalNumber);
              setCategoryRecipes(res.data.recipe);
              setError(null);
            }
            else{
              setTotal(0);
              setCategoryRecipes([]);
              setError(res.error);
            }
        })
      } catch (error) {
        console.error('Error fetching data:', error);
      }
  }

  const fetchRecipeData = async (req) => {
    try {
      setLoading(true);
      const categoryCountUrl =   endpoint + '/api/recipes/v1/recipe/search';
      const response = axiosRequest("POST", categoryCountUrl, req);
      response.then(res =>{
        setLoading(false);
        if(res.error != null){
          setError(res.error);
          setTotal(0);
          setRecipes([]);
        }else{
          setError(null);
          setTotal(res.data.totalNumber);
          setRecipes(res.data.recipe);
        }
        
      })
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  const fetchRecipeByIngredient = async (req) =>{
    try {
      let {categoryName, ingredientName, pageNumber, pageSize} = req;
      setLoading(true);
      const categoryCountUrl =   endpoint + `/api/recipes/v1/recipe/${categoryName}/${ingredientName}/${pageNumber}/${pageSize}`;
      const response = axiosRequest("GET", categoryCountUrl, null);
      response.then(res =>{
        setLoading(false);
        setCategoryRecipes([]);
        if(res.error != null){
          setError(res.error);
          setTotal(0);
          setRecipes([]);
        }else{
          setError(null);
          setTotal(res.data.totalNumber);
          setRecipes(res.data.recipe);
        }
        
      })
    } catch (error) {
      setLoading(false);
      console.error('Error fetching data:', error);
    }
  }

  const contextValue = React.useMemo(
    () => ({
      loading,
      recipes,
      error,
      categoryRecipes,
      total,
      fetchRecipeData,
      fetchCategoryData,
      clearFilterRecipe,
      clearFilterbyCategory,
      fetchRecipeByIngredient
    }),
    [loading, recipes, error, total, categoryRecipes]
  );

  return (
    <CookingContext.Provider value={contextValue}>
      {children}
    </CookingContext.Provider>
  );
};

export const useCookingContext = () => {
  const context = useContext(CookingContext);
  if (!context) {
    throw new Error('useCookingContext must be used within a CookingProvider');
  }
  return context;
};