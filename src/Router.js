// src/Router.tsx
import React, {useEffect} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import Stats from './pages/Stats';
import Users from './pages/Users';
import Contents from './pages/Contents';
import Support from './pages/Support';
import UserDetails from './pages/UserDetails';
import UserPosts from './pages/UserPosts';
import UserSubscriptions from './pages/UserSubscriptions';
import Login from './pages/Login';
import TicketDetails from './pages/TicketDetails';
import PrivateRoute from './components/PrivateRoute';
import PublicRoute from './components/PublicRoute';
import { useAuth } from './contexts/AuthContext';
import apiClient from './api/client';
import RegistrationManagement from './pages/RegistrationManagement';

const AppRouter = () => {
  const { isLoggedIn } = useAuth();
  
  useEffect(() => {
    const token = localStorage.getItem('authToken')
    const email = localStorage.getItem('email')
    
    if (token && email) {
      apiClient.setHeader("Authorization", `Bearer ${token}`);
      apiClient.setHeader("email", email);
    }
  }, [])
  
  return (
    <Router>
      {isLoggedIn && <NavBar />}
      <Routes>
      <Route path="/login" element={<PublicRoute element={<Login />} />} />
        <Route path="/" element={<PrivateRoute element={<Home />} />} />
        <Route path="/stats" element={<PrivateRoute element={<Stats />} />} />
        <Route path="/users" element={<PrivateRoute element={<Users />} />} />
        <Route path="/users/:id" element={<PrivateRoute element={<UserDetails />} />} />
        <Route path="/users/:id/subscriptions" element={<PrivateRoute element={<UserSubscriptions />} />} />
        <Route path="/users/:id/posts" element={<PrivateRoute element={<UserPosts />} />} />
        <Route path="/support" element={<PrivateRoute element={<Support />} />} />
        <Route path="/ticket/:id" element={<PrivateRoute element={<TicketDetails />} />} />
        <Route path="/registration" element={<PrivateRoute element={<RegistrationManagement />} />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
