import React, { useState } from 'react';
import { connect } from 'react-redux';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input
} from 'reactstrap';
import { addItem } from '../../ducks/items';

const ItemModal = (props) => {
  const [modal, setModal] = useState(false);
  const [itemName, setItemName] = useState('');

  const toggleModal = () => setModal((modal) => !modal);

  const onSubmit = (e) => {
    e.preventDefault();

    const newItem = {
      name: itemName
    };

    props.addItem(newItem);
    setModal(false);
  };

  return (
    <div>
      <Button
        color="dark"
        style={{ marginBottom: '2rem' }}
        onClick={toggleModal}
      >
        Add Item
      </Button>

      <Modal isOpen={modal} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>Add To Shopping List</ModalHeader>
        <ModalBody>
          <Form onSubmit={onSubmit}>
            <FormGroup>
              <Label for="item">Item</Label>
              <Input
                type="text"
                name="name"
                id="item"
                placeholder="Add shopping item"
                onChange={(e) => setItemName(e.target.value)}
              />
              <Button color="dark" style={{ marginTop: '2rem' }} block>
                Add Item
              </Button>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default connect(
  (state) => ({}),
  { addItem }
)(ItemModal);
