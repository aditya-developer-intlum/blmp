import React from 'react';
import { Row, Card, CardBody, CardTitle } from 'reactstrap';
import { NotificationManager } from '../../../../../components/common/react-notifications';
import { Colxx } from '../../../../../components/common/CustomBootstrap';
import * as Api from '../../../../../services/vendor/ResturentMenuToppings';
import { ToppingsGroupForm } from '../common/toppingsGroupForm';

class VendorRegister extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        name: "",
        status: "",
        display_order: 0,
      }
    }
  }

  onVendorRegister = async (values) => {
    if (!this.props.loading) {
      var error = 0;
      if (error === 0) {
        const apidata = {
          restaurant_id: this.props.match.params.id,
          name: values.name,
          status: values.status,
          display_order: 1
        }
        console.log(apidata);
        Api.insert(apidata)
          .then(async response => {
            const data = response.data;
            if (response.status === 200) {
              NotificationManager.success('Menu Toppings Group Creation Successful!', 'Success', 3000, null, null, '');
              this.props.history.push('/vendor/restaurant/menu/toppings_group/list/' + this.props.match.params.id)
            } else {
              NotificationManager.error(Array.isArray(data.error) ? data.error.map(val => val.message).join(" , ") : '', 'Registration Failed! Please try again.', 3000, null, null, '');
            }
          })
          .catch(async error => {
            NotificationManager.error('Menu Toppings Group Creation Failed! Please try again.', 'Failed', 3000, null, null, '');
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
                      <i className="iconsminds-add"></i>&nbsp;&nbsp;Create Toppings Group
                    </CardTitle>
                  </Colxx>
                </Row>
                <ToppingsGroupForm loading={this.props.loading} mode={'create'} formFields={form}
                  onVendorRegister={this.onVendorRegister} />
              </CardBody>
            </Card>
          </Colxx>
        </Row>
      </React.Fragment>
    );
  }
};

export default VendorRegister;
