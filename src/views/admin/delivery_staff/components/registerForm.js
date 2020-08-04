import React from 'react';
import { 
  Row, Label, FormGroup, Button,
  TabContent, TabPane, Nav, NavItem, NavLink, Col,
  Card, CardImg, CardImgOverlay
} from 'reactstrap';
import classnames from 'classnames';
import { Formik, Form, Field } from 'formik';

import { Colxx } from '../../../../components/common/CustomBootstrap';
import IntlMessages from '../../../../helpers/IntlMessages';
import '../../../../assets/css/custom.css';

export const RegisterForm = ({ activeTab, formFields, onVendorRegister, toggleTab, loading, mode, showUpload, toggleUpload, handleChange, formErrors }) => {
    const hiddenFileInput = React.useRef(null);
    const handleClick = event => {
        hiddenFileInput.current.click();
    };
    return (
        <Formik enableReinitialize initialValues={formFields} onSubmit={onVendorRegister} >
            {({ errors, touched, values }) => (
            <Form className="av-tooltip tooltip-label-bottom">
                <Row>
                    <Colxx xxs="4">
                        <Card onMouseEnter={() => toggleUpload(true)} onMouseLeave={() => toggleUpload(false)}>
                            <CardImg
                                src={`${values.image ? values.image : '/assets/img/empty-image.png'}`}
                                alt="Card image cap"
                                className="image-resize-270px"
                            />
                            {(() => {
                                    // if (showUpload) {
                                        return (
                                            <CardImgOverlay>
                                                <Button onClick={handleClick} className="center-div" color="primary">
                                                    <span className="label">
                                                        <IntlMessages id="Upload Image" />
                                                    </span>
                                                </Button>
                                                <input
                                                    type="file"
                                                    ref={hiddenFileInput}
                                                    onChange={handleChange}
                                                    style={{display: 'none'}}
                                                />
                                            </CardImgOverlay>
                                        )
                                    // }
                            })()}
                        </Card>
                    </Colxx>
                    <Colxx xxs="8">
                    <div>
                        <Nav tabs>
                        <NavItem>
                            <NavLink
                            className={classnames({ active: activeTab === '1' }) +' no-select'}
                            //onClick={() => { toggleTab('1'); }}
                            >
                            Basic Info
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink
                            className={classnames({ active: activeTab === '2' }) +' no-select'}
                            //onClick={() => { toggleTab('2'); }}
                            >
                            Contact Info
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink
                            className={classnames({ active: activeTab === '3' }) +' no-select'}
                            //onClick={() => { toggleTab('3'); }}
                            >
                            Banking Info
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
                                    //validate={validateName}
                                />
                                {formErrors.name && (
                                    <div className="invalid-feedback d-block">
                                        {formErrors.name}
                                    </div>
                                )}
                                </FormGroup>

                                <FormGroup className="form-group has-float-label">
                                <Label>
                                    <IntlMessages id="user.email" />
                                </Label>
                                <Field
                                    className="form-control"
                                    name="email"
                                    //validate={validateEmail}
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
                                                    //validate={validatePassword}
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
                                    <IntlMessages id="Date Of Birth" />
                                </Label>
                                <Field
                                    className="form-control cap-placeholder"
                                    type="date"
                                    name="dob"
                                    //validate={validateDob}
                                />
                                {formErrors.dob && (
                                    <div className="invalid-feedback d-block">
                                    {formErrors.dob}
                                    </div>
                                )}
                                </FormGroup>
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
                            <Col sm="8">
                                <FormGroup className="form-group has-float-label">
                                <Label>
                                    <IntlMessages id="Phone No" />
                                </Label>
                                <Field
                                    className="form-control"
                                    type="text"
                                    name="phone"
                                    //validate={validatePhone}
                                />
                                {formErrors.phone && (
                                    <div className="invalid-feedback d-block">
                                    {formErrors.phone}
                                    </div>
                                )}
                                </FormGroup>

                                <FormGroup className="form-group has-float-label">
                                <Label>
                                    <IntlMessages id="Address Line 1" />
                                </Label>
                                <Field
                                    className="form-control"
                                    type="text"
                                    name="address1"
                                    //validate={validateAddress}
                                />
                                {formErrors.address1 && (
                                    <div className="invalid-feedback d-block">
                                    {formErrors.address1}
                                    </div>
                                )}
                                </FormGroup>

                                <FormGroup className="form-group has-float-label">
                                <Label>
                                    <IntlMessages id="Address Line 2" />
                                </Label>
                                <Field
                                    className="form-control"
                                    type="text"
                                    name="address2"
                                    //validate={validateAddress}
                                />
                                {formErrors.address2 && (
                                    <div className="invalid-feedback d-block">
                                    {formErrors.address2}
                                    </div>
                                )}
                                </FormGroup>
                                <Row>
                                <Col sm="6">
                                    <FormGroup className="form-group has-float-label">
                                    <Label>
                                        <IntlMessages id="City" />
                                    </Label>
                                    <Field
                                        className="form-control"
                                        type="text"
                                        name="city"
                                        //validate={validateCity}
                                    />
                                    {formErrors.city && (
                                        <div className="invalid-feedback d-block">
                                        {formErrors.city}
                                        </div>
                                    )}
                                    </FormGroup>
                                </Col>
                                <Col sm="6">
                                    <FormGroup className="form-group has-float-label">
                                    <Label>
                                        <IntlMessages id="Post Code" />
                                    </Label>
                                    <Field
                                        className="form-control"
                                        type="text"
                                        name="postcode"
                                        //validate={validatePostcode}
                                    />
                                    {formErrors.postcode && (
                                        <div className="invalid-feedback d-block">
                                        {formErrors.postcode}
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
                                    className="btn-shadow btn-multiple-state"
                                    size="lg"
                                    onClick={() => { toggleTab('1','2',values); }}
                                >
                                    <span className="label">
                                        <IntlMessages id="Prev" />
                                    </span>
                                </Button>
                                <Button
                                    color="primary"
                                    className="btn-shadow btn-multiple-state ml-2"
                                    size="lg"
                                    onClick={() => { toggleTab('3','2',values); }}
                                >
                                    <span className="label">
                                        <IntlMessages id="Next" />
                                    </span>
                                </Button>
                            </div>

                        </TabPane>

                        <TabPane tabId="3">
                            <Row className="mt-4">
                            <Col sm="8">
                                <FormGroup className="form-group has-float-label">
                                <Label>
                                    <IntlMessages id="Account Holder Name" />
                                </Label>
                                <Field
                                    className="form-control"
                                    type="text"
                                    name="acc_holder_name"
                                    //validate={validateName}
                                />
                                {formErrors.acc_holder_name && (
                                    <div className="invalid-feedback d-block">
                                    {formErrors.acc_holder_name}
                                    </div>
                                )}
                                </FormGroup>
                                <FormGroup className="form-group has-float-label">
                                <Label>
                                    <IntlMessages id="Bank Name" />
                                </Label>
                                <Field
                                    className="form-control"
                                    type="text"
                                    name="bank_name"
                                    //validate={validateName}
                                />
                                {formErrors.bank_name && (
                                    <div className="invalid-feedback d-block">
                                    {formErrors.bank_name}
                                    </div>
                                )}
                                </FormGroup>
                                <Row>
                                <Col sm="6">
                                    <FormGroup className="form-group has-float-label">
                                    <Label>
                                        <IntlMessages id="IFSC Code" />
                                    </Label>
                                    <Field
                                        className="form-control"
                                        type="text"
                                        name="acc_ifsc_no"
                                        //validate={validateIfsc}
                                    />
                                    {formErrors.acc_ifsc_no && (
                                        <div className="invalid-feedback d-block">
                                        {formErrors.acc_ifsc_no}
                                        </div>
                                    )}
                                    </FormGroup>
                                </Col>
                                <Col sm="6">
                                    <FormGroup className="form-group has-float-label">
                                    <Label>
                                        <IntlMessages id="Account No" />
                                    </Label>
                                    <Field
                                        className="form-control"
                                        type="text"
                                        name="acc_no"
                                        //validate={validateAccno}
                                    />
                                    {formErrors.acc_no && (
                                        <div className="invalid-feedback d-block">
                                        {formErrors.acc_no}
                                        </div>
                                    )}
                                    </FormGroup>
                                </Col>
                                </Row>
                                <FormGroup className="form-group has-float-label">
                                <Label>
                                    <IntlMessages id="Bank Address" />
                                </Label>
                                <Field
                                    className="form-control"
                                    type="text"
                                    name="bank_address"
                                    //validate={validateAddress}
                                />
                                {formErrors.bank_address && (
                                    <div className="invalid-feedback d-block">
                                    {formErrors.bank_address}
                                    </div>
                                )}
                                </FormGroup>
                            </Col>
                            </Row>
                            <div className="d-flex justify-content-between align-items-center float-right mt-4">
                                <Button
                                    color="primary"
                                    className="btn-shadow btn-multiple-state"
                                    size="lg"
                                    onClick={() => { toggleTab('2','3',values); }}
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

