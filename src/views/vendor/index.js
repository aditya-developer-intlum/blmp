import React, { Suspense } from 'react';
import { Route, withRouter, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import AppLayout from '../../layout/VendorAppLayout';

const Dashboard = React.lazy(() =>
  import(/* webpackChunkName: "viwes-gogo" */ './dashboard')
);
const RestaurantStaff = React.lazy(() =>
  import(/* webpackChunkName: "viwes-gogo" */ './restaurant_staff')
);
const DeliveryStaff = React.lazy(() =>
  import(/* webpackChunkName: "viwes-gogo" */ './delivery_staff')
);
const Report = React.lazy(() =>
  import(/* webpackChunkName: "viwes-gogo" */ './report')
);
const Review = React.lazy(() =>
  import(/* webpackChunkName: "viwes-gogo" */ './review')
);
const Order = React.lazy(() =>
  import(/* webpackChunkName: "viwes-gogo" */ './order')
);
const Wallet = React.lazy(() =>
  import(/* webpackChunkName: "viwes-gogo" */ './wallet')
);
const Restaurant = React.lazy(() =>
  import(/* webpackChunkName: "viwes-gogo" */ './restaurant')
);
const Restaurants = React.lazy(() =>
  import(/* webpackChunkName: "viwes-gogo" */ './restaurants')
);

const Vendor = ({ match }) => {
  return (
      <div className="dashboard-wrapper">
        <Suspense fallback={<div className="loading" />}>
          <Switch>
            <Redirect exact from={`${match.url}/`} to={`${match.url}/dashboard`} />
            <Route
              path={`${match.url}/dashboard`}
              render={(props) => <AppLayout><Dashboard {...props} /></AppLayout>}
            />
            <Route
              path={`${match.url}/restaurant_staff`}
              render={(props) => <AppLayout><RestaurantStaff {...props} /></AppLayout>}
            />
            <Route
              path={`${match.url}/delivery_staff`}
              render={(props) => <AppLayout><DeliveryStaff {...props} /></AppLayout>}
            />
            <Route
              path={`${match.url}/report`}
              render={(props) => <AppLayout><Report {...props} /></AppLayout>}
            />
            <Route
              path={`${match.url}/review`}
              render={(props) => <AppLayout><Review {...props} /></AppLayout>}
            />
            <Route
              path={`${match.url}/order`}
              render={(props) => <AppLayout><Order {...props} /></AppLayout>}
            />
            <Route
              path={`${match.url}/wallet`}
              render={(props) => <AppLayout><Wallet {...props} /></AppLayout>}
            />
            <Route
              path={`${match.url}/restaurant`}
              render={(props) => <Restaurant {...props} />}
            />
            <Route
              path={`${match.url}/restaurants`}
              render={(props) => <AppLayout><Restaurants {...props} /></AppLayout>}
            />
            <Redirect to="/error" />
          </Switch>
        </Suspense>
      </div>
  );
};

const mapStateToProps = ({ menu }) => {
  const { containerClassnames } = menu;
  return { containerClassnames };
};

export default withRouter(connect(mapStateToProps, {})(Vendor));