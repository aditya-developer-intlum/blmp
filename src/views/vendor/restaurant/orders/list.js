import React from 'react';
import { Row, TabContent, TabPane, Nav, NavItem, NavLink, Col } from 'reactstrap';
import { Colxx } from '../../../../components/common/CustomBootstrap';
import firebase from '../../../../util/firebase';
import classnames from 'classnames';
import '../../../../assets/css/custom.css';
import { Awaiting } from './tables/awaiting';
import { Confirmed } from './tables/confirmed';
import { AllRecord } from './tables/all_record';

class BlankPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: '1',
      restaurantId: this.props.match.params.id,
    }
  }
  componentDidMount() {
    // const messaging = firebase.messaging()
    // messaging.onMessage((payload)=>{
    //   const { title, body } = payload.notification;
    //   console.log(title);
    //   console.log(body);
    // })
    let activeTab = localStorage.getItem('active_order_list_tab')
    activeTab = activeTab ? activeTab : '1';
    if(activeTab) {
      this.setState({
        activeTab: activeTab
      })
    }
    localStorage.removeItem('active_order_list_tab')
  }
  toggleTab = tab => {
    this.setState({
      activeTab: tab
    })
  }
  render() {
    const { activeTab,restaurantId } = this.state
    return (
      <>
        <Row>
          <Colxx xxs="12">                
            <Nav tabs>
              <NavItem>
                <NavLink
                  className={classnames({ active: activeTab === '1' }) + ' no-select'}
                  onClick={() => { this.toggleTab('1'); }}
                >
                  Awaiting Orders
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({ active: activeTab === '2' }) + ' no-select'}
                  onClick={() => { this.toggleTab('2'); }}
                >
                  Confirmed Orders
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({ active: activeTab === '3' }) + ' no-select'}
                  onClick={() => { this.toggleTab('3'); }}
                >
                  Order History
                </NavLink>
              </NavItem>
            </Nav>
            <TabContent activeTab={activeTab}>
              <TabPane tabId="1">
                <Row className="mt-4">
                  <Col sm="12">
                    <Awaiting restaurantId={restaurantId} history={this.props.history} />
                  </Col>
                </Row>
              </TabPane>
              <TabPane tabId="2">
                <Row className="mt-4">
                  <Col sm="12">
                    <Confirmed restaurantId={restaurantId} history={this.props.history} />
                  </Col>
                </Row>
              </TabPane>
              <TabPane tabId="3">
                <Row className="mt-4">
                  <Col sm="12">
                    <AllRecord restaurantId={restaurantId} history={this.props.history} />
                  </Col>
                </Row>
              </TabPane>
            </TabContent>
          </Colxx>            
        </Row>
      </>
    );
  }
};

export default BlankPage;
