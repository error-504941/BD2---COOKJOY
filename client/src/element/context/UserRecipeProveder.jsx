import React, { createContext, useContext, useState } from 'react';
import axiosRequest from '../../utils/AxiosRequest';
import {getItemWithTTL } from '../../utils/localStorage';
import { endpoint } from '../../utils/constants';

export const UserRecipeContext = createContext();

export const UserRecipeProvider = ({ children }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [total, setTotal] = useState(0);
    const [recipes, setRecipes] = useState([]);
    const [message, setMessage] = useState("");

    const clearData = () =>{
      setMessage(null);
      setRecipes([]);
      setTotal(0);
      setError(null);
      setLoading(false);
    }

    const fetchUserRecipe = async (req) => {
        try {
            const categoryCountUrl =  `${endpoint}/api/recipes/v1/recipe/user/${req.pageNum}/${req.pageSize}`;
            const storedUser = getItemWithTTL('user');
            if(storedUser == null){
              return;
            }
              const jwtToken = storedUser.bearer;
              const headers = {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwtToken}`, // Include the JWT in the Authorization header
              }
              setLoading(true);
              const response = axiosRequest("GET", categoryCountUrl, null, headers);
              response.then(res =>{
                  setLoading(false);
                  if(res.error != null){
                    setTotal(0);
                    setRecipes([]);
                    setError(res.error);
                  }else{
                    if(res.data != null){
                        setTotal(res.data.totalNumber);
                        setRecipes(res.data.recipe);
                    }
                    else{
                      setTotal(0);
                      setRecipes([]);
                      setError(null);
                    }
                  }
              })
          } catch (error) {
            console.error('Error fetching data:', error);
            setTotal(0);
            setRecipes([]);
            setError(error.message);
          }
    }

    const fetchAddRecipe = async (req) => {
      try {
        const categoryCountUrl =   endpoint +'/api/recipes/v1/recipe/save';
        const storedUser = getItemWithTTL('user');
        setLoading(true);
        if(storedUser == null){
          let error ={
            innerMessage: "BadCredentialsException", 
            message: "Sessione scaduta", 
            status: "UNAUTHORIZED"};
            setLoading(false);
            setMessage(null);
            setError(error);
          return;
        }
        const jwtToken = storedUser.bearer;
        const headers = {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${jwtToken}`, // Include the JWT in the Authorization header
        }
        const response = axiosRequest("POST", categoryCountUrl, req, headers);
        response.then(res =>{
            setLoading(false);
            setMessage(res.message);
            setError(res.error);
        })
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    const fetchUpdateRecipe = async (recipes, id) => {
      try{
        const categoryCountUrl =  `${endpoint}/api/recipes/v1/recipe/update/${id}`;
               const storedUser = getItemWithTTL('user');
               setLoading(true);
               if(storedUser == null){
                let _error ={
                  innerMessage: "BadCredentialsException", 
                  message: "Sessione scaduta", 
                  status: "UNAUTHORIZED"};
                  setMessage(null);
                  setError(_error);
                  setLoading(false);
                return;
               }
               const jwtToken = storedUser.bearer;
               const headers = {
                 'Content-Type': 'application/json',
                 'Authorization': `Bearer ${jwtToken}`, // Include the JWT in the Authorization header
               }
        
               const response = axiosRequest("PUT", categoryCountUrl, recipes, headers);
               response.then(res =>{
                  setLoading(false);
                  if(res.error != null){
                    setMessage(null);
                    setError(res.error);
                  }else{
                    setMessage(res.message);
                    setError(null);
                  }
               })
             } catch (error) {
               console.error('Error fetching data:', error);
             }
    }

    const fetchDeleteRecipe = async (id) => {
             try{
           const deleteRecipeUrl =  `${endpoint}/api/recipes/v1/recipe/delete/${id}`;
           const storedUser = getItemWithTTL('user');
           setLoading(true);
           if(storedUser == null){
       
             let _error = {
               innerMessage: "BadCredentialsException", 
               message: "Credenziali scadute", 
               status: "UNAUTHORIZED"
             }
             setLoading(false);
             setMessage(null);
             setError(_error);

             return;
           }
           const jwtToken = storedUser.bearer;
           const headers = {
             'Content-Type': 'application/json',
             'Authorization': `Bearer ${jwtToken}`, // Include the JWT in the Authorization header
           }
       
          const response = axiosRequest("DELETE", deleteRecipeUrl, null, headers);
          response.then(res =>{
            setLoading(false);
            if(res.error != null){
              setMessage(null);
              setError(res.error);
            }else{
              setMessage(res.message);
              setError(null);
            }
           })
         } catch (error) {
           console.error('Error fetching data:', error);
         }
    }


  const contextValue = React.useMemo(
    () => ({
      loading,
      message,
      recipes,
      error,
      total,
      fetchUserRecipe,
      clearData,
      fetchAddRecipe,
      fetchUpdateRecipe,
      fetchDeleteRecipe
    }),
    [loading, message, recipes, error, total]
  );

  return (
    <UserRecipeContext.Provider value={contextValue}>
      {children}
    </UserRecipeContext.Provider>
  );
};

export const useUserRecipeContext = () => {
  const context = useContext(UserRecipeContext);
  if (!context) {
    throw new Error('useUserRecipeContext must be used within a UserRecipeProvider');
  }
  return context;
};
