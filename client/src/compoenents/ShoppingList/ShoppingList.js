import React from 'react';
import { connect } from 'react-redux';
import { ListGroup, ListGroupItem, Container, Button } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { addItem, deleteItem, itemsSelector } from '../../ducks/items';

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
      <ListGroup>
        {props.items &&
          props.items.map((item) => (
            <React.Fragment>
              <TransitionGroup className="shopping-list">
                <CSSTransition key={item.id} timeout={500} classNames="fade">
                  <ListGroupItem>
                    <Button
                      className="remove-btn"
                      color="danger"
                      size="sm"
                      onClick={() => props.deleteItem(item.id)}
                    >
                      &times;
                    </Button>
                    {item.name}
                  </ListGroupItem>
                </CSSTransition>
              </TransitionGroup>
            </React.Fragment>
          ))}
      </ListGroup>
    </Container>
  );
};

export default connect(
  (state) => ({
    items: itemsSelector(state)
  }),
  { addItem, deleteItem }
)(ShoppingList);
