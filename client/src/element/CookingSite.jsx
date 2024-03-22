import NavBar from './Layout/NavBar';
import React, { useState, useCallback} from 'react';
import { useAuthContext } from './context/AuthProvider';
import ImageCard from '../components/imageCard/ImageCard';
import { foodCategoryView, itemsPerPage } from '../utils/constants';
import { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import MainContent from './page/MainContent';
import Pagination from '../components/pagination/Pagination';
import Loader from '../components/loader/Loader';
import { useCookingContext } from './context/CookingProvider';
import IngredientFilter from './Layout/IngredientFilter';
import NotFoundElement from './page/NotFoundElement';
const CookingSite = () => {
  const {beforeSignIn} = useAuthContext();
  const {loading, categoryRecipes, recipes, 
    fetchCategoryData, total, clearFilterRecipe, fetchRecipeByIngredient, clearFilterbyCategory} = useCookingContext();
  
   const [categoryFilter, setCategoryFilter] = useState({
    value: "",
    name: ""
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [ingredient, setIngredient] = useState("");




  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  useEffect(() => {
    beforeSignIn();
  }, []);


  useEffect(() => {
    if(categoryFilter.value != "" && (recipes == null  || recipes.length == 0)){
      let req = {
        categoryName: categoryFilter.value,
        pageNum: currentPage, 
        pageSize: itemsPerPage
      }
      fetchCategoryData(req);
    }
    if(ingredient !=  "" || ingredient != null){
      onSearchByIngredient();
    }
  }, [currentPage]);

  const goBackHandler = () =>{
      setCategoryFilter(prev => {
        return({
          name: "",
          value:""

        });
    });
    setCurrentPage(1);
    clearFilterRecipe();
  }

  const onIngredient =(value) =>{
    setIngredient(value);
  };

  const onSearchByIngredient = useCallback(() =>{
   
    if(ingredient != null && ingredient != ""){
        if(categoryFilter.value == "" || categoryFilter.value == null){
          categoryFilter.value = "ALL";
        }
        let request  = {
            categoryName: categoryFilter.value, 
            ingredientName: ingredient, 
            pageNumber: currentPage, 
            pageSize: itemsPerPage
        }
        clearFilterbyCategory();
        fetchRecipeByIngredient(request);
    }
}, [ingredient, currentPage]);

  
  const onCategoryHandler = (event) =>{
    let attributes = event.target.attributes;
    if(attributes == null){
      return;
    }
    let _value = attributes.value.textContent;
    let _name = attributes.name.textContent;
    if(_value != undefined){
      setCategoryFilter(prev => {
        return({
          name: _name,
          value: _value

        });
      });
      let req = {
        categoryName: _value,
        pageNum: currentPage, 
        pageSize: itemsPerPage
      }
      fetchCategoryData(req);
    }
  }

    const ListCategory = foodCategoryView.map(cat =>
         <ImageCard imageUrl={cat.img} value={cat.value}  name={cat.name} altText={cat.name} onClick={onCategoryHandler}/>);

    let _render  = null;
    let _filterRender = null;
    let _pageRender = null;
    if(loading){
      _render = <Loader/>;
    }
    else{
      if(categoryFilter.value == "" && recipes.length == 0){
        _render = 
                <div className='home-container'>
                  <h1>Scopri tutte le nostre categorie</h1>
                  <div className='image-category-wrapper'>
                      {ListCategory}
                  </div>
                </div>
      }
      else{
        _filterRender = <React.Fragment>
                <FontAwesomeIcon icon="fa-solid fa-arrow-left" className="go-back-arrow" onClick={goBackHandler}/>
                <h2> Categoria: {categoryFilter.name == ""  ?  "Generico" : categoryFilter.name}</h2>
                <IngredientFilter category={categoryFilter.value} currentPage={currentPage} 
                onSearchByIngredient={onSearchByIngredient}
                ingredient={ingredient} onIngredient={onIngredient}/>
        </React.Fragment>

        if(categoryRecipes.length > 0){
          _render = <MainContent recipes={categoryRecipes}/>
        }else if(recipes.length > 0){
            _render = <MainContent recipes={recipes}/>
        }else{
          _render=<NotFoundElement message={"Ricette non trovate. Riprovare cambiando filtro o categoria!"}/>
        }

        _pageRender = (total > itemsPerPage ) &&  <Pagination totalCount={total} pageSize={itemsPerPage} onPageChange={handlePageChange} currentPage={currentPage}/> 
      }
      
    }
  
  return (
    <div>
      <NavBar />
      {_filterRender}
      {_render}
      {_pageRender}
    </div>
  );
};

export default CookingSite;
