import React from 'react';
import { connect } from 'react-redux';
import { ListGroup, ListGroupItem, Container, Button } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { addItem, itemsSelector } from '../../ducks/items';

const ShoppingList = (props) => {
  const handleAddItem = () => {
    const name = prompt('Enter item name');
    if (name) {
      props.addItem(name);
    }
  };

  return (
    <Container>
      <Button
        color="dark"
        style={{ marginBottom: '2rem' }}
        onClick={() => handleAddItem()}
      >
        Add Item
      </Button>
      <ListGroup>{JSON.stringify(props.items, null, 2)}</ListGroup>
    </Container>
  );
};

export default connect(
  (state) => ({
    items: itemsSelector(state)
  }),
  { addItem }
)(ShoppingList);
