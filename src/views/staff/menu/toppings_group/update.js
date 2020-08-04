import React from 'react';
import { Route, withRouter, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Row, Card, CardBody, CardTitle } from 'reactstrap';
import { NotificationManager } from '../../../../components/common/react-notifications';
import { Colxx } from '../../../../components/common/CustomBootstrap';
import * as Api from '../../../../services/vendor/ResturentMenuToppings';
import { ToppingsGroupForm } from '../common/toppingsGroupForm';

class VendorRegister extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        name: "",
        status: "",
        display_order: 0,
      },
      RestaurantId: localStorage.getItem('restaurant_id'),
      permission: JSON.parse(this.props.permissionList)[0]['status']
    }
  }
  async componentDidMount() {
    if(this.state.permission!="3") {
      this.props.history.push('/staff/menu/toppings_group/list/')
    } else {
      await this.bindData();
    }
  }
  bindData() {
    Api.getDataById(this.props.match.params.item)
      .then(async response => {
        const data = response.data;
        if (response.status === 200) {
          this.setState({
            form: {
              name: response.data.name,
              status: response.data.status,
              display_order: response.data.display_order,
            }
          })
          //console.log(response);
        } else {
          //this.props.history.push('/staff/menu/toppings_group/list/')
          NotificationManager.error(Array.isArray(data.error) ? data.error.map(val => val.message).join(" , ") : '', 'No content found.', 3000, null, null, '');
        }
      })
      .catch(async error => {
        NotificationManager.error('', 'toppings loading  Failed! Please try again.', 3000, null, null, '');
      });
  }
  onVendorRegister = async (values) => {
    if (!this.props.loading) {
      var error = 0;
      if (error === 0) {
        const apidata = {
          restaurant_id: this.state.RestaurantId,
          name: values.name,
          status: values.status,
          display_order: 1,
        }
        //console.log(apidata);
        Api.update(apidata, this.props.match.params.item)
          .then(async response => {
            const data = response.data;
            if (response.status === 200) {
              NotificationManager.success('', 'Toppings Update Successful!', 3000, null, null, '');
            } else {
              NotificationManager.error(Array.isArray(data.error) ? data.error.map(val => val.message).join(" , ") : '', 'Registration Failed! Please try again.', 3000, null, null, '');
            }
          })
          .catch(async error => {
            NotificationManager.error('', 'Toppings Update  Failed! Please try again.', 3000, null, null, '');
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
      showUpload
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
                      <i className="iconsminds-add"></i>&nbsp;&nbsp;Update Toppings Group
                    </CardTitle>
                  </Colxx>
                </Row>
                <ToppingsGroupForm loading={this.props.loading} mode={'update'} formFields={form}
                  onVendorRegister={this.onVendorRegister} />
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