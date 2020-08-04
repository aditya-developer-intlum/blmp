import React from 'react';
import { Row, Card , CardBody, CardTitle } from 'reactstrap';
import { NotificationManager } from '../../../../components/common/react-notifications';
import { Colxx } from '../../../../components/common/CustomBootstrap';
import * as ApiQty from '../../../../services/vendor/ResturentMenuQty';
import * as ApiExtra from '../../../../services/vendor/ResturentMenuExtraItems';
import * as ApiMenuGroup from '../../../../services/vendor/ResturentMenu';
import * as ApiMenuItem from '../../../../services/vendor/ResturentMenuItems';
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
        extra: []
      },
      menu_group_list : [{
        id: 1,
        name: "Bread"
      }],
      RestaurantId: localStorage.getItem('restaurant_id')
    }
  }
  async componentDidMount() {
    await this.bindData();
  }
  async bindData() {
      await ApiQty.all(this.state.RestaurantId)
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
        ApiExtra.all(this.state.RestaurantId)
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
        ApiMenuGroup.all(this.state.RestaurantId)
        .then(async response => {
          if (response.status === 200) {
            this.setState({
              menu_group_list: response.data
            })
          }
        });
      }).then(()=>{
        ApiMenuItem.getDataById(this.props.match.params.item)
        .then(async response => {
          const data = response.data;
          if (response.status === 200) {
            let {form} = this.state;
            form.name = response.data.name
            form.description = response.data.description
            form.menu_group = response.data.group_id
            form.display_order = response.data.display_order
            form.veg_status = response.data.veg_status
            form.status = response.data.status
            form.spicy = response.data.spicy
            await response.data.pricing.map((pVal)=>{
              form.price.map((cVal)=>{
                if(pVal.res_menu_quanity_groups_id===cVal.id) {
                  cVal.price = pVal.price
                }
              })
            })
            await response.data.topping.map((pVal)=>{
              form.extra.map((cVal)=>{
                if(pVal.res_menu_toppings_id===cVal.id) {
                  cVal.status = pVal.status === 1 ? true : false
                }
              })
            })
            this.setState({
              form: form
            })
            //console.log(response);
          } else {
            this.props.history.push('/staff/menu/menu_group/list/')
            NotificationManager.error(Array.isArray(data.error) ? data.error.map(val => val.message).join(" , ") : '', 'No content found.', 3000, null, null, '');
          }
        })
        .catch(async error => {
          NotificationManager.error('', 'Menu loading  Failed! Please try again.', 3000, null, null, '');
        });
      })
  }
  onRegister = async (values) => {
    if (!this.props.loading) {
      var error = 0;
      if (error === 0) {
        const apidata = {
          restaurant_id : this.state.RestaurantId,
          name : values.name,
          description : values.description,
          group_id : values.menu_group,
          price : values.price,
          display_order : values.display_order,
          veg_status : values.veg_status,
          status : values.status,
          spicy : values.spicy,
          extra : values.extra
        }
        //console.log(apidata);
        ApiMenuItem.update(apidata,this.props.match.params.item)
          .then(async response => {
            const data = response.data;
            if (response.status === 200) {
              NotificationManager.success('', 'Menu Updation Successful!', 3000, null, null, '');
              //this.props.history.push('/vendor/restaurant/menu/menu_item/list/' + this.state.RestaurantId)
            } else {
              NotificationManager.error(Array.isArray(data.error) ? data.error.map(val => val.message).join(" , ") : '', 'Menu Updation Failed! Please try again.', 3000, null, null, '');
            }
          })
          .catch(async error => {
            NotificationManager.error('', 'Menu Updation Failed! Please try again.', 3000, null, null, '');
          });
      } else {
        NotificationManager.error('', 'Please Fill The Form Currectly.', 3000, null, null, '');
      }
    }
  };
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
                      <i className="iconsminds-add"></i>&nbsp;&nbsp;View Menu Item
                    </CardTitle>
                  </Colxx>
                </Row>
                <MenuItemForm  loading={this.props.loading} mode={'view'} formFields={form} 
                onRegister={this.onRegister} menu_group_list={menu_group_list} />
              </CardBody>
            </Card>
          </Colxx>
        </Row>
      </React.Fragment>
    );
  }
};

export default VendorRegister;
