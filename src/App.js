import React, { useState, createContext, } from "react";
import { Route, Routes, Navigate, useLocation, } from "react-router-dom";
import Login from './components/Login/Login.js';
import Register from './components/Register/Register.js';
import CustomNavbar from './components/Navbar/Navbar.js';
import Sidebar from './components/Sidebar/Sidebar.js';
import Home from './pages/Home/Home.js';
import './App.css';

export const AuthContext = createContext();

function App() {

  return (
    <div className="App"> 
    <AuthProvider>
    <CustomNavbar/>
    <Sidebar />
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />}/>
      <Route path="/login" element={<Login />}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/home" element={<RequireAuth><Home /></RequireAuth>}/>
      <Route path="/profile" element={<RequireAuth><h1>Profile</h1></RequireAuth>}/>
      <Route path="/mailbox" element={<RequireAuth><h1>Mailbox</h1></RequireAuth>}/>
      <Route path="/settings" element={<RequireAuth><h1>Settings</h1></RequireAuth>}/>
    </Routes>
    </AuthProvider>
    </div>
  );

}

function useAuth() {
  return React.useContext(AuthContext);
}

function RequireAuth({ children }) {
  let auth = useAuth();
  let location = useLocation();
  if (!auth.user.auth) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
}

export function AuthProvider({ children }) {
  let [user, setUser] = useState({auth:false, user: {}});

  let signin = (data) => {
    setUser({auth:data.auth, userData:data.user});}
  let value = { user, signin };
  
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default App;
