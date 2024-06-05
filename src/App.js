import logo from './logo.svg';
import './App.css';
// import Header from './components/Header';
import Footer from './components/Footer';
import {Route, Routes} from 'react-router-dom'
import Home from './pages/Home';
import Auth from './pages/Auth';
import Dashboard from './pages/Dashboard';
import Project from './pages/Project';
import { useContext, useState } from 'react';
import { isAuthTokenContext } from './context/ContextShare';
function App() {
  const {isAuthToken,setIsAuthToken}=useContext(isAuthTokenContext)
  return (
    <>
    {/* <Header/> */}
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/login' element={<Auth/>}/>
      <Route path='/register' element={<Auth register={"register"}/>}/>
      <Route path='/project' element={<Project/>}/>
      <Route path='/dashboard' element={isAuthToken?<Dashboard dashboard={'dashboard'}/>:<Home/>}/>

    </Routes>
    <Footer/>    
    </>
  );
}

export default App;
