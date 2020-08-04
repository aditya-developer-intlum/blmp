import React from 'react';
import { Row, Card, CardBody, CardTitle, Table } from 'reactstrap';
import { Colxx } from '../../../components/common/CustomBootstrap';
import ProductCategoriesDoughnut from '../../../containers/admin/dashboard/ProductCategoriesDoughnut';
import ProfileStatuses from '../../../containers/admin/dashboard/ProfileStatuses';
import SmallLineCharts from '../../../containers/admin/dashboard/SmallLineCharts';
import SortableStaticticsRow from '../../../containers/admin/dashboard/SortableStaticticsRow';

class BlankPage extends React.Component {
  // constructor(props) {
  //   super(props);
  // }
  render() {
    const messages  = ['Total Order','Total Merchant','Total User','Withdraw Request'];
    return (
      <React.Fragment>
        <SortableStaticticsRow messages={messages} />
        <Row>
          <Colxx xl="4" lg="6" md="12" className="mb-4">
          <Card className="mb-4">
            <CardBody>
              <CardTitle>
                Top Restaurant
              </CardTitle>
              <Table>
                <tbody>
                  <tr>
                    <th>Square Fox <span style={{color:'green'}}>8 Order(s)</span></th>
                  </tr>
                    <tr>
                    <th>Salute <span style={{color:'green'}}>7 Order(s)</span></th>
                  </tr>
                    <tr>
                    <th>The Aroma Angel <span style={{color:'green'}}>4 Order(s)</span></th>
                  </tr>
                    <tr>
                    <th>Prime 16 <span style={{color:'green'}}>3 Order(s)</span></th>
                  </tr>
                    <tr>
                    <th>Jines Restaurant <span style={{color:'green'}}>2 Order(s)</span></th>
                  </tr>
                    <tr>
                    <th>Blaze <span style={{color:'green'}}>1 Order(s)</span></th>
                  </tr>
                    {/*<tr>
                    <th>The winter Valley <span style={{color:'green'}}>1 Order(s)</span></th>
                  </tr>*/}
                {/*  <tr>
                    <th>Ambience <span style={{color:'green'}}>1 Order(s)</span></th>
                  </tr>
                  <tr>
                    <th>Lakeside <span style={{color:'green'}}>1 Order(s)</span></th>
                  </tr>*/}
                </tbody>
              </Table>
            </CardBody>
          </Card>
           {/* <ProductCategoriesDoughnut />*/}
          </Colxx>
          <Colxx xl="4" lg="6" md="12" className="mb-4">
           <Card className="mb-4">
            <CardBody>
              <CardTitle>
                Top Vendor
              </CardTitle>
              <Table>
                <tbody>
                  <tr>
                    <th>Flavoroso</th>
                  </tr>
                    <tr>
                    <th>Green Curry</th>
                  </tr>
                    <tr>
                    <th>Sweet Escape</th>
                  </tr>
                    <tr>
                     <th>Bangalore Spices</th>
                  </tr>
                    <tr>
                     <th>Pancake World</th>
                  </tr>
                    <tr>
                     <th>Masala</th>
                  </tr>
                   {/* <tr>
                     <th>Grassfed Grill</th>
                  </tr>*/}
                 {/* <tr>
                     <th>Paterro’s Kitchen</th>
                  </tr>
                  <tr>
                    <th>Whispering Bamboo</th>
                  </tr>*/}
                </tbody>
              </Table>
            </CardBody>
          </Card>
          </Colxx>
          <Colxx xl="4" lg="12" md="12">
            <SmallLineCharts itemClass="dashboard-small-chart-analytics" />
          </Colxx>
        </Row>
        <Row>
        <Colxx xl="12" lg="12" md="12" className="mb-4">
           <Card className="mb-12">
            <CardBody>
              <CardTitle>
                Latest Orders
              </CardTitle>
              <Table>
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Name</th>
                  <th>Restaurant</th>
                  <th>Payment Method</th>
                  <th>Payment Status</th>
                  <th>Order Status</th>
                  <th>Amount</th>
                </tr>
              </thead>
                <tbody>
                  <tr>
                     <td>BLMP1595008236</td>
                     <td>Janson Minaj</td>
                     <td>Salute</td>
                     <td>Wallet</td>
                     <td>Paid</td>
                     <td>Pending</td>
                     <td>₹ 200</td>
                  </tr>
                  <tr>
                     <td>BLMP1594996911</td>
                    <td>Janson Minaj</td>
                     <td>Prime 16</td>
                     <td>wallet</td>
                     <td>Paid</td>
                     <td>Cancelled</td>
                     <td>₹ 300</td>
                  </tr>
                  <tr>
                     <td>BLMP1594996912</td>
                     <td>Janson Minaj</td>
                     <td>Prime 16</td>
                     <td>wallet</td>
                     <td>Paid</td>
                     <td>Pending</td>
                     <td>₹ 250</td>
                  </tr>
                  <tr>
                     <td>BLMP1594996913</td>
                     <td>Janson Minaj</td>
                     <td>Prime 16</td>
                     <td>wallet</td>
                     <td>Paid</td>
                     <td>In Process</td>
                     <td>₹ 500</td>
                  </tr>
                  <tr>
                     <td>BLMP1594996914</td>
                     <td>Janson Minaj</td>
                     <td>Blaze</td>
                     <td>wallet</td>
                     <td>Paid</td>
                     <td>Pending</td>
                     <td>₹ 400</td>
                  </tr>
                  <tr>
                     <td>BLMP1594996915</td>
                     <td>Janson Minaj</td>
                     <td>Blaze</td>
                     <td>wallet</td>
                     <td>Paid</td>
                     <td>In Process</td>
                     <td>₹ 300</td>
                  </tr>

                </tbody>
              </Table>
            </CardBody>
          </Card>
          </Colxx>
        </Row>
      </React.Fragment>
    );
  }
};

export default BlankPage;
