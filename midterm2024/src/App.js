import React, { useState, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import UserRegistration from './Components/UserRegistration/UserRegistration';
import HomePage from './Components/Home/HomePage';
import Navbar from './Components/Navbar/Navbar';
import LoginPage from './Components/LoginPage/LoginPage';
import MembersPage from './Components/MembersPage/MembersPage';
import ProductForm from './Components/ProductForm/ProductForm';

import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

const AdminPage = lazy(() => import('./Components/AdminPage/AdminPage'));

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  return (
    <Router>
      <Navbar isAuthenticated={isAuthenticated} />
      <Suspense 
        fallback={
          <Backdrop
            sx={{ color: '#fff', zIndex: theme => theme.zIndex.drawer + 1 }}
            open
          >
            <CircularProgress color="inherit" />
          </Backdrop>
        }
      >
        <Routes>
          <Route 
            path='/' 
            element={
              isAuthenticated ? (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginTop: "4rem", minHeight: '100vh' }}>
                  <HomePage isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
                  <LoginPage setIsAuthenticated={setIsAuthenticated} setUser={setUser} />
                </div>
              )
            } 
          />
          <Route path='/login' element={
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
                <LoginPage setIsAuthenticated={setIsAuthenticated} setUser={setUser} />
              </div>
            }  
          />
          <Route path='/registeruser' element={<UserRegistration />} />
          <Route 
            path='/members' 
            element={
              isAuthenticated ? (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
                  <MembersPage user={user} />
                </div>
              ) : (
                <Navigate to="/login" />
              )
            } 
          />
          <Route 
            path='/admin' 
            element={isAuthenticated ? <AdminPage /> : <Navigate to="/login" />} 
          />
          <Route
            path='/addProducts'
            element={
              isAuthenticated ? (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginTop: "3rem", minHeight: '100vh' }}>
                  <ProductForm/>
                </div>
              ) : (
                <Navigate to="/login" />
              )
            } 
          />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
