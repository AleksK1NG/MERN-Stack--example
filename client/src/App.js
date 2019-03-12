import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import AppNavBar from './compoenents/Navbar/AppNavBar';
import ShoppingList from './compoenents/ShoppingList/ShoppingList';
import ItemModal from './compoenents/ItemModal/ItemModal';
import { Container } from 'reactstrap';
import { loadUser } from './ducks/auth';

const App = (props) => {
  useEffect(() => {
    props.loadUser();
  }, []);
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

export default connect(
  null,
  { loadUser }
)(App);
