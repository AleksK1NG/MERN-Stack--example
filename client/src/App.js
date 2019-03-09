import React from 'react';
import { NavLink, Route } from 'react-router-dom';
import Navbar from './compoenents/Navbar/Navbar';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import AppNavBar from './compoenents/Navbar/AppNavBar';

const App = () => {
  return (
    <div className="App">
      <AppNavBar />
      <h2>JS</h2>
      <Navbar />
    </div>
  );
};

export default App;
