import React from 'react';
import { Row, Card, CardBody, CardTitle } from 'reactstrap';
import { NotificationManager } from '../../../components/common/react-notifications';
import { Colxx } from '../../../components/common/CustomBootstrap';
import * as ApiRestaurant from '../../../services/vendor/restaurants';
import * as ApiRestaurantStaff from '../../../services/vendor/RestaurantStaff';
import { VendorForm } from '../../../containers/vendor/restaurant_staff/registerForm';

class VendorRegister extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        name: "",
        email: "",
        phone_number: "",
        password: "",
        associate_restaurant: [],
        status: "",
        permissions: [
          {name:"Menu",status:""},
          {name:"Offer",status:""},
          {name:"Order",status:""},
          {name:"Report",status:""},
          {name:"Restaurant Detail",status:""},
          {name:"Restaurant Review",status:""},
          {name:"Restaurant Wallet",status:""}
        ],
        notifications: [
          {name:"Order Emails",status:""},
          {name:"Review Emails",status:""}
        ]
      },
      errors: {
        name: "",
        email: "",
        phone_number: "",
        password: "",
        associate_restaurant: "",
        status: "",
        permissions: [{error:""},{error:""},{error:""},{error:""},{error:""},{error:""},{error:""}],
        notifications: [{error:""},{error:""}]
      },
      activeTab: '1',
      showUpload: false,
      restaurantList: []
    }
  }
  async componentDidMount() {
    await this.bindData();
  }
  bindData() {
    ApiRestaurant.restaurantAllList()
    .then(async response => {
      if (response.status === 200) {
        this.setState({
          restaurantList: response.data
        })
      }
    });
  }
  onRegister = async (values) => {
    if (!this.props.loading) {
      let errors = {
        name: "",
        email: "",
        phone_number: "",
        password: "",
        associate_restaurant: "",
        status: "",
        permissions: [{error:""},{error:""},{error:""},{error:""},{error:""},{error:""},{error:""}],
        notifications: [{error:""},{error:""}]
      }
      var error = 0;
      values.permissions.map((val,index)=>{
        if(!val.status) {
          error++;
          errors.permissions[index]['error']="Please enter the permission for "+val.name;
        }
      })
      values.notifications.map((val,index)=>{
        if(!val.status) {
          error++;
          errors.notifications[index]['error']="Please enter the permission for "+val.name;
        }
      })
      if (error === 0) {
          this.setState({
            errors: errors,
          })
          //console.log(values);
          ApiRestaurantStaff.create(values)
          .then(async response => response.data)
          .then(async data => {
            if (data) {
              await NotificationManager.success('', 'Restaurant Staff Creation Successful!', 3000, null, null, '');
              this.props.history.push('/vendor/restaurant_staff/list')
            } else {
              NotificationManager.error(Array.isArray(data.error) ? data.error.map(val => val.message).join(" , ") : '', 'Restaurant Staff Creation Failed! Please try again.', 3000, null, null, '');
            }
          })
          .catch(async error => {
            NotificationManager.error('', 'Restaurant Staff Creation Failed! Please try again.', 3000, null, null, '');
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
        name: "",
        email: "",
        phone_number: "",
        password: "",
        associate_restaurant: "",
        status: "",
        permissions: [{error:""},{error:""},{error:""},{error:""},{error:""},{error:""},{error:""}],
        notifications: [{error:""},{error:""}]
      }
      var err=0;
      if(ctab==='1') {
        if(!values.name){errors.name="Please enter the Name";err++;}
        if(!values.email){errors.email="Please enter the Email";err++;}
        if(!values.phone_number){errors.phone_number="Please enter the Phone Number";err++;}
        if(!values.password){errors.password="Please enter the Initial Password";err++;}
        if(values.associate_restaurant.length==0){errors.associate_restaurant="Please enter the Associate Restaurant";err++;}
        if(!values.status){errors.status="Please enter the Status";err++;}
      } else if(ctab==='2') {
        values.permissions.map((val,index)=>{
          if(!val.status) {
            err++;
            errors.permissions[index]['error']="Please enter the permission for "+val.name;
          }
        })
        values.notifications.map((val,index)=>{
          if(!val.status) {
            err++;
            errors.notifications[index]['error']="Please enter the permission for "+val.name;
          }
        })
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
      errors,
      restaurantList
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
                      <i className="iconsminds-add"></i>&nbsp;&nbsp;Create Restaurant Staff
                    </CardTitle>
                  </Colxx>
                </Row>
                <VendorForm loading={this.props.loading} activeTab={activeTab} mode={'create'} formFields={form} 
                onRegister={this.onRegister} toggleTab={this.toggle} handleChange={this.handleChange} 
                toggleUpload={this.toggleUpload} formErrors={errors} restaurantList={restaurantList} />
              </CardBody>
            </Card>
          </Colxx>
        </Row>
      </React.Fragment>
    );
  }
};

export default VendorRegister;
