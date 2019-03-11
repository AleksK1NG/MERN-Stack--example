import React from 'react';
import { NavLink, Route } from 'react-router-dom';
import Navbar from './compoenents/Navbar/Navbar';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import AppNavBar from './compoenents/Navbar/AppNavBar';
import ShoppingList from './compoenents/ShoppingList/ShoppingList';
import ItemModal from './compoenents/ItemModal/ItemModal';

const App = () => {
  return (
    <div className="App">
      <AppNavBar />
      <ItemModal />
      <h2>JS</h2>
      <Navbar />
      <ShoppingList />
    </div>
  );
};

export default App;
