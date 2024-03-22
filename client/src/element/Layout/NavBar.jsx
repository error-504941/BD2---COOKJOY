// NavBar.js

import React, {useState} from 'react';
import { useAuthContext } from '../context/AuthProvider';
import Signin from '../page/Signin'
import Button from '../../components/button/Button';
import Search from '../../components/search/Search';
import CategoryFilter from './CategoryFilter';
import Signup from '../page/Signup';
import UserBox from './UserBox';
import { foodCategory } from '../../utils/constants'
import { useCookingContext } from '../context/CookingProvider';

const NavBar = () => {

  const {logged} = useAuthContext();

  const { fetchRecipeData, clearFilterbyCategory} = useCookingContext();
  const [openLogin, setOpenLogin] = useState(false);
  const [openSignUp, setOpenSignUp] = useState(false);


  const [searchElement, setSearchElement] = useState(
    {
      name: "",
      category: foodCategory[0].value
    });
  
  const onSignInHandler = () =>{
    setOpenLogin(prev => true);
    setOpenSignUp(prev => false);
  }


  
  const onSignupHandler = () =>{
    setOpenSignUp(prev => true);
    setOpenLogin(prev => false)
  }


  const onSearchHandler = (e) =>{
    setSearchElement(prev=> {
      return(
          {
              ...prev,
              name: e.target.value
          }
      )
    });
  }

  const onClickSearchHandler = () =>{
    if(searchElement.name == null || searchElement.name == ""){
      alert("Inserisci una parola chiave o un nome di una ricetta per avviare la ricerca.");
      return;
    }
    clearFilterbyCategory();
    let request = {
      "category":  searchElement.category,
      "name": searchElement.name,
    }
    fetchRecipeData(request);
  }

  const onCategoryHandler = (event) =>{
    setSearchElement(prev=> {
      return(
          {
              ...prev,
              category: event.target.value
          }
      )
    });
  }


  return (
    <React.Fragment>
      <div className="cooking-navbar">
         <div className='navbar-container'>
          <header>
              <h1 className='header-banner'>COOKJOY</h1>
            </header>
            {!logged && <Button className="login-button" onClick={onSignInHandler}>Login</Button>}
            {logged && <UserBox/>}
         </div>
         <div className='intestazione'>
          <h3>Esplora, Crea, Gusta: La Magia della Cucina.</h3>
          {/*BARRA DI RICERCA */}
          <Search 
              onChange = {onSearchHandler}
              onClick={onClickSearchHandler}
              className={'search-navbar'} 
              btnClass={'btn-search'}
              placeholder="Cerca qui la tua ricetta">
              <CategoryFilter onCategoryHandler={onCategoryHandler} category={searchElement.category} foodCategory={foodCategory}/>
            </Search>
         </div>
      </div>
      {openLogin && 
              <Signin
                  onSignUpCallback={onSignupHandler}
                  onClose={() => setOpenLogin(prev => false)}
                  modal={true}/>}
      {openSignUp && 
              <Signup 
                onSignInCallback={onSignInHandler}
                modal={true} 
                onClose={() => setOpenSignUp(prev => false)}/>}
    </React.Fragment>
  );
};

export default NavBar;
