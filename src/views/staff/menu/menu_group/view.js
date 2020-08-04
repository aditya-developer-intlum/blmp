import React from 'react';
import { Row, Card, CardBody, CardTitle } from 'reactstrap';
import { NotificationManager } from '../../../../components/common/react-notifications';
import { Colxx } from '../../../../components/common/CustomBootstrap';
import * as Api from '../../../../services/vendor/ResturentMenu';
import { ManuGroupForm } from '../common/manuGroupForm';

class VendorRegister extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        name: "",
        breakfast: false,
        lunch: false,
        dinner: false,
        snacks: false,
        all_time_menu: false,
        status: "",
        display_order: 0,
      },
      RestaurantId: localStorage.getItem('restaurant_id')
    }
  }
  async componentDidMount() {
    await this.bindData();
  }
  bindData() {
    Api.getDataById(this.props.match.params.item)
      .then(async response => {
        const data = response.data;
        if (response.status === 200) {
          this.setState({
            form: {
              name: response.data.name,
              breakfast: response.data.breakfast == 1 ? true : false,
              lunch: response.data.lunch == 1 ? true : false,
              dinner: response.data.dinner == 1 ? true : false,
              snacks: response.data.snacks == 1 ? true : false,
              all_time_menu: response.data.all_time_menu == 1 ? true : false,
              status: response.data.status,
              display_order: response.data.display_order,
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
          status: values.status,
          breakfast: values.breakfast === true ? 1 : 0,
          lunch: values.lunch === true ? 1 : 0,
          dinner: values.dinner === true ? 1 : 0,
          snacks: values.snacks === true ? 1 : 0,
          all_time_menu: values.all_time_menu === true ? 1 : 0,
        }
        //console.log(apidata);
        Api.update(apidata, this.props.match.params.item)
          .then(async response => {
            const data = response.data;
            if (response.status === 200) {
              NotificationManager.success('', 'Menu Update Successful!', 3000, null, null, '');
            } else {
              NotificationManager.error(Array.isArray(data.error) ? data.error.map(val => val.message).join(" , ") : '', 'Registration Failed! Please try again.', 3000, null, null, '');
            }
          })
          .catch(async error => {
            NotificationManager.error('', 'Menu Update  Failed! Please try again.', 3000, null, null, '');
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
                      <i className="iconsminds-add"></i>&nbsp;&nbsp;View Menu Group
                    </CardTitle>
                  </Colxx>
                </Row>
                <ManuGroupForm loading={this.props.loading} mode={'view'} formFields={form}
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
