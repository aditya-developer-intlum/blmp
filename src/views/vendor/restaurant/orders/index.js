import React, { Suspense } from 'react';
import { Route, withRouter, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const List = React.lazy(() =>
  import('./list')
);
const View = React.lazy(() =>
  import('./view')
);

const Vendor = ({ match }) => {
  return (
    <Suspense fallback={<div className="loading" />}>
      <Switch>
        {/*<Redirect exact from={`${match.url}/`} to={`${match.url}/list`} />*/}
        <Route
          path={`${match.url}/list/:id`}
          render={(props) => <List {...props} />}
        />
        <Route
          path={`${match.url}/view/:item/:id`}
          render={(props) => <View {...props} />}
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

export default withRouter(connect(mapStateToProps, {})(Vendor));
