import React from 'react';
import { Row, Card, CardBody, CardTitle } from 'reactstrap';
import { NotificationManager } from '../../../../components/common/react-notifications';
import { Colxx } from '../../../../components/common/CustomBootstrap';
import * as Api from '../../../../services/vendor/orders';
import { OrderForm } from './common/orderForm';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

class OrderView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        current_status: "",
        order_id: "",
        is_confirmed: "",
        is_cancelled: "",
        remarks: "",
        total_price: "",
        item_list: [{
          item_name: "",
          quantity_type: "",
          no_of_item: ""
        }],
        price_list: [{
          details: "",
          price: ""
        }]
      },
      activeTab: '1',
      mode: '',
      ItemId: this.props.match.params.item,
      RestaurantId: this.props.match.params.id
    }
  }
  async componentDidMount() {
    await this.bindData();
  }
  bindData() {
    Api.show(this.state.ItemId)
    .then(async response => {
      const data = response.data.data;
      if (response.status === 200) {
        let tempForm = {
          current_status: data.current_status,
          order_id: data.id,
          is_confirmed: data.is_confirmed,
          is_cancelled: data.is_cancelled,
          remarks: data.remarks,
          total_price: `₹${data.payment.total_price}`,
          item_list: [],
          price_list: JSON.parse(data.payment.price_breaking)
        }
        let tempMode = '';
        await data.item.map((val,key)=>{
          if(val.menu_item_id) {
            tempForm.item_list.push({
              item_name: val.item.name,
              quantity_type: val.quantity.name,
              no_of_item: val.qty
            })
          } else {
            tempForm.item_list.push({
              item_name: val.extra_item.name,
              quantity_type: val.quantity.name,
              no_of_item: val.qty
            })
          }
        })
        //console.log(tempForm);
        if(data.is_confirmed === 0 && data.is_checked === 0) {
          tempMode = 'awaiting'
        } else if(data.is_confirmed === 1 && data.is_checked === 1 && data.current_status < 5) {
          tempMode = 'confirmed'
        } else if(data.is_checked === 1 && data.current_status > 4) {
          tempMode = 'history'
        }
        this.setState({
          form: tempForm,
          mode: tempMode
        })
      } else {
        //this.props.history.push('/staff/menu/menu_group/list/')
        NotificationManager.error(Array.isArray(data.error) ? data.error.map(val => val.message).join(" , ") : '', 'No content found.', 3000, null, null, '');
      }
    })
    .catch(async error => {
      NotificationManager.error('', 'Menu loading  Failed! Please try again.', 3000, null, null, '');
    });
  }
  toggleTab = tab => {
    this.setState({
      activeTab: tab
    })
  }
  changeStatus = (status) => {
    Api.changeStatus(this.state.ItemId, {status: status})
    .then(async response => response.data)
    .then(async response => {
      this.toList()
    })
  }
  printMenu = async () => {
    var doc = await new jsPDF('p', 'mm', [400, 300]);
    let bodyArray = [];
    await this.state.form.item_list.map(async (val,key)=>{
      var object1 = await {
        a: `${key+1}`,
        b: `${val.item_name}`,
        c: `${val.quantity_type}`,
        d: `${val.no_of_item}`
      };      
      await bodyArray.push(Object.values(object1))
    })
    await doc.autoTable({
      theme: 'plain',
      headStyles: {fontSize : 15},
      margin: {top: 5, right: 0, bottom: 0, left: 0},
      head: [[`Order ID : ${this.state.form.order_id}`]]
    })
    doc.autoTable({
      margin: {top: 0, right: 0, bottom: 0, left: 0},
      head: [['#', 'Item Name', 'Quantity', 'No Of Items']],
      body: bodyArray,
    })
    await doc.save(`order-${this.state.form.order_id}.pdf`)
  }
  toList = async () => {
    if(this.state.mode === 'awaiting') {
      await localStorage.setItem('active_order_list_tab','1')
      this.props.history.push(`/vendor/restaurant/orders/list/${this.state.RestaurantId}`)
    } else if(this.state.mode === 'confirmed') {
      await localStorage.setItem('active_order_list_tab','2')
      this.props.history.push(`/vendor/restaurant/orders/list/${this.state.RestaurantId}`)
    } else {
      await localStorage.setItem('active_order_list_tab','3')
      this.props.history.push(`/vendor/restaurant/orders/list/${this.state.RestaurantId}`)
    }
  }
  render() {
    const {
      form,
      activeTab,
      mode
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
                      <i className="iconsminds-add"></i>&nbsp;&nbsp;View Order
                    </CardTitle>
                  </Colxx>
                </Row>
                <OrderForm loading={this.props.loading} formFields={form} mode={mode} changeStatus={this.changeStatus}
                  onVendorRegister={this.onVendorRegister} toggleTab={this.toggleTab} activeTab={activeTab} toList={this.toList} 
                  printMenu={this.printMenu}
                />
              </CardBody>
            </Card>
          </Colxx>
        </Row>
      </React.Fragment>
    );
  }
};

export default OrderView;
