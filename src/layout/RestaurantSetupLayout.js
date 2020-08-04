import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Sidebar from '../containers/navs/RestaurantSidebar';
import TopNav from '../containers/navs/Topnav';
import Footer from '../containers/navs/Footer';

const RestaurantSetupLayout = ({ containerClassnames, children, history, restaurantId }) => {
  return (
    <div id="app-container" className={containerClassnames}>
      <TopNav history={history} />
      <Sidebar restaurantId={restaurantId} />
      <main>
        <div className="container-fluid">{children}</div>
      </main>
      <Footer />
    </div>
  );
};
const mapStateToProps = ({ menu }) => {
  const { containerClassnames } = menu;
  return { containerClassnames };
};
const mapActionToProps = {};

export default withRouter(
  connect(mapStateToProps, mapActionToProps)(RestaurantSetupLayout)
);
