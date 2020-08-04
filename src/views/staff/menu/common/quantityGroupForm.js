import React from 'react';
import {
    Row, Label, FormGroup, Button,
    TabContent, TabPane, Nav, NavItem, NavLink, Col,
    Card, CardImg, CardImgOverlay
} from 'reactstrap';
import classnames from 'classnames';
import { Formik, Form, Field, FieldArray } from 'formik';

import { Colxx } from '../../../../components/common/CustomBootstrap';
import IntlMessages from '../../../../helpers/IntlMessages';
import '../../../../assets/css/custom.css';

export const QuantityGroupForm = ({ formFields, onVendorRegister, loading, mode }) => {
    return (
        <Formik enableReinitialize initialValues={formFields} onSubmit={onVendorRegister} >
            {({ errors, touched, values }) => (
                <Form className="av-tooltip tooltip-label-bottom">
                    <Row>
                        <Colxx xxs="12">
                            <Row className="mt-4">
                                <Col sm="12">
                                    <Row>
                                        <Col sm="4">
                                            <FormGroup className="form-group has-float-label">
                                                <Label>
                                                    <IntlMessages id="Quantity Group Name" />
                                                </Label>
                                                <Field
                                                    className={`form-control ${mode==='view'?'disabled-but-white':''}`}
                                                    disabled={mode==='view'?true:false}
                                                    type="text"
                                                    name="name"
                                                    required
                                                    // validate={(value) => validation.text(value, 'Menu Group Name')}
                                                />
                                                {/* {errors.name && touched.name && (
                                                    <div className="invalid-feedback d-block">
                                                        {errors.name}
                                                    </div>
                                                )} */}
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                
                                    <Row>
                                        <Col sm="2">
                                            <FormGroup className="form-group has-float-label">
                                                <Label>
                                                    <IntlMessages id="Status" />
                                                </Label>
                                                <Field as="select" name="status" disabled={mode==='view'?true:false} className={`form-control ${mode==='view'?'ghost-select disabled-but-white':''}`} required>
                                                    <option value="">Select</option>
                                                    <option value="1">Active</option>
                                                    <option value="0">Inactive</option>
                                                </Field>
                                                {/* {errors.status && touched.status && (
                                                    <div className="invalid-feedback d-block">
                                                        {errors.status}
                                                    </div>
                                                )} */}
                                            </FormGroup>
                                        </Col>
                                        <Col sm="2">
                                            {/* <FormGroup className="form-group has-float-label">
                                                <Label>
                                                    <IntlMessages id="Display Order" />
                                                </Label>
                                                <Field
                                                    className="form-control"
                                                    type="number"
                                                    name="display_order"
                                                    validate={(value) => validation.number(value, 'Display Order')}
                                                />
                                                {errors.display_order && touched.display_order && (
                                                    <div className="invalid-feedback d-block">
                                                        {errors.display_order}
                                                    </div>
                                                )}
                                            </FormGroup> */}
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </Colxx>
                    </Row>

                    {(() => {
                        if(mode!='view') {
                            return (
                                <div className="d-flex justify-content-between align-items-center float-right mt-4">
                                    <Button
                                        type="submit"
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
                                            <IntlMessages id="Save" />
                                        </span>
                                    </Button>
                                </div>
                            )
                        }   
                    })()}
                </Form>
            )}
        </Formik>
    );
};

