import React from 'react';
import { Button, Label, Card, CardBody, Row ,CardTitle} from 'reactstrap';
import { NotificationManager } from '../../../components/common/react-notifications';
import { Colxx } from '../../../components/common/CustomBootstrap';
import * as Api from '../../../services/admin/vendor';
import { VendorForm } from '../../../containers/admin/vendor/registerForm';
import {
  AvForm,
  AvGroup,
  AvInput,
  AvField,
  AvFeedback,
} from 'availity-reactstrap-validation';

class VendorRegister extends React.Component {
  constructor(props) {  
    super(props);  
    this.state = {
      form: {
        name:"",
        email:"",
        password:"",
        dob:"",
        phone:"",
        address1:"",
        address2:"",
        city:"",
        postcode:"",
        acc_holder_name:"",
        bank_name:"",
        acc_ifsc_no:"",
        acc_no:"",
        bank_address:""
      },
      errors: {
        name:"",
        email:"",
        password:"",
        dob:"",
        phone:"",
        address1:"",
        address2:"",
        city:"",
        postcode:"",
        acc_holder_name:"",
        bank_name:"",
        acc_ifsc_no:"",
        acc_no:"",
        bank_address:""
      },
      activeTab : '1',
      showUpload : false
    }
  }

  onVendorRegister = async (values) => {
    if (!this.props.loading) {
      let errors = {
        name:"",
        email:"",
        password:"",
        dob:"",
        phone:"",
        address1:"",
        address2:"",
        city:"",
        postcode:"",
        acc_holder_name:"",
        bank_name:"",
        acc_ifsc_no:"",
        acc_no:"",
        bank_address:""
      };
      var error = 0;
      if(!values.acc_holder_name) {
        errors.acc_holder_name="Please enter the Account Holder Name";
        error++;
      }
      if(!values.bank_name) {
        errors.bank_name="Please enter the Bank Name";
        error++;
      }
      if(!values.acc_ifsc_no) {
        errors.acc_ifsc_no="Please enter the Account IFSC No";
        error++;
      }
      if(!values.acc_no) {
        errors.acc_no="Please enter the Account No";
        error++;
      }
      if(!values.bank_address) {
        errors.bank_address="Please enter the Bank Address";
        error++;
      }
      if (error===0) {
          this.setState({
            errors: errors,
          })
          Api.vendorRegister(values)
          .then(async response => response.data)
          .then(async data => {
            if(data.status==='success') {
              await NotificationManager.success('', 'Vendor Creation Successful!', 3000, null, null, '');
              this.props.history.push('/admin/vendor/list')
            } else {
              NotificationManager.error(Array.isArray(data.error) ? data.error.map(val => val.message).join(" , ") : '', 'Registration Failed! Please try again.', 3000, null, null, '');
            }
          })
          .catch(async error => {
            NotificationManager.error('', 'Registration Failed! Please try again.', 3000, null, null, '');
          });
      } else {
        this.setState({
          errors: errors,
          form: values
        })
        NotificationManager.error('', 'Please Fill The Form Currectly.', 3000, null, null, '');
      }
    }
  };
  toggle = (tab, ctab, values) => {
    let { activeTab } = this.state;
    if(parseInt(ctab)>parseInt(tab)) {
      if (activeTab !== tab) {
        this.setState({
          activeTab: tab
        })
      }
    } else {
      let errors = {
        name:"",
        email:"",
        password:"",
        dob:"",
        phone:"",
        address1:"",
        address2:"",
        city:"",
        postcode:"",
        acc_holder_name:"",
        bank_name:"",
        acc_ifsc_no:"",
        acc_no:"",
        bank_address:""
      };
      var err=0;
      if(ctab==='1') {
        if(!values.name) {
          errors.name="Please enter the Name";
          err++;
        }
        if(!values.email) {
          errors.email="Please enter the Email";
          err++;
        }
        if(!values.password) {
          errors.password="Please enter the Password";
          err++;
        }
        if(!values.dob) {
          errors.dob="Please enter the Date Of Birth";
          err++;
        }
      } else if(ctab==='2') {
        if(!values.phone) {
          errors.phone="Please enter the Phone No";
          err++;
        }
        if(!values.address1) {
          errors.address1="Please enter the Address 1";
          err++;
        }
        if(!values.address2) {
          errors.address2="Please enter the Address 2";
          err++;
        }
        if(!values.city) {
          errors.city="Please enter the City";
          err++;
        }
        if(!values.postcode) {
          errors.postcode="Please enter the Post Code";
          err++;
        }
      } else if(ctab==='3') {
        if(!values.acc_holder_name) {
          errors.acc_holder_name="Please enter the Account Holder Name";
          err++;
        }
        if(!values.bank_name) {
          errors.bank_name="Please enter the Bank Name";
          err++;
        }
        if(!values.acc_ifsc_no) {
          errors.acc_ifsc_no="Please enter the Account IFSC No";
          err++;
        }
        if(!values.acc_no) {
          errors.acc_no="Please enter the Account No";
          err++;
        }
        if(!values.bank_address) {
          errors.bank_address="Please enter the Bank Address";
          err++;
        }
      }
      if(err===0) {
        if (activeTab !== tab) {
          this.setState({
            activeTab: tab,
            errors: errors,
            form: values
          })
        }
      } else {
        this.setState({
          errors: errors,
          form: values
        })
        NotificationManager.error('', 'Please Fill The Form Currectly.', 3000, null, null, '');
      }
    }
  }
  handleChange = event => {
    const fileUploaded = event.target.files[0];
    console.log(fileUploaded)
  };
  toggleUpload = val => {
    this.setState({
      showUpload : val
    })
  }
  render() {
    const {
      activeTab,
      form,
      showUpload,
      errors
    } = this.state;
    return (
      <React.Fragment>
    <Card className="mb-5">
      <CardBody>
        <h6 className="mb-4">Create User</h6>
        <AvForm className="av-tooltip mb-5" >
        <Row>
            <Colxx xs="4">
              <AvGroup className="error-l-100 tooltip-label-right">
              <Label>First Name</Label>
              <AvInput 
                name="first_name" 
                placeholder="First Name"
                required 
                />
              <AvFeedback>Required Field</AvFeedback>
              </AvGroup>
            </Colxx>
            <Colxx xs="4">
              <AvGroup className="error-l-100 tooltip-label-right">
              <Label>Last Name</Label>
              <AvInput 
                name="last_name"
                placeholder="Last Name" 
                required 
                />
              <AvFeedback>Required Field</AvFeedback>
              </AvGroup>
            </Colxx>
            <Colxx xs="4">
              <AvGroup className="error-l-100 tooltip-label-right">
              <Label>Email <span className="text-danger">*</span> </Label>
              <AvInput 
                name="email" 
                placeholder="Email"
                required 
                />
              <AvFeedback>Required Field</AvFeedback>
              </AvGroup>
            </Colxx>
        </Row>
        <Row>
            <Colxx xs="4">
              <AvGroup className="error-l-100 tooltip-label-right">
              <Label>Photo</Label>
              <AvInput
                type="file" 
                name="avatar" 
                />
              </AvGroup>
            </Colxx>
           
            <Colxx xs="4">
              <AvGroup className="error-l-100 tooltip-label-right">
              <AvField
                type="select"
                name="email_verified"
                label="Email Verified"
              >
                <option value="0">Pending</option>
                <option value="1">Verified</option>
               
              </AvField>
              </AvGroup>
            </Colxx>
             <Colxx xs="4">
              <AvGroup className="error-l-100 tooltip-label-right">
              <Label>Phone Number<span className="text-danger">*</span></Label>
              <AvInput
                name="phone" 
                placeholder="Phone Number"
                />
                <AvFeedback>Required Field</AvFeedback>
              </AvGroup>
            </Colxx>
           
        </Row>
       
          <Button color="primary" >Submit</Button>
        </AvForm>
        
      </CardBody>
    </Card>
  </React.Fragment>
    );
  }
};

export default VendorRegister;
