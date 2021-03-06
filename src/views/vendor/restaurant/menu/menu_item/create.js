import React from 'react';
import { Row, Card , CardBody, CardTitle } from 'reactstrap';
import { NotificationManager } from '../../../../../components/common/react-notifications';
import { Colxx } from '../../../../../components/common/CustomBootstrap';
import * as ApiQty from '../../../../../services/vendor/ResturentMenuQty';
import * as ApiExtra from '../../../../../services/vendor/ResturentMenuExtraItems';
import * as ApiMenuGroup from '../../../../../services/vendor/ResturentMenu';
import * as ApiMenuItem from '../../../../../services/vendor/ResturentMenuItems';
import { MenuItemForm } from '../common/menuItemForm';

class VendorRegister extends React.Component {
  constructor(props) {  
    super(props);  
    this.state = {
      form: {
        name:"",
        description:"",
        menu_group: "",
        display_order:"",
        veg_status:"",
        status:"",
        spicy:"",
        price: [],
        extra: [],
        image: ""
      },
      menu_group_list : [],
      showUpload : false
    }
  }
  async componentDidMount() {
    await this.bindData();
  }
  async bindData() {
      await ApiQty.all(this.props.match.params.id)
      .then(async response => {
        if (response.status === 200) {
          let { form } = this.state
          await response.data.map((val)=>{
            form.price.push({
              id: val.id,
              name: val.name,
              price: 0,
            })
          })
          await 
          this.setState({
            form: form
          })
        }
      }).then(()=> {
        ApiExtra.all(this.props.match.params.id)
        .then(async response => {
          if (response.status === 200) {
            let { form } = this.state
            await response.data.map((val)=>{
              form.extra.push({
                id: val.id,
                name: val.name,
                status: false,
              })
            })
            await 
            this.setState({
              form: form
            })
          }
        });
      }).then(()=>{
        ApiMenuGroup.all(this.props.match.params.id)
        .then(async response => {
          if (response.status === 200) {
            this.setState({
              menu_group_list: response.data
            })
          }
        });
      })
  }
  onRegister = async (values) => {
    if (!this.props.loading) {
      var error = 0;
      if (error === 0) {
        const apidata = {
          restaurant_id : this.props.match.params.id,
          name : values.name,
          description : values.description,
          group_id : values.menu_group,
          price : values.price,
          display_order : values.display_order,
          veg_status : values.veg_status,
          status : values.status,
          spicy : values.spicy,
          extra : values.extra,
          image : values.image
        }
        //console.log(apidata);
        ApiMenuItem.insert(apidata)
          .then(async response => {
            const data = response.data;
            if (response.status === 200) {
              NotificationManager.success('', 'Menu Creation Successful!', 3000, null, null, '');
              this.props.history.push('/vendor/restaurant/menu/menu_item/list/' + this.props.match.params.id)
            } else {
              NotificationManager.error(Array.isArray(data.error) ? data.error.map(val => val.message).join(" , ") : '', 'Menu Creation Failed! Please try again.', 3000, null, null, '');
            }
          })
          .catch(async error => {
            NotificationManager.error('', 'Menu Creation Failed! Please try again.', 3000, null, null, '');
          });
      } else {
        NotificationManager.error('', 'Please Fill The Form Currectly.', 3000, null, null, '');
      }
    }
  };
  handleChange = async (event) => {
    const file = await event.target.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      let {form} = this.state;
      form.image = event.target.result;
      this.setState({
        form: form
      })
    }
    //console.log(this.state.form)
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
      menu_group_list
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
                      <i className="iconsminds-add"></i>&nbsp;&nbsp;Create Menu Item
                    </CardTitle>
                  </Colxx>
                </Row>
                <MenuItemForm  loading={this.props.loading} mode={'create'} formFields={form} 
                onRegister={this.onRegister} menu_group_list={menu_group_list} handleChange={this.handleChange} 
                toggleUpload={this.toggleUpload} />
              </CardBody>
            </Card>
          </Colxx>
        </Row>
      </React.Fragment>
    );
  }
};

export default VendorRegister;
