import React, { Suspense } from 'react';
import { Route, withRouter, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';


const Admin = React.lazy(() =>
  import(/* webpackChunkName: "viwes-gogo" */ './admin')
);
const Vendor = React.lazy(() =>
  import(/* webpackChunkName: "viwes-second-menu" */ './vendor')
);
const Staff = React.lazy(() =>
  import(/* webpackChunkName: "viwes-second-menu" */ './staff')
);


const Auth = ({ match }) => {
  return (
    <Suspense fallback={<div className="loading" />}>
      <Switch>
        <Redirect exact from={`${match.url}/`} to={`${match.url}/admin`} />
        <Route
          path={`${match.url}/admin`}
          render={(props) => <Admin {...props} />}
        />
        <Route
          path={`${match.url}/vendor`}
          render={(props) => <Vendor {...props} />}
        />
        <Route
          path={`${match.url}/staff`}
          render={(props) => <Staff {...props} />}
        />
        <Redirect to="/error" />
      </Switch>
    </Suspense>
  );
};

const mapStateToProps = ({ menu }) => {
  const { containerClassnames } = menu;
  return { containerClassnames };
};

export default withRouter(connect(mapStateToProps, {})(Auth));