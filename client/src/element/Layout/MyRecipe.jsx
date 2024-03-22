import React, { useEffect, useState } from 'react';
import Message from '../../components/message/Message';
import RecipeList from '../Layout/RecipeList'
import Loader from '../../components/loader/Loader';
import Pagination from "../../components/pagination/Pagination"
import { useUserRecipeContext } from '../context/UserRecipeProveder';

const MyRecipe = () => {
    const {fetchUserRecipe, loading, error,total, recipes} = useUserRecipeContext();
    const [updateRecipe, setUpdateRecipe] = useState(false);

    const [page, setPage] = useState(1);


    useEffect(()=>{
        let request = {
            pageNum: page,
            pageSize: 4
         }
        fetchUserRecipe(request);
        if(updateRecipe){
            const timeoutId = setInterval(() => {
                fetchUserRecipe(request);
               }, 40000);
       
         return () => clearTimeout(timeoutId); 
        }
    }, [page, updateRecipe]);

    const onPageChange = (newPage) =>{
        setPage(newPage);
    }

    const onUpdateHandler = () =>{
        setUpdateRecipe(true);
    }

    return (
        <div className='my-recipe'>
             <h2 className='recipe-title'>Le mie ricette</h2>
             {loading && <Loader/>}
            {error && 
                <Message type="error" className='user-feedback'>
                    <span>{error.message}</span>
                </Message>
            }
            {(recipes != null && recipes.length > 0 ) &&
                <React.Fragment>
                    <RecipeList recipes={recipes}  updateRecipe={onUpdateHandler} />
                    <Pagination onPageChange={onPageChange} totalCount={total} pageSize={4} currentPage={page}/>
                </React.Fragment>
             }
            
            {(recipes == null ||(recipes != null && recipes.length == 0)) &&<h3 className='recipe-not-found'>Non hai ancora salvato nessuna ricetta</h3>}
        </div>
    );
};

export default MyRecipe;