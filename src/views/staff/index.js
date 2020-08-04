import React, { Suspense } from 'react';
import { Route, withRouter, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import StaffAppLayout from '../../layout/StaffAppLayout';

const Menu = React.lazy(() =>
  import('./menu')
);
const Dashboard = React.lazy(() =>
  import('./dashboard')
);
const Offers = React.lazy(() =>
  import('./offers')
);
const Orders = React.lazy(() =>
  import('./orders')
);
const Reviews = React.lazy(() =>
  import('./reviews')
);
const Reports = React.lazy(() =>
  import('./reports')
);
const Wallet = React.lazy(() =>
  import('./wallet')
);
const CheckRoute = ({ component: Component, authPermission, redirect, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        (authPermission==="2"||authPermission==="3") ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: redirect,
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};


class Customer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      match: this.props.match,
      permission: JSON.parse(this.props.permissionList)
    }
  }
  render() {
    const {match,permission} = this.state;
    
    return (
      <StaffAppLayout>
        <Suspense fallback={<div className="loading" />}>
          <Switch>
            <Redirect exact from={`${match.url}/`} to={`${match.url}/dashboard`} />
            <Route
              path={`${match.url}/dashboard`}
              render={(props) => <Dashboard {...props} />}
            />
            <CheckRoute
              path={`${match.url}/menu`}
              authPermission={permission[0]['status']}
              redirect={`${match.url}/dashboard`}
              component={Menu}
            />
            <CheckRoute
              path={`${match.url}/offers`}
              authPermission={permission[1]['status']}
              redirect={`${match.url}/dashboard`}
              component={Offers}
            />
            <CheckRoute
              path={`${match.url}/orders`}
              authPermission={permission[2]['status']}
              redirect={`${match.url}/dashboard`}
              component={Orders}
            />
            <CheckRoute
              path={`${match.url}/reports`}
              authPermission={permission[3]['status']}
              redirect={`${match.url}/dashboard`}
              component={Reports}
            />
            <CheckRoute
              path={`${match.url}/reviews`}
              authPermission={permission[5]['status']}
              redirect={`${match.url}/dashboard`}
              component={Reviews}
            />
            <CheckRoute
              path={`${match.url}/wallet`}
              authPermission={permission[6]['status']}
              redirect={`${match.url}/dashboard`}
              component={Wallet}
            />
            <Redirect to="/error" />
          </Switch>
        </Suspense>
      </StaffAppLayout>
    );
  }
};

const mapStateToProps = ({ menu, authUser }) => {
  const { containerClassnames } = menu;
  const { permissions: permissionList } = authUser;
  return { containerClassnames, permissionList };
};

export default withRouter(connect(mapStateToProps, {})(Customer));
