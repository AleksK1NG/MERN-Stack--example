import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import AppNavBar from './compoenents/Navbar/AppNavBar';
import ShoppingList from './compoenents/ShoppingList/ShoppingList';
import ItemModal from './compoenents/ItemModal/ItemModal';
import { Container } from 'reactstrap';

const App = () => {
  return (
    <div className="App">
      <AppNavBar />
      <Container>
        <ItemModal />
        <ShoppingList />
      </Container>
    </div>
  );
};

export default App;
