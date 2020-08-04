import React, { Suspense } from 'react';
import { Route, withRouter, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import AppLayout from '../../layout/AdminAppLayout';

const CategoryPage = React.lazy(() => 
  import('./category/index')
);
const ProductAttributePage = React.lazy(() => 
  import('./productAttribute')
);
const ProductPage = React.lazy(() => 
  import('./product')
);
const ProductEdit = React.lazy(() => 
  import('./product/edit')
);
const Dashboard = React.lazy(() =>
  import('./dashboard')
);
const Vendor = React.lazy(() =>
  import('./vendor')
);
const User = React.lazy(() =>
  import('./user')
);

const DeliveryStaff = React.lazy(() =>
  import('./delivery_staff')
);

const App = ({ match }) => {
  return (
    <AppLayout>
      <div className="dashboard-wrapper">
        
        <Suspense fallback={<div className="loading" />}>
          <Switch>
          <Redirect exact from={`${match.url}/`} to={`${match.url}/dashboard`} />
            <Route
              path={`${match.url}/dashboard`}
              render={(props) => <Dashboard {...props} />}
            />
            <Route
              path={`${match.url}/vendor`}
              render={(props) => <Vendor {...props} />}
            />
            <Route
              path={`${match.url}/users`}
              render={(props) => <User {...props} />}
            />
            <Route
              path = {`${match.url}/category`}
              render = {(props) => <CategoryPage {...props}/>} 
            />
            <Route
              path = {`${match.url}/product-attribute`}
              render = {(props) => <ProductAttributePage {...props}/>} 
            />
             <Route
              path = {`${match.url}/product/:edit/edit`}
              component = {ProductEdit}
            />
            <Route
              path = {`${match.url}/product`}
              render = {(props) => <ProductPage {...props}/>} 
            />
            <Route
              path={`${match.url}/delivery_staff`}
              render={(props) => <DeliveryStaff {...props} />}
            />
            <Redirect to="/error" />
          </Switch>
        </Suspense>
      </div>
    </AppLayout>
  );
};

const mapStateToProps = ({ menu }) => {
  const { containerClassnames } = menu;
  return { containerClassnames };
};

export default withRouter(connect(mapStateToProps, {})(App));
