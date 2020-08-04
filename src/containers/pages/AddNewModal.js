import React, { useState }  from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Label,
} from 'reactstrap';
import { insert } from '../../services/CategoryService';

const initialState = {
  title: '',
};

const AddNewModal = ({ modalOpen, toggleModal,fetchData }) => {
  const [state, setState] = useState(initialState);

  
  const addNetItem = () => {
    const newCategory = {
      name: state.title
    };

    insert(newCategory)
    .then(res => {
      fetchData()
    })
    .catch(err => console.log(err))
    setState(initialState);
  };
  const addCategoryAndClose = () => {
    const newCategory = {
      name: state.title
    };

    insert(newCategory)
    .then(res => {
      fetchData()
    })
    .catch(err => console.log(err))
    toggleModal();
    setState(initialState);
  };
  return (
    <Modal
      isOpen={modalOpen}
      toggle={toggleModal}
      wrapClassName="modal-right"
      backdrop="static"
    >
      <ModalHeader toggle={toggleModal}>
        Add New Category
      </ModalHeader>
      <ModalBody>
        <Label>
          Name
        </Label>
        <Input
          type="text"
          defaultValue={state.title}
          onChange={(event) =>
            setState({ ...state, title: event.target.value })
          }
        />
      </ModalBody>
      <ModalFooter>
        <Button color="primary"  onClick={() => addNetItem()}>
          Submit
        </Button>{' '}
        <Button color="primary"  onClick={() => addCategoryAndClose()}>
          Submit & Close
        </Button>{' '}
        <Button color="secondary" outline onClick={toggleModal}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default AddNewModal;
