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

export const MenuItemForm = ({ formFields, onRegister, loading, mode, menu_group_list }) => {
    return (
        <Formik enableReinitialize initialValues={formFields} onSubmit={onRegister} >
            {({ errors, touched, values }) => (
                <Form className="av-tooltip tooltip-label-bottom">
                    <Row>
                        <Colxx xxs="12">
                            <Row>
                                <Col sm="12">
                                    <Row>
                                        <Col sm="4">
                                            <FormGroup className="form-group has-float-label">
                                                <Label>
                                                    <IntlMessages id="Item Name" />
                                                </Label>
                                                <Field
                                                    className={`form-control ${mode==='view'?'disabled-but-white':''}`}
                                                    disabled={mode==='view'?true:false}
                                                    type="text"
                                                    name="name"
                                                    required
                                                    // validate={(value) => validation.notnull(value, 'Menu Group Name')}
                                                />
                                                {/* {errors.name && touched.name && (
                                                    <div className="invalid-feedback d-block">
                                                        {errors.name}
                                                    </div>
                                                )} */}
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    
                                    <FormGroup className="form-group mt-2">
                                        <Row>
                                            <Col sm="4">
                                                <FormGroup className="form-group has-float-label">
                                                    <Label>
                                                        <IntlMessages id="Description" />
                                                    </Label>
                                                    <Field
                                                        className={`form-control ${mode==='view'?'disabled-but-white':''}`}
                                                        disabled={mode==='view'?true:false}
                                                        name="description"
                                                        component="textarea"
                                                        required
                                                        // validate={(value) => validation.notnull(value, 'description', 5, 30)}
                                                    />
                                                    {/* {errors.description && touched.description && (
                                                        <div className="invalid-feedback d-block">
                                                            {errors.description}
                                                        </div>
                                                    )} */}
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                    </FormGroup>

                                    <Row>
                                        <Col sm="4">
                                            <FormGroup className="form-group has-float-label">
                                                <Label>
                                                    <IntlMessages id="Main Group" />
                                                </Label>
                                                <Field as="select" name="menu_group" disabled={mode==='view'?true:false} className={`form-control ${mode==='view'?'ghost-select disabled-but-white':''}`} required>
                                                    <option value="">Select</option>
                                                    {menu_group_list.map((category,index) => {
                                                        return (
                                                            <option key={index} value={category.id}>{category.name}</option>
                                                        )
                                                    })}
                                                </Field>
                                                {/* {errors.veg_status && touched.veg_status && (
                                                    <div className="invalid-feedback d-block">
                                                        {errors.veg_status}
                                                    </div>
                                                )} */}
                                            </FormGroup>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col sm="12" className="mb-2"><strong>Price :</strong></Col>
                                        <Col sm="4">
                                            <FieldArray
                                                name="price"
                                                render={arrayHelpers => (
                                                    <>
                                                        {formFields.price.map((pval, index) => (
                                                            <Row className="mt-1" key={`row_${index}`}>
                                                                <Col sm="5" className="mb-1" key={`label_col_${index}`}>
                                                                    <Label key={`label_${index}`} className="float-right">{pval.name}</Label>
                                                                </Col>
                                                                <Col sm="7" className="mb-1"  key={`price_col_${index}`}>
                                                                    <Field key={index} disabled={mode==='view'?true:false} className={`form-control ${mode==='view'?'disabled-but-white':''}`} name={`price[${index}].price`} required/>
                                                                    {/* {(() => {
                                                                        if (errors.price && touched.price) {
                                                                            if(errors.price[index]) {
                                                                                if(errors.price[index].price) {
                                                                                    return (
                                                                                        <div className="invalid-feedback d-block">
                                                                                            {errors.price[index].price}
                                                                                        </div>
                                                                                    )
                                                                                }
                                                                            }
                                                                        }
                                                                    })()} */}
                                                                </Col>
                                                            </Row>
                                                        ))}
                                                    </>
                                                )}
                                            />
                                        </Col>
                                    </Row>
                                    
                                    <Row className="mt-4">
                                        <Col sm="12" className="mb-2"><strong>Toppings / Extra Items :</strong></Col>
                                        <Col sm="4">
                                            <FieldArray
                                                name="extra"
                                                render={arrayHelpers => (
                                                    <Row>
                                                        {formFields.extra.map((pval, index) => (
                                                            <Col sm="6" key={`main_col_${index}`}>
                                                                <Row className="mt-1" key={`row_${index}`}>
                                                                    <Col sm="9" className="mb-1 text-center" key={`label_col_${index}`}>
                                                                        <Label key={`label_${index}`}>{pval.name}</Label>
                                                                    </Col>
                                                                    <Col sm="3" className="mb-1"  key={`extra_col_${index}`}>
                                                                        <Field key={index} disabled={mode==='view'?true:false} type="checkbox" className={`form-control ${mode==='view'?'disabled-but-white':''}`} name={`extra[${index}].status`} />
                                                                    </Col>
                                                                </Row>
                                                            </Col>
                                                        ))}
                                                    </Row>
                                                )}
                                            />
                                        </Col>
                                    </Row>

                                    <Row className="mt-4">
                                        <Col sm="2">
                                            <FormGroup className="form-group has-float-label">
                                                <Label>
                                                    <IntlMessages id="Spice Status" />
                                                </Label>
                                                <Field as="select" name="spicy" disabled={mode==='view'?true:false} className={`form-control ${mode==='view'?'ghost-select disabled-but-white':''}`} required>
                                                    <option value="">Select</option>
                                                    <option value="1">Extra Spicy</option>
                                                    <option value="2">Spicy</option>
                                                    <option value="3">Non Spicy</option>
                                                </Field>
                                                {/* {errors.spicy && touched.spicy && (
                                                    <div className="invalid-feedback d-block">
                                                        {errors.spicy}
                                                    </div>
                                                )} */}
                                            </FormGroup>
                                        </Col>
                                        <Col sm="2">
                                            <FormGroup className="form-group has-float-label">
                                                <Label>
                                                    <IntlMessages id="Veg Status" />
                                                </Label>
                                                <Field as="select" name="veg_status" disabled={mode==='view'?true:false} className={`form-control ${mode==='view'?'ghost-select disabled-but-white':''}`} required>
                                                    <option value="">Select</option>
                                                    <option value="0">Veg</option>
                                                    <option value="1">Non Veg</option>
                                                    <option value="2">Both</option>
                                                </Field>
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
                                            </FormGroup>
                                        </Col>
                                        <Col sm="2">
                                            <FormGroup className="form-group has-float-label">
                                                <Label>
                                                    <IntlMessages id="Display Order" />
                                                </Label>
                                                <Field
                                                    className={`form-control ${mode==='view'?'disabled-but-white':''}`}
                                                    disabled={mode==='view'?true:false}
                                                    type="number"
                                                    name="display_order"
                                                    required
                                                    // validate={(value) => validation.notnull(value, 'Display Order')}
                                                />
                                                {/* {errors.display_order && touched.display_order && (
                                                    <div className="invalid-feedback d-block">
                                                        {errors.display_order}
                                                    </div>
                                                )} */}
                                            </FormGroup>
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

