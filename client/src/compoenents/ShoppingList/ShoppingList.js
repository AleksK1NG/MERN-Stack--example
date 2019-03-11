import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { ListGroup, ListGroupItem, Container, Button } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import {
  addItem,
  deleteItem,
  getAllItems,
  shoppingListSelector,
  loadingSelector
} from '../../ducks/items';
import Loader from '../Shared/Loader/Loader';

const ShoppingList = (props) => {
  useEffect(() => {
    props.getAllItems();
  }, []);

  const handleAddItem = () => {
    const itemName = prompt('Enter item name');
    if (itemName) {
      props.addItem({ name: itemName });
    }
  };

  if (props.loading) {
    return (
      <Container>
        <Loader />
      </Container>
    );
  }

  return (
    <Container>
      <Button
        color="dark"
        style={{ marginBottom: '2rem' }}
        onClick={() => handleAddItem()}
      >
        Add Item
      </Button>

      <ListGroup>
        <TransitionGroup className="shopping-list">
          {props.shoppingList &&
            props.shoppingList.map((item) => (
              <CSSTransition key={item._id} timeout={500} classNames="fade">
                <ListGroupItem>
                  <Button
                    className="remove-btn"
                    color="danger"
                    size="sm"
                    onClick={() => props.deleteItem(item._id)}
                  >
                    &times;
                  </Button>
                  {item.name}
                </ListGroupItem>
              </CSSTransition>
            ))}
        </TransitionGroup>
      </ListGroup>
    </Container>
  );
};

export default connect(
  (state) => ({
    shoppingList: shoppingListSelector(state),
    loading: loadingSelector(state)
  }),
  { addItem, deleteItem, getAllItems }
)(ShoppingList);
