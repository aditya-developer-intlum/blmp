import React, {useState,useEffect} from 'react';
import { 
  Row, 
  Card, 
  CardBody, 
  CardTitle, 
  Table,
  DropdownToggle,
  DropdownMenu,
  DropdownItem ,
  ButtonDropdown,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  CardImg
} from 'reactstrap';
import { Colxx, Separator } from '../../../components/common/CustomBootstrap';
import Pagination from '../../../containers/pages/Pagination';
import {
  AvForm,
  AvGroup,
  AvInput,
  AvField,
  AvFeedback,
} from 'availity-reactstrap-validation';
import {all,update,changePassword} from '../../../services/admin/customer';
import moment from 'moment';

const initDetail = {
    name:'',
    email:'',
    role_id:'',
    created_at:'',
    status:'',
    mobile_verified:'',
    email_verified:'',
    avatar:''
};

const List = ()=> {
  const [currentPage, setCurrentPage] = useState(1);
  const [users,setUsers] = useState([]);
  const [totalPage, setTotalPage] = useState(1);
  const [selectedPageSize, setSelectedPageSize] = useState(3);
  const [items, setItems] = useState([]);
  const [btnDropLeft, setBtnDropLeft] = useState(false);
  const [modalBasic, setModalBasic] = useState(false);
  const [viewDetail,setViewDetail] = useState(initDetail);
  const [modifyUser,setModifyUser] = useState(false);
  const [editUser,SetEditUser] = useState(initDetail);
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedPageSize]);

    useEffect(() => {

    all().then((data) => {
      setUsers(data.data.data);  
    setTotalPage(Math.ceil(data.data.data.length/selectedPageSize));
    setItems(data.data.data.slice(0,selectedPageSize));
    });
      

  }, []);

  const onChangePage = (i) => {
    setCurrentPage(i);
    setItems(users.slice((i-1) * selectedPageSize,selectedPageSize+ (i-1) * selectedPageSize));
  }

  const openAction = (id) =>{
    
    if (btnDropLeft !== false) {
      setBtnDropLeft(false);
    }else{
      setBtnDropLeft(id);  
    }
  }
  const show = (id) => {
    
    if(modalBasic !== false){
      setModalBasic(false);
      setViewDetail(initDetail);
    }else {
      setModalBasic(id);
      setViewDetail(items[items.findIndex(item => item.id === id)]);
    }

  }
  const edit = (id) => {

    if(modifyUser !== false){
      setModifyUser(false);
      setViewDetail(initDetail);
    }else {

      setModifyUser(id);
      setViewDetail(items[items.findIndex(item => item.id === id)]);
    }
  }
  const formSubmit = () => {
      console.log(editUser);
  }

  const changePassword = (id) => {

  }

  return (
    <React.Fragment>
    <Row className="mb-12">
        <Colxx xxs="12">
          <Card className="mb-4">
            <CardBody>
              <Row className="mb-12">
                <Colxx xxs="9">
                  <CardTitle>
                    Manage User 
                  </CardTitle>    
                </Colxx>
                <Colxx xxs="3">
                  <input placeholder="Search" type="text" className="form-control"/>
                </Colxx>
              </Row>
              
              <Table>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Full Name</th>
                    <th>Email</th>
                    <th>User Type</th>
                    <th>Reg. Date</th>
                    <th>Status</th>
                    <th>Mobile Verified</th>
                    <th>Email Verified</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                { items.map((data,key) => {
                  return (
                    <tr key={data.id}>
                      <th scope="row">{data.id}</th>
                      <td>{data.name}</td>
                      <td>{data.email}</td>
                      <td>{data.role_id === 5?'User':''}</td>
                      <td>{moment(data.created_at).format('DD-MM-YYYY')}</td>
                      <td>{data.status?'Active':'Inactive' }</td>
                      <td>{data.mobile_verified?'Verified':'Not Verified'}</td>
                      <td>{data.email_verified?'Verified':'Not Verified'}</td>
                      <td>
                         
                           <ButtonDropdown
                              direction="left"
                              className="mr-1 mb-5"
                              key={data.id}
                              isOpen={btnDropLeft === data.id}
                              onClick={() => openAction(data.id)}
                            >
                              <DropdownToggle className={`glyph-icon simple-icon-options-vertical`}>
                                
                              </DropdownToggle>
                              <DropdownMenu>
                                <DropdownItem onClick={() => show(data.id)}>
                                 View Detail
                                </DropdownItem>
                                <DropdownItem onClick={() => edit(data.id)}>
                                  Edit
                                </DropdownItem>
                                <DropdownItem onClick={() => changePassword(data.id)}>
                                  Change Password
                                </DropdownItem>
                              </DropdownMenu>
                            </ButtonDropdown>

                <Modal
                  isOpen={modalBasic === data.id}
                >
                  <ModalHeader>
                    View Detail
                  </ModalHeader>
                  <ModalBody>
                   <Row className="mb-4">
        <Colxx xxs="12">
         
          
              <Form>
                <FormGroup row>
                <Colxx sm={12}>
                    <FormGroup>
                      <div className="text-center">
                        <CardImg
                          top
                          src="/assets/img/profile-pic-l.jpg"
                          alt="Card image cap"
                          className="img-thumbnail border-0 rounded-circle mb-4 list-thumbnail"
                        />
                      </div>
                    </FormGroup>
                  </Colxx>
                  <Colxx sm={12}>
                    <FormGroup>
                      <Label>
                        Name 
                      </Label>
                      <Input
                        value={viewDetail.name}
                        disabled
                      />
                    </FormGroup>
                  </Colxx>

                  <Colxx sm={12}>
                    <FormGroup>
                      <Label>
                        Email
                      </Label>
                      <Input
                      value = {viewDetail.email}
                      disabled
                      />
                    </FormGroup>
                  </Colxx>

                  <Colxx sm={12}>
                    <FormGroup>
                      <Label>
                        User Type
                      </Label>
                      <Input
                        value = {viewDetail.role_id === 5?'User':'' }
                        disabled
                      />
                    </FormGroup>
                  </Colxx>
                  <Colxx sm={12}>
                    <FormGroup>
                      <Label>
                        Reg. Date
                      </Label>
                      <Input
                        value = {moment(viewDetail.created_at).format('DD-MM-YYYY')}
                        disabled
                      />
                    </FormGroup>
                  </Colxx>
                  <Colxx sm={6}>
                    <FormGroup>
                      <Label>
                       Mobile Verified
                      </Label>
                      <Input
                        value={viewDetail.mobile_verified?'Verified':'Not Verified'}
                        disabled
                      />
                    </FormGroup>
                  </Colxx>
                  <Colxx sm={6}>
                    <FormGroup>
                      <Label>
                        Email Verified
                      </Label>
                      <Input
                        value={viewDetail.email_verified?'Verified':'Not Verified'}
                        disabled
                      />
                    </FormGroup>
                  </Colxx>                
                </FormGroup>

               
              </Form>
          
         
        </Colxx>
      </Row>
                  </ModalBody>
                  <ModalFooter>
                    <Button
                      color="secondary"
                      onClick={() => show(data.id)}
                    >
                      Cancel
                    </Button>
                  </ModalFooter>
                </Modal>
        {/*edit pop up*/}
                <Modal
                  isOpen={modifyUser === data.id}
                >
                  <ModalHeader>
                    View Detail
                  </ModalHeader>
                  <ModalBody>
                   <Row className="mb-4">
        <Colxx xxs="12">
         
          
              <Form>
                <FormGroup row>
                <Colxx sm={12}>
                    <FormGroup>
                      <Label>
                      Avatar
                      </Label>
                      <Input
                        type="file"
                        onChange={(event) => SetEditUser({...editUser,avatar:event.target.files[0]})}
                      />
                    </FormGroup>
                  </Colxx>
                  <Colxx sm={12}>
                    <FormGroup>
                      <Label>
                        Name 
                      </Label>
                      <Input
                        defaultValue={viewDetail.name}
                        onChange={(event) => SetEditUser({...editUser,name:event.target.value})}
                        
                      />
                    </FormGroup>
                  </Colxx>

                  <Colxx sm={12}>
                    <FormGroup>
                      <Label>
                        Email
                      </Label>
                      <Input
                      defaultValue = {viewDetail.email}
                      onChange={(event) => SetEditUser({...editUser,email:event.target.value})}
                      />
                    </FormGroup>
                  </Colxx>

                  <Colxx sm={12}>
                    <FormGroup>
                      <Label>
                        User Type
                      </Label>
                      <Input
                        value = {viewDetail.role_id === 5?'User':'' }
                        disabled
                      />
                    </FormGroup>
                  </Colxx>
                  <Colxx sm={6}>
                    <FormGroup>
                      <Label>
                        Reg. Date
                      </Label>
                      <Input
                        value = {moment(viewDetail.created_at).format('DD-MM-YYYY')}
                        disabled
                      />
                    </FormGroup>
                  </Colxx>
                  <Colxx sm={6}>
                    <FormGroup>
                      <Label>
                        Status
                      </Label>
                      <Input type="select" defaultValue={viewDetail.status} onChange={(event) => SetEditUser({...editUser,status:event.target.value})}>
                        <option value="0">Inactive</option>
                        <option value="1">Active</option>
                      </Input>
                    </FormGroup>
                  </Colxx>
                  <Colxx sm={6}>
                    <FormGroup>
                      <Label>
                       Mobile Verified
                      </Label>
                      <Input type="select" defaultValue={viewDetail.mobile_verified} onChange={(event) => SetEditUser({...editUser,mobile_verified:event.target.value})}>
                        <option value="0">Not Verified</option>
                        <option value="1">Verified</option>
                      </Input>
                    </FormGroup>
                  </Colxx>
                  <Colxx sm={6}>
                    <FormGroup>
                      <Label>
                        Email Verified
                      </Label>
                      <Input type="select" defaultValue={viewDetail.email_verified} onChange={(event) => SetEditUser({...editUser,email_verified:event.target.value})}>
                        <option value="0">Not Verified</option>
                        <option value="1">Verified</option>
                      </Input>
                      
                    </FormGroup>
                  </Colxx>                
                </FormGroup>

               
              </Form>
          
         
        </Colxx>
      </Row>
                  </ModalBody>
                  <ModalFooter>
                  <Button
                      color="primary"
                      onClick={() => formSubmit()}
                    >
                      Update
                    </Button>

                    <Button
                      color="secondary"
                      onClick={() => edit(data.id)}
                    >
                      Cancel
                    </Button>
                  </ModalFooter>
                </Modal>
                      </td>
                    </tr>
                  );
                })}
                </tbody>
              </Table>
              
            </CardBody>
            <Pagination
              currentPage={currentPage}
              totalPage={totalPage}
              onChangePage={(i) => onChangePage(i)}
            />
          </Card>
        </Colxx>

       
      </Row>
    </React.Fragment>
      );
}

export default List;