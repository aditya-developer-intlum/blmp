import React from 'react';
import { Row, Card, CardBody, CardTitle } from 'reactstrap';
import { NotificationManager } from '../../../components/common/react-notifications';
import { Colxx } from '../../../components/common/CustomBootstrap';
import * as Api from '../../../services/vendor/restaurants';
import { VendorForm } from '../../../containers/vendor/restaurants/registerForm';

class VendorRegister extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        name:"",
        address: "",
        description: "",
        city: "",
        region: "",
        zipcode: "",
        email: "",
        phone_number: "",
        alternate_number: "",
        minimum_order_value: "",
        serve: "",
        is_active: "",
        is_cash_on_delivery: "",
        delivery_time: "",
        preparation_time: "",
        is_online: "",
        avg_cost_per_person: "",
        is_pre_order: "",
        pick_up_delivery: "",
        gst: "",
        order_timing:[
            {
                name:"BreakFast",
                start_time:"",
                end_time:""
            },
            {
                name:"Lunch",
                start_time:"",
                end_time:""
            },
            {
                name:"Dinner",
                start_time:"",
                end_time:""
            },
            {
                name:"Snacks",
                start_time:"",
                end_time:""
            },
            {
                name:"All Time Menu",
                start_time:"",
                end_time:""
            }
        ],
        delivery_timing:[
            {
                name:"BreakFast",
                start_time:"",
                end_time:""
            },
            {
                name:"Lunch",
                start_time:"",
                end_time:""
            },
            {
                name:"Dinner",
                start_time:"",
                end_time:""
            },
            {
                name:"Snacks",
                start_time:"",
                end_time:""
            },
            {
                name:"All Time Menu",
                start_time:"",
                end_time:""
            }
        ],
        restaurant_timing:[
            {
                name:"Monday",
                start_time:"",
                end_time:""
            },
            {
                name:"Tuesday",
                start_time:"",
                end_time:""
            },
            {
                name:"Wednesday",
                start_time:"",
                end_time:""
            },
            {
                name:"Thursday",
                start_time:"",
                end_time:""
            },
            {
                name:"Friday",
                start_time:"",
                end_time:""
            },
            {
                name:"Saturday",
                start_time:"",
                end_time:""
            },
            {
                name:"Sunday",
                start_time:"",
                end_time:""
            }
        ],
        cuisines:[
          {
              name:"Cajun",
              status: false
          },
          {
              name:"Chinese",
              status: false
          },
          {
              name:"French",
              status: false
          },
          {
              name:"Indian",
              status: false
          },
          {
              name:"Italian",
              status: false
          },
          {
              name:"Japanese",
              status: false
          },
          {
              name:"Mexican",
              status: false
          },
          {
              name:"Spanish",
              status: false
          }
        ],
        longitude : "",
        latitude: "",
        image:"",
        delivery_charges : [
          {
            city_name: "",
            area_name: "",
            zip_code: "",
            charges: "",
            status: true
          }
        ]
      },
      errors: {
        name:"",
        address: "",
        description: "",
        city: "",
        region: "",
        zipcode: "",
        email: "",
        phone_number: "",
        alternate_number: "",
        minimum_order_value: "",
        serve: "",
        is_active: "",
        is_cash_on_delivery: "",
        delivery_time: "",
        preparation_time: "",
        is_online: "",
        avg_cost_per_person: "",
        is_pre_order: "",
        pick_up_delivery: "",
        order_timing:[
          {start_error:"",end_error:""},
          {start_error:"",end_error:""},
          {start_error:"",end_error:""},
          {start_error:"",end_error:""},
          {start_error:"",end_error:""}
        ],
        delivery_timing:[
          {start_error:"",end_error:""},
          {start_error:"",end_error:""},
          {start_error:"",end_error:""},
          {start_error:"",end_error:""},
          {start_error:"",end_error:""}
        ],
        restaurant_timing:[
          {start_error:"",end_error:""},
          {start_error:"",end_error:""},
          {start_error:"",end_error:""},
          {start_error:"",end_error:""},
          {start_error:"",end_error:""},
          {start_error:"",end_error:""},
          {start_error:"",end_error:""}
        ],
        cuisines:[],
        delivery_charges : [],
        longitude : "",
        latitude: "",
        gst: "",
        image:""
      },
      activeTab: '1',
      showUpload: false
    }
  }

  onRegister = async (values) => {
    if (!this.props.loading) {
      let errors = {
        name:"",
        address: "",
        description: "",
        city: "",
        region: "",
        zipcode: "",
        email: "",
        phone_number: "",
        alternate_number: "",
        minimum_order_value: "",
        serve: "",
        is_active: "",
        is_cash_on_delivery: "",
        delivery_time: "",
        preparation_time: "",
        is_online: "",
        avg_cost_per_person: "",
        is_pre_order: "",
        pick_up_delivery: "",
        order_timing:[
          {start_error:"",end_error:""},
          {start_error:"",end_error:""},
          {start_error:"",end_error:""},
          {start_error:"",end_error:""},
          {start_error:"",end_error:""}
        ],
        delivery_timing:[
          {start_error:"",end_error:""},
          {start_error:"",end_error:""},
          {start_error:"",end_error:""},
          {start_error:"",end_error:""},
          {start_error:"",end_error:""}
        ],
        restaurant_timing:[
          {start_error:"",end_error:""},
          {start_error:"",end_error:""},
          {start_error:"",end_error:""},
          {start_error:"",end_error:""},
          {start_error:"",end_error:""},
          {start_error:"",end_error:""},
          {start_error:"",end_error:""}
        ],
        cuisines:[],
        delivery_charges : [],
        longitude : "",
        latitude: "",
        gst: "",
        image:""
      }
      var error = 0;
      if(!values.address){errors.address="Please enter the Address";error++;}
      if(!values.city){errors.city="Please enter the City";error++;}
      if(!values.region){errors.region="Please enter the Region";error++;}
      if(!values.zipcode){errors.zipcode="Please enter the Zip Code";error++;}
      //if(!values.longitude){errors.longitude="Please enter the Longitude";error++;}
      //if(!values.latitude){errors.latitude="Please enter the Latitude";error++;}
      if (error === 0) {
        this.setState({
          errors: errors,
        })
        Api.restaurantRegister(values)
          .then(async response => response.data)
          .then(async data => {
            if (data) {
              await NotificationManager.success('', 'Restaurant Creation Successful!', 3000, null, null, '');
              this.props.history.push('/vendor/restaurants/list')
            } else {
              NotificationManager.error(Array.isArray(data.error) ? data.error.map(val => val.message).join(" , ") : '', 'Restaurant Creation Failed! Please try again.', 3000, null, null, '');
            }
          })
          .catch(async error => {
            NotificationManager.error('', 'Restaurant Creation Failed! Please try again.', 3000, null, null, '');
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
        address: "",
        city: "",
        region: "",
        zipcode: "",
        description: "",
        email: "",
        phone_number: "",
        alternate_number: "",
        minimum_order_value: "",
        serve: "",
        is_active: "",
        is_cash_on_delivery: "",
        delivery_time: "",
        preparation_time: "",
        is_online: "",
        avg_cost_per_person: "",
        is_pre_order: "",
        pick_up_delivery: "",
        order_timing:[
          {start_error:"",end_error:""},
          {start_error:"",end_error:""},
          {start_error:"",end_error:""},
          {start_error:"",end_error:""},
          {start_error:"",end_error:""}
        ],
        delivery_timing:[
          {start_error:"",end_error:""},
          {start_error:"",end_error:""},
          {start_error:"",end_error:""},
          {start_error:"",end_error:""},
          {start_error:"",end_error:""}
        ],
        restaurant_timing:[
          {start_error:"",end_error:""},
          {start_error:"",end_error:""},
          {start_error:"",end_error:""},
          {start_error:"",end_error:""},
          {start_error:"",end_error:""},
          {start_error:"",end_error:""},
          {start_error:"",end_error:""}
        ],
        cuisines:[],
        delivery_charges : [],
        longitude : "",
        latitude: "",
        gst: "",
        image:""
      }
      var err=0;
      if(ctab==='1') {
        if(!values.name){errors.name="Please enter the Name";err++;}
        if(!values.description){errors.description="Please enter the Description";err++;}
        if(!values.email){errors.email="Please enter the Email";err++;}
        if(!values.phone_number){errors.phone_number="Please enter the Phone Number";err++;}
        if(!values.alternate_number){errors.alternate_number="Please enter the Alternate Number";err++;}
        if(!values.minimum_order_value){errors.minimum_order_value="Please enter the Minimum Order Value";err++;}
        if(!values.serve){errors.serve="Please enter the Serve";err++;}
        if(!values.is_active){errors.is_active="Please enter if Active";err++;}
        if(!values.is_cash_on_delivery){errors.is_cash_on_delivery="Please enter if support Cash On Delivery";err++;}
        //if(!values.is_online){errors.is_online="Please enter if Online";err++;}
        if(!values.avg_cost_per_person){errors.avg_cost_per_person="Please enter the Average Cost Per Person";err++;}
        //if(!values.delivery_time){errors.delivery_time="Please enter the Delivery Time";err++;}
        if(!values.preparation_time){errors.preparation_time="Please enter the Preparation Time";err++;}
      } else if(ctab==='2') {
        if(!values.is_pre_order){errors.is_pre_order="Please enter if support Pre Order";err++;}
        if(!values.pick_up_delivery){errors.pick_up_delivery="Please enter if support Pick Up Delivery";err++;}
        /*values.order_timing.map((val,index)=>{
          if(!val.start_time) {
            err++;
            errors.order_timing[index]['start_error']="Please enter the Start Time";
          }
          if(!val.end_time) {
            err++;
            errors.order_timing[index]['end_error']="Please enter the End Time";
          }
        })
        values.delivery_timing.map((val,index)=>{
          if(!val.start_time) {
            err++;
            errors.delivery_timing[index]['start_error']="Please enter the Start Time";
          }
          if(!val.end_time) {
            err++;
            errors.delivery_timing[index]['end_error']="Please enter the End Time";
          }
        })
        values.restaurant_timing.map((val,index)=>{
          if(!val.start_time) {
            err++;
            errors.restaurant_timing[index]['start_error']="Please enter the Start Time";
          }
          if(!val.end_time) {
            err++;
            errors.restaurant_timing[index]['end_error']="Please enter the End Time";
          }
        })*/
      } else if(ctab==='3') {
        if(!values.gst){errors.gst="Please enter the GST percentage";err++;}
      } else if(ctab==='4') {
        /*values.delivery_charges.map((val,index)=>{
          errors.delivery_charges.push({
            city_name: "",
            area_name: "",
            zip_code: "",
            charges: ""
          })
          if(!val.city_name) {
            err++;
            errors.delivery_charges[index]['city_name']="Please enter the City Name";
          }
          if(!val.area_name) {
            err++;
            errors.delivery_charges[index]['area_name']="Please enter the Area Name";
          }
          if(!val.zip_code) {
            err++;
            errors.delivery_charges[index]['zip_code']="Please enter the Zip Code";
          }
          if(!val.charges) {
            err++;
            errors.delivery_charges[index]['charges']="Please enter the Charges";
          }
        })*/
      } else if(ctab==='5') {
        if(!values.address){errors.address="Please enter the Address";err++;}
        if(!values.city){errors.city="Please enter the City";err++;}
        if(!values.region){errors.region="Please enter the Region";err++;}
        if(!values.zipcode){errors.zipcode="Please enter the Zip Code";err++;}
        if(!values.longitude){errors.longitude="Please enter the Longitude";err++;}
        if(!values.latitude){errors.latitude="Please enter the Latitude";err++;}
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
  addToList = async (val,index) => {
    const object = {
      id: 0,
      city: "",
      area: "",
      zipcode: "",
      charges: "",
      status: true
    }
    await val.delivery_charges.splice(index+1,0,object);
    this.setState({
      form: val  
    })
  }
  removeFromList = async (val,index) => {
    if(val.delivery_charges.length>1) {
      await val.delivery_charges.splice(index,1);
      this.setState({
        form: val  
      })
    } else {
      NotificationManager.error('', 'Atleast one row required.', 3000, null, null, '');
    }
  }
  toggleStatus = async (val,index) => {
    val.delivery_charges[index].status = await !val.delivery_charges[index].status;
    this.setState({
      form: val  
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
                      <i className="iconsminds-add"></i>&nbsp;&nbsp;Create Restaurant
                    </CardTitle>
                  </Colxx>
                </Row>
                <VendorForm loading={this.props.loading} activeTab={activeTab} mode={'create'} formFields={form} 
                onRegister={this.onRegister} toggleTab={this.toggle} handleChange={this.handleChange} 
                toggleUpload={this.toggleUpload} showUpload={showUpload} addToList={this.addToList} 
                removeFromList={this.removeFromList} toggleStatus={this.toggleStatus} formErrors={errors}/>
              </CardBody>
            </Card>
          </Colxx>
        </Row>
      </React.Fragment>
    );
  }
};

export default VendorRegister;
