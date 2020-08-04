import React, { Suspense } from 'react';
import { Route, withRouter, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const MenuGroup = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './menu_group')
);
const QuantityGroup = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './quantity_group')
);
const ToppingsGroup = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './toppings_group')
);
const ExtraItems = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './extra_items')
);
const MenuItem = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './menu_item')
);

const Vendor = ({ match }) => {
  return (
    <Suspense fallback={<div className="loading" />}>
      <Switch>
        {/*<Redirect exact from={`${match.url}/`} to={`${match.url}/list`} />*/}
        <Route
          path={`${match.url}/menu_group`}
          render={(props) => <MenuGroup {...props} />}
        />
        <Route
          path={`${match.url}/quantity_group`}
          render={(props) => <QuantityGroup {...props} />}
        />
        <Route
          path={`${match.url}/toppings_group`}
          render={(props) => <ToppingsGroup {...props} />}
        />
        <Route
          path={`${match.url}/extra_items`}
          render={(props) => <ExtraItems {...props} />}
        />
        <Route
          path={`${match.url}/menu_item`}
          render={(props) => <MenuItem {...props} />}
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
