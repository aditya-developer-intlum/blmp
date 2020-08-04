import React from 'react';
import {
    Row, Label, FormGroup, Button,
    TabContent, TabPane, Nav, NavItem, NavLink, Col,
    Card, CardImg, CardImgOverlay
} from 'reactstrap';
import classnames from 'classnames';
import { Formik, Form, Field, FieldArray } from 'formik';

import { Colxx } from '../../../../../components/common/CustomBootstrap';
import IntlMessages from '../../../../../helpers/IntlMessages';
import '../../../../../assets/css/custom.css';

export const OrderForm = ({ formFields, onVendorRegister, loading, mode, toggleTab, activeTab, changeStatus, toList, printMenu }) => {
    return (
        <Formik enableReinitialize initialValues={formFields} onSubmit={onVendorRegister} >
            {({ errors, touched, values }) => (
                <Form className="av-tooltip tooltip-label-bottom">
                    <Row>
                        <Colxx xxs="8">
                            <Nav tabs>
                                <NavItem>
                                    <NavLink
                                        className={classnames({ active: activeTab === '1' }) + ' no-select'}
                                        onClick={() => { toggleTab('1'); }}
                                    >
                                        Basic Details
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink
                                        className={classnames({ active: activeTab === '2' }) + ' no-select'}
                                        onClick={() => { toggleTab('2'); }}
                                    >
                                        Item Details
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink
                                        className={classnames({ active: activeTab === '3' }) + ' no-select'}
                                        onClick={() => { toggleTab('3'); }}
                                    >
                                        Price Details
                                    </NavLink>
                                </NavItem>
                                </Nav>
                                <TabContent activeTab={activeTab}>
                                <TabPane tabId="1">
                                    <Row className="mt-4">
                                        <Col sm="3">
                                            <FormGroup className="form-group has-float-label">
                                                <Label>
                                                    <IntlMessages id="Order ID" />
                                                </Label>
                                                <Field
                                                    className="form-control disabled-but-white"
                                                    type="text"
                                                    name="order_id"
                                                    disabled={true}
                                                />
                                            </FormGroup>
                                        </Col>
                                        <Col sm="3">
                                            <FormGroup className="form-group has-float-label">
                                                <Label>
                                                    <IntlMessages id="Current Status" />
                                                </Label>
                                                <Field as="select" name="current_status" className="form-control ghost-select disabled-but-white" disabled={true}>
                                                    <option value="">Select</option>
                                                    <option value="0">On Waiting</option>
                                                    <option value="1">Preparing</option>
                                                    <option value="2">Cooked</option>
                                                    <option value="3">Awaiting Pickup</option>
                                                    <option value="4">Out For Delivery</option>
                                                    <option value="5">Done</option>
                                                    <option value="6">Cancelled</option>
                                                </Field>
                                            </FormGroup>
                                        </Col>
                                        <Col sm="6"></Col>
                                        <Col sm="3">
                                            <FormGroup className="form-group has-float-label">
                                                <Label>
                                                    <IntlMessages id="Is Confirmed" />
                                                </Label>
                                                <Field as="select" name="is_confirmed" className="form-control ghost-select disabled-but-white" disabled={true}>
                                                    <option value="">Select</option>
                                                    <option value="0">No</option>
                                                    <option value="1">Yes</option>
                                                </Field>
                                            </FormGroup>
                                        </Col>
                                        <Col sm="3">
                                            <FormGroup className="form-group has-float-label">
                                                <Label>
                                                    <IntlMessages id="Is Cancelled" />
                                                </Label>
                                                <Field as="select" name="is_cancelled" className="form-control ghost-select disabled-but-white" disabled={true}>
                                                    <option value="">Select</option>
                                                    <option value="0">No</option>
                                                    <option value="1">Yes</option>
                                                </Field>
                                            </FormGroup>
                                        </Col>
                                        <Col sm="6"></Col>
                                        <Col sm="6">
                                            <FormGroup className="form-group has-float-label">
                                                <Label>
                                                    <IntlMessages id="Remarks" />
                                                </Label>
                                                <Field
                                                    className="form-control disabled-but-white"
                                                    component="textarea"
                                                    type="text"
                                                    name="remarks"
                                                    disabled={true}
                                                />
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                </TabPane>
                                <TabPane tabId="2">
                                    <Row className="mt-4">
                                        <Col sm="1" className="mb-1 text-center"><Label></Label></Col>
                                        <Col sm="7" className="mb-1 text-center"><Label>Item Name</Label></Col>
                                        <Col sm="2" className="mb-1 text-center"><Label>Quantity Type</Label></Col>
                                        <Col sm="2" className="mb-1 text-center"><Label>No Of Items</Label></Col>
                                    </Row>
                                    <FieldArray
                                        name="item_list"
                                        render={arrayHelpers => (
                                            <>
                                                {formFields.item_list.map((pval, index) => (
                                                    <Row className="mt-1" key={`row_${index}`}>
                                                        <Col sm="1" className="mb-1" key={`list_no_col_${index}`}>
                                                            <Label key={`label_${index}`} className="list-number">{index+1}</Label>
                                                        </Col>
                                                        <Col sm="7" className="mb-1"  key={`item_col_${index}`}>
                                                            <Field key={index} className="form-control disabled-but-white" name={`item_list[${index}].item_name`} disabled={true}/>
                                                        </Col>
                                                        <Col sm="2" className="mb-1"  key={`quantity_col_${index}`}>
                                                            <Field className="form-control disabled-but-white" name={`item_list[${index}].quantity_type`} disabled={true}/>
                                                        </Col>
                                                        <Col sm="2" className="mb-1"  key={`no_of_item_col_${index}`}>
                                                            <Field className="form-control disabled-but-white" name={`item_list[${index}].no_of_item`} disabled={true}/>
                                                        </Col>
                                                    </Row>
                                                ))}
                                            </>
                                        )}
                                    />
                                </TabPane>
                                <TabPane tabId="3">
                                    <Row className="mt-4">
                                        <Col sm="1" className="mb-1 text-center"><Label></Label></Col>
                                        <Col sm="9" className="mb-1 text-center"><Label>Details</Label></Col>
                                        <Col sm="2" className="mb-1 text-center"><Label>Price</Label></Col>
                                    </Row>
                                    <FieldArray
                                        name="delivery_charges"
                                        render={arrayHelpers => (
                                            <>
                                                {formFields.price_list.map((pval, index) => (
                                                    <Row className="mt-1" key={`row_${index}`}>
                                                        <Col sm="1" className="mb-1" key={`list_no_col_${index}`}>
                                                            <Label key={`label_${index}`} className="list-number">{index+1}</Label>
                                                        </Col>
                                                        <Col sm="9" className="mb-1"  key={`details_col_${index}`}>
                                                            <Field key={index} className="form-control disabled-but-white" name={`price_list[${index}].details`} disabled={true}/>
                                                        </Col>
                                                        <Col sm="2" className="mb-1"  key={`price_col_${index}`}>
                                                            <Field className="form-control text-right disabled-but-white" name={`price_list[${index}].price`} disabled={true}/>
                                                        </Col>
                                                    </Row>
                                                ))}
                                            </>
                                        )}
                                    />
                                    <Row className="mt-4">
                                        <Col sm="1" className="mb-1 text-center"><Label></Label></Col>
                                        <Col sm="9" className="mb-1 text-right"><Label>Total</Label></Col>
                                        <Col sm="2" className="mb-1">
                                            <Field className="form-control text-right disabled-but-white" name={`total_price`} disabled={true}/>
                                        </Col>
                                    </Row>
                                </TabPane>
                            </TabContent>
                        </Colxx>
                    </Row>

                    {(() => {
                        if(mode=='awaiting') {
                            return (
                                <div className="d-flex justify-content-between align-items-center float-right mt-4">
                                    <Button color="secondary" className="mr-2" onClick={()=> toList()}>Go Back</Button>
                                    <Button color="primary" className="mr-2" onClick={()=> printMenu()}>Print Menu</Button>
                                    <Button color="success" className="mr-2" onClick={()=> changeStatus('confirm')}>Confirm Order</Button>
                                    <Button color="danger" onClick={()=> changeStatus('cancel')}>Cancel Order</Button>
                                </div>
                            )
                        } else if(mode=='confirmed') {
                            return (
                                <div className="d-flex justify-content-between align-items-center float-right mt-4">
                                    <Button color="secondary" className="mr-2" onClick={()=> toList()}>Go Back</Button>
                                    <Button color="primary" onClick={()=> printMenu()}>Print Menu</Button>
                                </div>
                            )
                        } else {
                            return (
                                <div className="d-flex justify-content-between align-items-center float-right mt-4">
                                    <Button color="secondary" onClick={()=> toList()}>Go Back</Button>
                                </div>
                            )
                        }   
                    })()}
                </Form>
            )}
        </Formik>
    );
};

