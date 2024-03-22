import React, { createContext, useContext, useState } from 'react';
import axiosRequest from '../../utils/AxiosRequest';
import { setItemWithTTL, getItemWithTTL } from '../../utils/localStorage';
import { endpoint } from '../../utils/constants';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [logged, setLogged] = useState(false);
  const [loading, setLoading] = useState(false);
  const [signinData, setSigninData] = useState(null);
  const [signinError, setSigninError] = useState(null);
  const [signUpData, setSignUpData] = useState(null);
  const [signUpError, setSignUpError] = useState(null);

  const beforeSignIn = () => {
    const storedUser = getItemWithTTL('user');
    if (storedUser != null) {
      setSigninData(storedUser);
      setLogged(true);
      setLoading(false);
    }
  };

  const clearError = () => {
    setSignUpError(null);
    setSignUpData(null);
    setSigninError(null);
    setLoading(false);
  };

  const fetchSignIn = async (req) => {
    try {
      const signinUrl = endpoint + '/api/auth/signin';
      const response = axiosRequest('POST', signinUrl, req);
      setLoading(true);
      response.then((res) => {
        setLoading(false);
        if (res.error != null) {
          setLogged(false);
          setSigninData(null);
          setSigninError(res.error);
        } else if (res.data != null) {
          const user = {
            username: res.data.username,
            email: res.data.email,
            bearer: res.data.accessToken,
            preferences: {
              theme: 'dark',
              language: 'it',
            },
          };

          setItemWithTTL('user', user, 3200);
          setLogged(true);
          setSigninData(res.data);
          setSigninError(null);
        }
      });
    } catch (error) {
      let _error = {
        innerMessage: 'BadCredentialsException',
        message: 'Credenziali errate.Riporva',
        status: 'UNAUTHORIZED',
      };
      setLogged(false);
      setSigninData(null);
      setSigninError(_error);
    }
  };

  const fetchSignUp = async (req) => {
    try {
      const signupUrl = endpoint + '/api/auth/signup';
      setLoading(true);
      const response = await axiosRequest('POST', signupUrl, req);
      setLoading(false);
      setLogged(false);
      if (response.error != null) {
        setSignUpError(response.error);
        setSignUpData(null);
      } else if (response.data != null) {
        setSignUpError(null);
        setSignUpData(response.data);
        let loginReq = {
          username: req.username,
          password: req.password,
        };

        fetchSignIn(loginReq);
      }
    } catch (error) {
    }
  };

  const contextValue = React.useMemo(
    () => ({
      logged,
      loading,
      signUpData,
      signUpError,
      signinData,
      signinError,
      beforeSignIn,
      clearError,
      fetchSignIn,
      fetchSignUp,
    }),
    [logged, loading, signUpData, signUpError, signinData, signinError]
  );

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
};
