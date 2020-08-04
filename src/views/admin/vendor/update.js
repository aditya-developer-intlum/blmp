import React from 'react';
import { Row, Card, CardBody, CardTitle } from 'reactstrap';
import { NotificationManager } from '../../../components/common/react-notifications';
import { Colxx } from '../../../components/common/CustomBootstrap';
import * as Api from '../../../services/admin/vendor';
import { VendorForm } from '../../../containers/admin/vendor/registerForm';

class VendorUpdate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        name: "",
        email: "",
        dob: "",
        phone: "",
        address1: "",
        address2: "",
        city: "",
        postcode: "",
        acc_holder_name: "",
        bank_name: "",
        acc_ifsc_no: "",
        acc_no: "",
        bank_address: ""
      },
      errors : {
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
      activeTab: '1',
      vendorId: this.props.match.params.id,
      showUpload: false
    }
  }
  async componentDidMount() {
    await this.bindData();
  }
  bindData = async () => {
    Api.vendorShow(this.state.vendorId)
      .then(async response => response.data)
      .then(async data => {
        if (data.status === 'success') {
          let {
            form
          } = await this.state;
          let tempForm = {
            ...form
          };
          tempForm["name"] = await data.data["name"]
          tempForm["email"] = await data.data["email"]
          tempForm["dob"] = await data.data["date_of_birth"].substr(0,10)
          tempForm["phone"] = await data.data["phone"]

          tempForm["address1"] = await data.data["address"][0]["address1"]
          tempForm["address2"] = await data.data["address"][0]["address1"]
          tempForm["city"] = await data.data["address"][0]["city"]
          tempForm["postcode"] = await data.data["address"][0]["postcode"]

          tempForm["acc_holder_name"] = await data.data["bank_details"][0]["acc_holder_name"]
          tempForm["bank_name"] = await data.data["bank_details"][0]["bank_name"]
          tempForm["acc_ifsc_no"] = await data.data["bank_details"][0]["acc_ifsc_no"]
          tempForm["acc_no"] = await data.data["bank_details"][0]["acc_no"]
          tempForm["bank_address"] = await data.data["bank_details"][0]["bank_address"]
          await this.setState({
            form: tempForm
          });
        } else {
          NotificationManager.error('', 'Couldn`t find the Vendor!', 3000, null, null, '');
        }
      });
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
        Api.vendorUpdate(this.state.vendorId, values)
          .then(async response => response.data)
          .then(async data => {
            if (data.status === 'success') {
              await NotificationManager.success('', 'Vendor Updation Successful!', 3000, null, null, '');
              this.props.history.push('/admin/vendor/list')
            } else {
              NotificationManager.error(Array.isArray(data.error) ? data.error.map(val => val.message).join(" , ") : '', 'Updation Failed! Please try again.', 3000, null, null, '');
            }
          })
          .catch(async error => {
            NotificationManager.error('', 'Updation Failed! Please try again.', 3000, null, null, '');
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
      showUpload: val
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
        <Row>
          <Colxx xxs="12">
            <Card className="mb-4">
              <CardBody>
                <Row className="mb-2">
                  <Colxx xxs="10">
                    <CardTitle>
                      <i className="iconsminds-add-user"></i>&nbsp;&nbsp;Update Vendor
                    </CardTitle>
                  </Colxx>
                </Row>
                <VendorForm loading={this.props.loading} activeTab={activeTab} mode={'update'} formFields={form}
                  onVendorRegister={this.onVendorRegister} toggleTab={this.toggle} handleChange={this.handleChange}
                  toggleUpload={this.toggleUpload} showUpload={showUpload} formErrors={errors} />
              </CardBody>
            </Card>
          </Colxx>
        </Row>
      </React.Fragment>
    );
  }
};

export default VendorUpdate;
