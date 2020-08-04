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
import { insert } from '../../../services/admin/ProductAttributeService';


const initialState = {
  title: '',
};

const AddNewModal = ({ modalOpen, toggleModal,fetchData }) => {
  const [state, setState] = useState(initialState);

  
  const create = () => {
    const newAttribute = {
      name: state.title
    };

    insert(newAttribute)
    .then(() => fetchData());
    
    setState(initialState);
  };
  const createAndClose = () => {
    const newAttribute = {
      name: state.title
    };

    insert(newAttribute)
    .then(() => fetchData());

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
        Add New Product Attribute
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
          value={state.title}
        />
      </ModalBody>
      <ModalFooter>
        <Button color="primary"  onClick={() => create()}>
          Submit
        </Button>{' '}
        <Button color="primary"  onClick={() => createAndClose()}>
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
