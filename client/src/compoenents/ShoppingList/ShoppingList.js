import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { ListGroup, ListGroupItem, Container, Button } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import {
  deleteItem,
  getAllItems,
  shoppingListSelector,
  loadingSelector
} from '../../ducks/items';
import Loader from '../Shared/Loader/Loader';
import SignupModal from '../Auth/SignupModal/SignupModal';
import SigninModal from '../Auth/SigninModal/SigninModal';
import Signout from '../Auth/Signout/Signout';

const ShoppingList = (props) => {
  useEffect(() => {
    props.getAllItems();
  }, []);

  if (props.loading) {
    return (
      <Container>
        <Loader />
      </Container>
    );
  }

  return (
    <Container>
      <SigninModal />
      <SignupModal />
      <Signout />
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
  { deleteItem, getAllItems }
)(ShoppingList);
