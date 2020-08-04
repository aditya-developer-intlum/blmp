import React, { Suspense } from 'react';
import { Route, withRouter, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import RestaurantSetupLayout from '../../../layout/RestaurantSetupLayout';

const Menu = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './menu')
);
const Dashboard = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './dashboard')
);
const Offers = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './offers')
);
/*const Orders = React.lazy(() =>
  import( webpackChunkName: "viwes-blank-page"  './orders')
);*/
const Reviews = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './reviews')
);
const Reports = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './reports')
);
const Wallet = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './wallet')
);

const Customer = ({ match }) => {
  const restaurant_id = window.location.pathname.split("/").pop();
  return (
    <RestaurantSetupLayout restaurantId={restaurant_id} >
      <Suspense fallback={<div className="loading" />}>
        <Switch>
          {/*<Redirect exact from={`${match.url}/`} to={`${match.url}/list/8`} />*/}
          <Route
            path={`${match.url}/menu`}
            render={(props) => <Menu {...props} />}
          />
         {/* <Route
            path={`${match.url}/orders`}
            render={(props) => <Orders {...props} />}
          />*/}
          <Route
            path={`${match.url}/dashboard/:id`}
            render={(props) => <Dashboard {...props} />}
          />
          <Route
            path={`${match.url}/offers/:id`}
            render={(props) => <Offers {...props} />}
          />
          <Route
            path={`${match.url}/reviews/:id`}
            render={(props) => <Reviews {...props} />}
          />
          <Route
            path={`${match.url}/reports/:id`}
            render={(props) => <Reports {...props} />}
          />
          <Route
            path={`${match.url}/wallet/:id`}
            render={(props) => <Wallet {...props} />}
          />
          <Redirect to="/error" />
        </Switch>
      </Suspense>
    </RestaurantSetupLayout>
  );
};

const mapStateToProps = ({ menu }) => {
  const { containerClassnames } = menu;
  return { containerClassnames };
};

export default withRouter(connect(mapStateToProps, {})(Customer));
