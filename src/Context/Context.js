import React, { createContext, useState } from 'react';

// Create the context
export const VisibilityContext = createContext();

// Create the provider component
export const VisibilityProvider = ({ children }) => {
  const [loginVisib, setLoginVisib] = useState(true);
  const [signUpVisib, setSignUpVisib] = useState(false);
  const [homeVisib , setHomeVisib] = useState(false);
  const [accessToken, setAccessToken] = useState(null); // State to hold access token
  const openSignUp = () => {
    setLoginVisib(false);
    setSignUpVisib(true);
  };

  const openLogin = () => {
    setLoginVisib(true);
    setSignUpVisib(false);
  };

  // Function to save token after login
  const storeToken = (token) => {
    setAccessToken(token);
  };


  return (
    <VisibilityContext.Provider
      value={{ loginVisib, signUpVisib, openSignUp, openLogin , setLoginVisib, accessToken }}
    >
      {children}
    </VisibilityContext.Provider>
  );
};
