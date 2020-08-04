import React from 'react';
import { Row, Card, CardBody, CardTitle } from 'reactstrap';
import { NotificationManager } from '../../../../components/common/react-notifications';
import { Colxx } from '../../../../components/common/CustomBootstrap';
import * as Api from '../../../../services/vendor/ResturentMenuExtraItems';
import * as ApiToppings from '../../../../services/vendor/ResturentMenuToppings';
import { ExtraItemForm } from '../common/extraItemForm';

class VendorRegister extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        name: "",
        price: 0,
        veg_status: "",
        toopings_group: 0,
        status: "",
        display_order: 0,
      },
      toppings: [],
      ItemId: this.props.match.params.item,
      RestaurantId: localStorage.getItem('restaurant_id'),
    }
  }
  async componentDidMount() {
    await this.bindData();
  }
  bindData() {
    ApiToppings.all(this.state.RestaurantId)
      .then(async response => {
        if (response.status === 200) {
          this.setState({
            toppings: response.data
          })
          //console.log(response);
        }
      });
    Api.getDataById(this.props.match.params.item)
      .then(async response => {
        const data = response.data;
        //console.log(data);
        if (response.status === 200) {
          this.setState({
            form: {
              name: response.data.name,
              price: response.data.price,
              veg_status: response.data.veg_status,
              toopings_group: response.data.topping_group_id,
              status: response.data.status,
            }
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
  }
  onVendorRegister = async (values) => {
    if (!this.props.loading) {
      var error = 0;
      if (error === 0) {
        const apidata = {
          restaurant_id: this.state.RestaurantId,
          name: values.name,
          topping_group_id: values.toopings_group,
          veg_status: values.veg_status,
          price: values.price,
          status: values.status,
        }
        //console.log(apidata);
        Api.update(apidata, this.props.match.params.item)
          .then(async response => {
            const data = response.data;
            if (response.status === 200) {
              NotificationManager.success('Menu Extra Item Update Successful!', 'Success', 3000, null, null, '');
              // this.props.history.push('/vendor/restaurant/menu/extra_items/list/' + this.state.RestaurantId)
            } else {
              NotificationManager.error(Array.isArray(data.error) ? data.error.map(val => val.message).join(" , ") : '', 'Failed! Please try again.', 3000, null, null, '');
            }
          })
          .catch(async error => {
            NotificationManager.error('Menu Extra Item Update Failed! Please try again.', 'Failed', 3000, null, null, '');
          });
      } else {
        NotificationManager.error('', 'Please Fill The Form Currectly.', 3000, null, null, '');
      }
    }
  };

  render() {
    const {
      form,
      toppings
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
                      <i className="iconsminds-add"></i>&nbsp;&nbsp;View Extra Item
                    </CardTitle>
                  </Colxx>
                </Row>
                <ExtraItemForm loading={this.props.loading} mode={'view'} formFields={form}
                  onVendorRegister={this.onVendorRegister} toppings={toppings} />
              </CardBody>
            </Card>
          </Colxx>
        </Row>
      </React.Fragment>
    );
  }
};

export default VendorRegister;
