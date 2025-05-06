import React from 'react';
import Login from './pages/logIn';
import SignUp from './pages/signup';
import VerifyEmail from './pages/verifyOtp';
import ResetPassword from './pages/resetPassword';
import './App.css'
import ForgotPassword from './pages/forgotPassword';
import CreateDoctor from './pages/createDoctor';
import NavBar from './components/navBar';
import SearchBar from './components/searchBar';
import SideBarDoctor from './components/sideBarDoctor';
import SideBarAdmin from './components/sideBarAdmin';
import LayoutDoctor from './layout/layoutDoctor';
import LayoutAdmin from './layout/layoutAdmin';
function App() {


  return (
    <>
   <LayoutDoctor/>
    </>
  )
}

export default App
