import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import CookingSite from './element/CookingSite';
import './element/CookingSite.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { AuthProvider } from './element/context/AuthProvider';
import { CookingProvider } from './element/context/CookingProvider';
import { UserRecipeProvider } from './element/context/UserRecipeProveder';

library.add(fas);

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <AuthProvider>
     <CookingProvider>
      <UserRecipeProvider>
        <CookingSite />
      </UserRecipeProvider>
     </CookingProvider>
    </AuthProvider>
  </React.StrictMode>,
);
