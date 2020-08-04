import React from 'react';
import { Row, Card, CardBody, CardTitle } from 'reactstrap';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
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
      restaurantId: localStorage.getItem('restaurant_id'),
      permission: JSON.parse(this.props.permissionList)[0]['status']
    }
  }
  componentDidMount = () => {
    if(this.state.permission!="3") {
      this.props.history.push('/staff/menu/extra_items/list/')
    } else {
      ApiToppings.all(this.state.restaurantId)
      .then(async response => {
        if (response.status === 200) {
          this.setState({
            toppings: response.data
          })
        }
      });
    }
  }

  onVendorRegister = async (values) => {
    if (!this.props.loading) {
      var error = 0;
      if (error === 0) {
        const apidata = {
          restaurant_id: this.state.restaurantId,
          name: values.name,
          topping_group_id: values.toopings_group,
          veg_status: values.veg_status,
          price: values.price,
          status: values.status,
        }
        //console.log(apidata);
        Api.insert(apidata)
          .then(async response => {
            const data = response.data;
            if (response.status === 200) {
              NotificationManager.success('Menu Extra Item Creation Successful!', 'Success', 3000, null, null, '');
              this.props.history.push('/staff/menu/extra_items/list/')
            } else {
              NotificationManager.error(Array.isArray(data.error) ? data.error.map(val => val.message).join(" , ") : '', 'Failed! Please try again.', 3000, null, null, '');
            }
          })
          .catch(async error => {
            NotificationManager.error('Menu Extra Item Creation Failed! Please try again.', 'Failed', 3000, null, null, '');
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
                      <i className="iconsminds-add"></i>&nbsp;&nbsp;Create Extra Item
                    </CardTitle>
                  </Colxx>
                </Row>
                <ExtraItemForm loading={this.props.loading} mode={'create'} formFields={form}
                  onVendorRegister={this.onVendorRegister} toppings={toppings} />
              </CardBody>
            </Card>
          </Colxx>
        </Row>
      </React.Fragment>
    );
  }
};

const mapStateToProps = ({ authUser }) => {
  const { permissions: permissionList } = authUser;
  return { permissionList };
};

export default withRouter(connect(mapStateToProps, {})(VendorRegister));