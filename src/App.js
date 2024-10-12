import React, { useContext } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'; //this is routing
import './App.css';
import Home from './Components/Home'; //yeh home page keliye
import Login from './Components/Login';
import SignUp from './Components/SignUp';
import { AuthProvider } from './Context/Authcontext';
import { VisibilityContext, VisibilityProvider } from './Context/Context';

function App() {
  
  const { loginVisib } = useContext(VisibilityContext);

  return (
    <div>
      {loginVisib ? <Login /> : <SignUp />}
    </div>
  );
}


const AppWrapper = () => {
  return (
    <AuthProvider>
      <VisibilityProvider>
        <Router>
          <Routes>
            
            <Route path="/" element={<App />} />  {/* khaali / hua matlab signup vala page */}
            {/* /home is homepage */}
            <Route path="/home" element={<Home />} />
          </Routes>
        </Router>
      </VisibilityProvider>
    </AuthProvider>
  );
};

export default AppWrapper;
