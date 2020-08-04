import React, { Suspense } from 'react';
import { connect } from 'react-redux';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import { IntlProvider } from 'react-intl';
import './helpers/Firebase';
import AppLocale from './lang';
import ColorSwitcher from './components/common/ColorSwitcher';
import { NotificationContainer } from './components/common/react-notifications';
import { isMultiColorActive } from './constants/defaultValues';
import { getDirection } from './helpers/Utils';
import { NotificationManager } from './components/common/react-notifications';
import firebase from './util/firebase';

const ViewMain = React.lazy(() =>
  import(/* webpackChunkName: "views" */ './views')
);
const ViewError = React.lazy(() =>
  import(/* webpackChunkName: "views-error" */ './views/error')
);
const ViewAuth = React.lazy(() =>
  import(/* webpackChunkName: "views-error" */ './views/auth')
);
const ViewAdmin = React.lazy(() =>
  import(/* webpackChunkName: "views-error" */ './views/admin')
);
const ViewVendor = React.lazy(() =>
  import(/* webpackChunkName: "views-error" */ './views/vendor')
);
const ViewStaff = React.lazy(() =>
  import(/* webpackChunkName: "views-error" */ './views/staff')
);

const AdminRoute = ({ component: Component, authUser, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        authUser && localStorage.getItem('user_type')==='admin' ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/auth',
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};

const VendorRoute = ({ component: Component, authUser, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        authUser && localStorage.getItem('user_type')==='vendor' ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/auth',
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};

const StaffRoute = ({ component: Component, authUser, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        authUser && localStorage.getItem('user_type')==='staff' ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/auth',
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};

class App extends React.Component {
  constructor(props) {
    super(props);
    const direction = getDirection();
    if (direction.isRtl) {
      document.body.classList.add('rtl');
      document.body.classList.remove('ltr');
    } else {
      document.body.classList.add('ltr');
      document.body.classList.remove('rtl');
    }
  }
  componentDidMount() {
    // const messaging = firebase.messaging()
    // messaging.requestPermission().then(()=>{
    //   console.log('have permission')
    //   return messaging.getToken()
    // }).then(token=>{
    //   console.log(token)
    // }).catch((err)=>{
    //   console.log(err);
    // })
    // messaging.onMessage((payload)=>{
    //   const { title, body } = payload.notification;
    //   NotificationManager.success(body, title, 3000, null, null, ''); 
    // })
  }
  render() {
    const { locale, loginUser } = this.props;
    const currentAppLocale = AppLocale[locale];

    return (
      <div className="h-100">
        <IntlProvider
          locale={currentAppLocale.locale}
          messages={currentAppLocale.messages}
          onError={(err) => {if (err.code === "MISSING_TRANSLATION") {return;}throw err;}}
        >
          <>
            <NotificationContainer />
            {isMultiColorActive && <ColorSwitcher />}
            <Suspense fallback={<div className="loading" />}>
              <Router>
                <Switch>
                  <AdminRoute
                    path="/admin"
                    authUser={loginUser}
                    component={ViewAdmin}
                  />
                  <VendorRoute
                    path="/vendor"
                    authUser={loginUser}
                    component={ViewVendor}
                  />
                  <StaffRoute
                    path="/staff"
                    authUser={loginUser}
                    component={ViewStaff}
                  />
                  <Route
                    path="/auth"
                    render={(props) => <ViewAuth {...props} />}
                  />
                  <Route
                    path="/error"
                    exact
                    render={(props) => <ViewError {...props} />}
                  />
                  <Route
                    path="/"
                    exact
                    render={(props) => <ViewMain {...props} />}
                  />
                  <Redirect to="/error" />
                </Switch>
              </Router>
            </Suspense>
          </>
        </IntlProvider>
      </div>
    );
  }
}

const mapStateToProps = ({ authUser, settings }) => {
  const { user: loginUser } = authUser;
  const { locale } = settings;
  return { loginUser, locale };
};
const mapActionsToProps = {};

export default connect(mapStateToProps, mapActionsToProps)(App);
