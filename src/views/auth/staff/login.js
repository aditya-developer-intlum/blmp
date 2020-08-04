import React, { useState, useEffect } from 'react';
import { Row, Card, CardTitle, Label, FormGroup, Button } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

import { Formik, Form, Field } from 'formik';
import { NotificationManager } from '../../../components/common/react-notifications';

import { loginUser } from '../../../redux/actions';
import { Colxx } from '../../../components/common/CustomBootstrap';
import IntlMessages from '../../../helpers/IntlMessages';

import {vendorList, restaurantList} from '../../../services/staff/auth';

const validatePassword = (value) => {
  let error;
  if (!value) {
    error = 'Please enter your password';
  } else if (value.length < 4) {
    error = 'Value must be longer than 3 characters';
  }
  return error;
};

const validateEmail = (value) => {
  let error;
  if (!value) {
    error = 'Please enter your email address';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
    error = 'Invalid email address';
  }
  return error;
};

const validateSelect = (value) => {
  let error;
  if (!value) {
    error = 'Please select a option';
  }
  return error;
};

const Login = ({ history, loading, error, loginUserAction }) => {
  const [email] = useState('staff@gogo.com');
  const [password] = useState('gogo123');
  const [vendor] = '';
  const [restaurant] = '';
  const [vendors, setVendors] = useState([]);
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    if (error) {
      NotificationManager.warning(error, 'Login Error', 3000, null, null, '');
    }
  }, [error]);

  useEffect(() => {
    vendorList()
    .then(async response => {
      if(response.status==="success") {
        setVendors(response.data)
      }
    })
  }, []);

  const fetchRestaurant = (vendor) => {
    restaurantList(vendor).then(async response => {
      if(response.length>0) {
        setRestaurants(response)
      }
    })
  }

  const onUserLogin = (values) => {
    //console.log(values)
    if (!loading) {
      if (values.vendor === '') {
        NotificationManager.warning(error, 'Please select a vendor first', 3000, null, null, '');
      } else if (values.restaurant === '') {
        NotificationManager.warning(error, 'Please select a restaurant first', 3000, null, null, '');
      } else if (values.email !== '' && values.password !== '') {
        loginUserAction(values, history, 'staff');
      }
    }
  };

  const initialValues = { email, password, vendor, restaurant };

  return (
    <Row className="h-100">
      <Colxx xxs="12" md="10" className="mx-auto my-auto">
        <Card className="auth-card">
          <div className="position-relative image-side ">
            <p className="text-white h2">MAGIC IS IN THE DETAILS</p>
            <p className="white mb-0">
              Please use your credentials to login.
              <br />
              If you are not a member, please{' '}
              <NavLink to="/user/register" className="white">
                register
              </NavLink>
              .
            </p>
          </div>
          <div className="form-side">
            <Row>
              <Colxx xxs="8" md="8">
                <NavLink to="/" className="white">
                  <span className="logo-single" />
                </NavLink>
                <CardTitle className="mb-4">
                  <IntlMessages id="user.login-title" />
                </CardTitle>
              </Colxx>
              <Colxx xxs="4" md="4"></Colxx>
            </Row>
            
            
            <Formik initialValues={initialValues} onSubmit={onUserLogin}>
              {({ errors, touched, values }) => (
                <Form className="av-tooltip tooltip-label-bottom">
                  <FormGroup className="form-group has-float-label">
                    <Label>
                      <IntlMessages id="Associate Vendor" />
                    </Label>
                    <Field
                      className="form-control"
                      as = "select"
                      name="vendor"
                      onChange={e=>{values.vendor=e.target.value;fetchRestaurant(e.target.value)}}
                    >
                      <option value="">Select</option>
                      {vendors && vendors.map((pVal,pKey) => {
                          return (
                              <option key={pKey} value={pVal.id}>{pVal.name}</option>
                          )
                      })}
                    </Field>
                  </FormGroup>
                  <FormGroup className="form-group has-float-label">
                    <Label>
                      <IntlMessages id="Associate Restaurant" />
                    </Label>
                    <Field
                      className="form-control"
                      as = "select"
                      name="restaurant"
                    >
                      <option value="">Select</option>
                      {restaurants && restaurants.map((pVal,pKey) => {
                          return (
                              <option key={pKey} value={pVal.id}>{pVal.name}</option>
                          )
                      })}
                    </Field>
                  </FormGroup>
                  <FormGroup className="form-group has-float-label">
                    <Label>
                      <IntlMessages id="user.email" />
                    </Label>
                    <Field
                      className="form-control"
                      name="email"
                      validate={validateEmail}
                    />
                    {errors.email && touched.email && (
                      <div className="invalid-feedback d-block">
                        {errors.email}
                      </div>
                    )}
                  </FormGroup>
                  <FormGroup className="form-group has-float-label">
                    <Label>
                      <IntlMessages id="user.password" />
                    </Label>
                    <Field
                      className="form-control"
                      type="password"
                      name="password"
                      validate={validatePassword}
                    />
                    {errors.password && touched.password && (
                      <div className="invalid-feedback d-block">
                        {errors.password}
                      </div>
                    )}
                  </FormGroup>
                  <div className="d-flex justify-content-between align-items-center">
                    <NavLink to="/user/forgot-password">
                      <IntlMessages id="user.forgot-password-question" />
                    </NavLink>
                    <Button
                      color="primary"
                      className={`btn-shadow btn-multiple-state ${
                        loading ? 'show-spinner' : ''
                        }`}
                      size="lg"
                    >
                      <span className="spinner d-inline-block">
                        <span className="bounce1" />
                        <span className="bounce2" />
                        <span className="bounce3" />
                      </span>
                      <span className="label">
                        <IntlMessages id="user.login-button" />
                      </span>
                    </Button>
                  </div>
                </Form>
              )}
            </Formik>


          </div>
        </Card>
      </Colxx>
    </Row >
  );
};
const mapStateToProps = ({ authUser }) => {
  const { loading, error } = authUser;
  return { loading, error };
};

export default connect(mapStateToProps, {
  loginUserAction: loginUser,
})(Login);
