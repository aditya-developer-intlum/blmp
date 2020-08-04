import React, { Suspense } from 'react';
import { Route, withRouter, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const Create = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './create')
);
const Update = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './update')
);
const List = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './list')
);

const Customer = ({ match }) => {
  return (
      <Suspense fallback={<div className="loading" />}>
        <Switch>
          <Route
            path={`${match.url}/list/:id`}
            render={(props) => <List {...props} />}
          />
          <Route
            path={`${match.url}/create/:id`}
            render={(props) => <Create {...props} />}
          />
          <Route
            path={`${match.url}/update/:item/:id`}
            render={(props) => <Update {...props} />}
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

export default withRouter(connect(mapStateToProps, {})(Customer));
