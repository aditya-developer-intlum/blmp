import React from 'react';
import { 
  Row, Label, FormGroup, Button,
  TabContent, TabPane, Nav, NavItem, NavLink, Col,
  Card, CardImg, CardImgOverlay
} from 'reactstrap';
import classnames from 'classnames';
import { Formik, Form, Field, FieldArray } from 'formik';

import { Colxx } from '../../../components/common/CustomBootstrap';
import IntlMessages from '../../../helpers/IntlMessages';
import { validatePassword,validateEmail,validateName,validatePhone,validateDob,validateAddress,validateCity,validatePostcode,validateIfsc,validateAccno } from '../../../containers/vendor/auth/fieldValidations';
import '../../../assets/css/custom.css';

export const VendorForm = ({ activeTab, formFields, onRegister, toggleTab, loading, mode, formErrors, restaurantList }) => {
    const hiddenFileInput = React.useRef(null);
    const handleClick = event => {
        hiddenFileInput.current.click();
    };
    return (
        <Formik enableReinitialize initialValues={formFields} onSubmit={onRegister} >
            {({ errors, touched, values }) => (
            <Form className="av-tooltip tooltip-label-bottom">
                <Row>
                    <Colxx xxs="8">
                    <div>
                        <Nav tabs>
                        <NavItem>
                            <NavLink
                            className={classnames({ active: activeTab === '1' }) +' no-select'}
                            >
                            Basic Info
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink
                            className={classnames({ active: activeTab === '2' }) +' no-select'}
                            >
                            Permission Info
                            </NavLink>
                        </NavItem>
                        </Nav>
                        <TabContent activeTab={activeTab}>
                        <TabPane tabId="1">
                            <Row className="mt-4">
                                <Col sm="8">
                                    <FormGroup className="form-group has-float-label">
                                        <Label>
                                            <IntlMessages id="user.fullname" />
                                        </Label>
                                        <Field
                                            className="form-control"
                                            type="text"
                                            name="name"
                                        />
                                        {formErrors.name && (
                                            <div className="invalid-feedback d-block">
                                                {formErrors.name}
                                            </div>
                                        )}
                                    </FormGroup>

                                    <FormGroup className="form-group has-float-label">
                                        <Label>
                                            <IntlMessages id="Email" />
                                        </Label>
                                        <Field
                                            className="form-control"
                                            type="text"
                                            name="email"
                                        />
                                        {formErrors.email && (
                                            <div className="invalid-feedback d-block">
                                            {formErrors.email}
                                            </div>
                                        )}
                                    </FormGroup>

                                    {(() => {
                                        if (mode==='create') {
                                            return (
                                                <FormGroup className="form-group has-float-label">
                                                    <Label>
                                                        <IntlMessages id="user.password" />
                                                    </Label>
                                                    <Field
                                                        className="form-control"
                                                        type="password"
                                                        name="password"
                                                    />
                                                    {formErrors.password && (
                                                        <div className="invalid-feedback d-block">
                                                        {formErrors.password}
                                                        </div>
                                                    )}
                                                </FormGroup>
                                            )
                                        }
                                    })()}

                                    <FormGroup className="form-group has-float-label">
                                        <Label>
                                            <IntlMessages id="Phone No" />
                                        </Label>
                                        <Field
                                            className="form-control"
                                            type="text"
                                            name="phone_number"
                                        />
                                        {formErrors.phone_number && (
                                            <div className="invalid-feedback d-block">
                                            {formErrors.phone_number}
                                            </div>
                                        )}
                                    </FormGroup>

                                    <FormGroup className="form-group has-float-label">
                                        <Label>
                                            <IntlMessages id="Associate Restaurant" />
                                        </Label>
                                        <Field as="select" name="associate_restaurant" className="form-control" multiple>
                                            {restaurantList && restaurantList.map((pVal,pKey) => {
                                                return (
                                                    <option key={pKey} value={pVal.id}>{pVal.name}</option>
                                                )
                                            })}
                                        </Field>
                                        {formErrors.associate_restaurant && (
                                            <div className="invalid-feedback d-block">
                                                {formErrors.associate_restaurant}
                                            </div>
                                        )}
                                    </FormGroup>

                                    <Row>
                                        <Col sm="4">
                                            <FormGroup className="form-group has-float-label">
                                                <Label>
                                                    <IntlMessages id="Status" />
                                                </Label>
                                                <Field as="select" name="status" className="form-control">
                                                    <option value="">Select</option>
                                                    <option value="1">Active</option>
                                                    <option value="2">Inactive</option>
                                                </Field>
                                                {formErrors.status && (
                                                    <div className="invalid-feedback d-block">
                                                        {formErrors.status}
                                                    </div>
                                                )}
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                            
                            <div className="d-flex justify-content-between align-items-center float-right mt-4">
                                <Button
                                    color="primary"
                                    className="btn-shadow btn-multiple-state ml-2"
                                    size="lg"
                                    onClick={() => { toggleTab('2','1',values); }}
                                >
                                    <span className="label">
                                        <IntlMessages id="Next" />
                                    </span>
                                </Button>
                            </div>
                        </TabPane>

                        <TabPane tabId="2">
                            <Row className="mt-4">
                                <Col sm="12" className="mb-2"><strong>Access Permission</strong></Col>
                                <Col sm="4"></Col>
                                <Col sm="4"><Label>Permission Type</Label></Col>
                                <Col sm="4"></Col>
                                <Col sm="12" className="mb-2">
                                    <FieldArray
                                        name="permissions"
                                        render={arrayHelpers => (
                                            <>
                                            {formFields.permissions.map((pval, index) => (
                                                <Row className="mt-1" key={`row_${index}`}>
                                                    <Col sm="4" className="mb-1" key={`label_col_${index}`}>
                                                        <Label key={`label_${index}`} className="float-right">{pval.name}</Label>
                                                    </Col>
                                                    <Col sm="4" className="mb-1"  key={`status_col_${index}`}>
                                                        <Field as="select" className="form-control" name={`permissions[${index}].status`}>
                                                            <option value="">Select</option>
                                                            <option value="1">None</option>
                                                            <option value="2">Read</option>
                                                            <option value="3">Write</option>
                                                        </Field>
                                                        {(() => {
                                                            if(formErrors.permissions[index].error) {
                                                                return (
                                                                    <div className="invalid-feedback d-block">
                                                                        {formErrors.permissions[index].error}
                                                                    </div>
                                                                )
                                                            }   
                                                        })()}
                                                    </Col>
                                                    <Col sm="4" className="mb-1"  key={`end_col_${index}`}></Col>
                                                </Row>
                                            ))}
                                        </>
                                    )}/>
                                </Col>
                            </Row>
                            <Row className="mt-2">
                                <Col sm="12" className="mb-2"><strong>Notifications Permission</strong></Col>
                                <Col sm="4"></Col>
                                <Col sm="4"><Label>Permission Type</Label></Col>
                                <Col sm="4"></Col>
                                <Col sm="12" className="mb-2">
                                    <FieldArray
                                        name="notifications"
                                        render={arrayHelpers => (
                                            <>
                                            {formFields.notifications.map((pval, index) => (
                                                <Row className="mt-1" key={`row_${index}`}>
                                                    <Col sm="4" className="mb-1" key={`label_col_${index}`}>
                                                        <Label key={`label_${index}`} className="float-right">{pval.name}</Label>
                                                    </Col>
                                                    <Col sm="4" className="mb-1"  key={`status_col_${index}`}>
                                                        <Field as="select" className="form-control" name={`notifications[${index}].status`}>
                                                            <option value="">Select</option>
                                                            <option value="1">Yes</option>
                                                            <option value="2">No</option>
                                                        </Field>
                                                        {(() => {
                                                            if(formErrors.notifications[index].error) {
                                                                return (
                                                                    <div className="invalid-feedback d-block">
                                                                        {formErrors.notifications[index].error}
                                                                    </div>
                                                                )
                                                            }   
                                                        })()}
                                                    </Col>
                                                    <Col sm="4" className="mb-1"  key={`end_col_${index}`}></Col>
                                                </Row>
                                            ))}
                                        </>
                                    )}/>
                                </Col>
                            </Row>
                            <div className="d-flex justify-content-between align-items-center float-right mt-4">
                                <Button
                                    color="primary"
                                    className="btn-shadow btn-multiple-state"
                                    size="lg"
                                    onClick={() => { toggleTab('1','2',values); }}
                                >
                                    <span className="label">
                                        <IntlMessages id="Prev" />
                                    </span>
                                </Button>
                                <Button
                                    type="submit"
                                    color="primary"
                                    className={`ml-2 btn-shadow btn-multiple-state ${
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
                                        <IntlMessages id="Save" />
                                    </span>
                                </Button>
                            </div>
                        </TabPane>
                        </TabContent>
                    </div>
                    </Colxx>
                </Row>
            </Form>
            )}
        </Formik>
    );
};

