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
import { validatePassword, validateEmail, validateName, validatePhone, validateDob, validateAddress, validateCity, validatePostcode, validateIfsc, validateAccno } from '../../../containers/vendor/auth/fieldValidations';
import * as validation from '../../../containers/vendor/restaurants/validation';
import '../../../assets/css/custom.css';
import Autocomplete from 'react-google-autocomplete';

export const VendorForm = ({ activeTab, formFields, onRegister, toggleTab, loading, mode, showUpload, toggleUpload, handleChange, addToList, removeFromList, toggleStatus, formErrors }) => {
    //console.log(formErrors)
    const hiddenFileInput = React.useRef(null);
    const handleClick = event => {
        hiddenFileInput.current.click();
    };
    const prep_time = [
        {
            value:"00:05:00",
            name:"05"
        },
        {
            value:"00:10:00",
            name:"10"
        },
        {
            value:"00:15:00",
            name:"15"
        },
        {
            value:"00:20:00",
            name:"20"
        },
        {
            value:"00:25:00",
            name:"25"
        },
        {
            value:"00:30:00",
            name:"30"
        },
        {
            value:"00:35:00",
            name:"35"
        },
        {
            value:"00:40:00",
            name:"40"
        },
        {
            value:"00:45:00",
            name:"45"
        },
        {
            value:"00:50:00",
            name:"50"
        },
        {
            value:"00:55:00",
            name:"55"
        },
        {
            value:"01:00:00",
            name:"60"
        }
    ]
    const del_time = [
        {
            value:"00:00:00",
            name:"00:00"
        },
        {
            value:"00:30:00",
            name:"00:30"
        },
        {
            value:"01:00:00",
            name:"01:00"
        },
        {
            value:"01:30:00",
            name:"01:30"
        },
        {
            value:"02:00:00",
            name:"02:00"
        },
        {
            value:"02:30:00",
            name:"02:30"
        },
        {
            value:"03:00:00",
            name:"03:00"
        },
        {
            value:"03:30:00",
            name:"03:30"
        },
        {
            value:"04:00:00",
            name:"04:00"
        },
        {
            value:"04:30:00",
            name:"04:30"
        },
        {
            value:"05:00:00",
            name:"05:00"
        },
        {
            value:"05:30:00",
            name:"05:30"
        },
        {
            value:"06:00:00",
            name:"06:00"
        },
        {
            value:"06:30:00",
            name:"06:30"
        },
        {
            value:"07:00:00",
            name:"07:00"
        },
        {
            value:"07:30:00",
            name:"07:30"
        },
        {
            value:"08:00:00",
            name:"08:00"
        },
        {
            value:"08:30:00",
            name:"08:30"
        },
        {
            value:"09:00:00",
            name:"09:00"
        },
        {
            value:"09:30:00",
            name:"09:30"
        },
        {
            value:"10:00:00",
            name:"10:00"
        },
        {
            value:"10:30:00",
            name:"10:30"
        },
        {
            value:"11:00:00",
            name:"11:00"
        },
        {
            value:"11:30:00",
            name:"11:30"
        },
        {
            value:"12:00:00",
            name:"12:00"
        },
        {
            value:"12:30:00",
            name:"12:30"
        },
        {
            value:"13:00:00",
            name:"13:00"
        },
        {
            value:"13:30:00",
            name:"13:30"
        },
        {
            value:"14:00:00",
            name:"14:00"
        },
        {
            value:"14:30:00",
            name:"14:30"
        },
        {
            value:"15:00:00",
            name:"15:00"
        },
        {
            value:"15:30:00",
            name:"15:30"
        },
        {
            value:"16:00:00",
            name:"16:00"
        },
        {
            value:"16:30:00",
            name:"16:30"
        },
        {
            value:"17:00:00",
            name:"17:00"
        },
        {
            value:"17:30:00",
            name:"17:30"
        },
        {
            value:"18:00:00",
            name:"18:00"
        },
        {
            value:"18:30:00",
            name:"18:30"
        },
        {
            value:"19:00:00",
            name:"19:00"
        },
        {
            value:"19:30:00",
            name:"19:30"
        },
        {
            value:"20:00:00",
            name:"20:00"
        },
        {
            value:"20:30:00",
            name:"20:30"
        },
        {
            value:"21:00:00",
            name:"21:00"
        },
        {
            value:"21:30:00",
            name:"21:30"
        },
        {
            value:"22:00:00",
            name:"22:00"
        },
        {
            value:"22:30:00",
            name:"22:30"
        },
        {
            value:"23:00:00",
            name:"23:00"
        },
        {
            value:"23:30:00",
            name:"23:30"
        }
    ];
    return (
        <Formik enableReinitialize initialValues={formFields} onSubmit={onRegister} >
            {({ errors, touched, values }) => (
                <Form className="av-tooltip tooltip-label-bottom">
                    <Row>
                        {/*<Colxx xxs="4">
                            <Card onMouseEnter={() => toggleUpload(true)} onMouseLeave={() => toggleUpload(false)}>
                                <CardImg
                                    src="/assets/img/card-thumb-1.jpg"
                                    alt="Card image cap"
                                    className="image-resize-270px"
                                />
                                {(() => {
                                    if (showUpload) {
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
                                                    style={{ display: 'none' }}
                                                />
                                            </CardImgOverlay>
                                        )
                                    }
                                })()}
                            </Card>
                        </Colxx>*/}
                        <Colxx xxs="8">
                            <div>
                                <Nav tabs>
                                    <NavItem>
                                        <NavLink
                                            className={classnames({ active: activeTab === '1' }) + ' no-select'}
                                            //onClick={() => { toggleTab('1'); }}
                                        >
                                            Restaurant Details
                                        </NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink
                                            className={classnames({ active: activeTab === '2' }) + ' no-select'}
                                            //onClick={() => { toggleTab('2'); }}
                                        >
                                            Timings
                                        </NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink
                                            className={classnames({ active: activeTab === '3' }) + ' no-select'}
                                            //onClick={() => { toggleTab('3'); }}
                                        >
                                            Tax Charges
                                        </NavLink>
                                    </NavItem>
                                    {/*<NavItem>
                                        <NavLink
                                            className={classnames({ active: activeTab === '4' }) + ' no-select'}
                                            //onClick={() => { toggleTab('4'); }}
                                        >
                                            Delivery Charges
                                        </NavLink>
                                    </NavItem>*/}
                                    <NavItem>
                                        <NavLink
                                            className={classnames({ active: activeTab === '5' }) + ' no-select'}
                                            //onClick={() => { toggleTab('5'); }}
                                        >
                                            Location
                                        </NavLink>
                                    </NavItem>
                                </Nav>
                                <TabContent activeTab={activeTab}>
                                    <TabPane tabId="1">
                                        <Row className="mt-4">
                                            <Col sm="8">
                                                <FormGroup className="form-group has-float-label">
                                                    <Label>
                                                        <IntlMessages id="Restaurant Name" />
                                                    </Label>
                                                    <Field
                                                        className="form-control"
                                                        type="text"
                                                        name="name"
                                                    />
                                                    {(() => {
                                                        if (formErrors.name) {
                                                            return (
                                                                <div className="invalid-feedback d-block">
                                                                    {formErrors.name}
                                                                </div>
                                                            )
                                                        }
                                                    })()}
                                                </FormGroup>

                                                <FormGroup className="form-group has-float-label">
                                                    <Label>
                                                        <IntlMessages id="Description" />
                                                    </Label>
                                                    <Field
                                                        className="form-control"
                                                        name="description"
                                                        component="textarea"
                                                    />
                                                    {formErrors.description && (
                                                        <div className="invalid-feedback d-block">
                                                            {formErrors.description}
                                                        </div>
                                                    )}
                                                </FormGroup>
                                                
                                                <Row>
                                                    <Col sm="6">
                                                        <FormGroup className="form-group has-float-label">
                                                            <Label>
                                                                <IntlMessages id="Mobile No" />
                                                            </Label>
                                                            <Field
                                                                className="form-control"
                                                                type="number"
                                                                name="phone_number"
                                                            />
                                                            {formErrors.phone_number && (
                                                                <div className="invalid-feedback d-block">
                                                                    {formErrors.phone_number}
                                                                </div>
                                                            )}
                                                        </FormGroup>
                                                    </Col>
                                                    <Col sm="6">
                                                        <FormGroup className="form-group has-float-label">
                                                            <Label>
                                                                <IntlMessages id="Alternative Mobile No" />
                                                            </Label>
                                                            <Field
                                                                className="form-control"
                                                                type="number"
                                                                name="alternate_number"
                                                            />
                                                            {formErrors.alternate_number && (
                                                                <div className="invalid-feedback d-block">
                                                                    {formErrors.alternate_number}
                                                                </div>
                                                            )}
                                                        </FormGroup>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col sm="8">
                                                        <FormGroup className="form-group has-float-label">
                                                            <Label>
                                                                <IntlMessages id="Email" />
                                                            </Label>
                                                            <Field
                                                                className="form-control"
                                                                name="email"
                                                            />
                                                            {formErrors.email && (
                                                                <div className="invalid-feedback d-block">
                                                                    {formErrors.email}
                                                                </div>
                                                            )}
                                                        </FormGroup>
                                                    </Col>
                                                    <Col sm="4">
                                                        <FormGroup className="form-group has-float-label">
                                                            <Label>
                                                                <IntlMessages id="Minimum Order Value" />
                                                            </Label>
                                                            <Field
                                                                className="form-control"
                                                                type="text"
                                                                name="minimum_order_value"
                                                            />
                                                            {formErrors.minimum_order_value && (
                                                                <div className="invalid-feedback d-block">
                                                                    {formErrors.minimum_order_value}
                                                                </div>
                                                            )}
                                                        </FormGroup>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col sm="4">
                                                        <FormGroup className="form-group has-float-label">
                                                            <Label>
                                                                <IntlMessages id="Serves" />
                                                            </Label>
                                                            <Field as="select" name="serve" className="form-control">
                                                                <option value="">Select</option>
                                                                <option value="1">Veg</option>
                                                                <option value="2">Non Veg</option>
                                                                <option value="3">Both</option>
                                                            </Field>
                                                            {formErrors.serve && (
                                                                <div className="invalid-feedback d-block">
                                                                    {formErrors.serve}
                                                                </div>
                                                            )}
                                                        </FormGroup>
                                                    </Col>
                                                    <Col sm="4">
                                                        <FormGroup className="form-group has-float-label">
                                                            <Label>
                                                                <IntlMessages id="Status" />
                                                            </Label>
                                                            <Field as="select" name="is_active" className="form-control">
                                                                <option value="">Select</option>
                                                                <option value="1">Active</option>
                                                                <option value="2">Inactive</option>
                                                            </Field>
                                                            {formErrors.is_active && (
                                                                <div className="invalid-feedback d-block">
                                                                    {formErrors.is_active}
                                                                </div>
                                                            )}
                                                        </FormGroup>
                                                    </Col>
                                                    <Col sm="4">
                                                        <FormGroup className="form-group has-float-label">
                                                            <Label>
                                                                <IntlMessages id="Cash On Delivery" />
                                                            </Label>
                                                            <Field as="select" name="is_cash_on_delivery" className="form-control">
                                                                <option value="">Select</option>
                                                                <option value="1">Yes</option>
                                                                <option value="2">No</option>
                                                            </Field>
                                                            {formErrors.is_cash_on_delivery && (
                                                                <div className="invalid-feedback d-block">
                                                                    {formErrors.is_cash_on_delivery}
                                                                </div>
                                                            )}
                                                        </FormGroup>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col sm="6">
                                                        <FormGroup className="form-group has-float-label">
                                                            <Label>
                                                                <IntlMessages id="Average Cost Per Person" />
                                                            </Label>
                                                            <Field
                                                                className="form-control"
                                                                type="text"
                                                                name="avg_cost_per_person"
                                                            />
                                                            {formErrors.avg_cost_per_person && (
                                                                <div className="invalid-feedback d-block">
                                                                    {formErrors.avg_cost_per_person}
                                                                </div>
                                                            )}
                                                        </FormGroup>
                                                    </Col>
                                                    <Col sm="6">
                                                        <FormGroup className="form-group has-float-label">
                                                            <Label>
                                                                <IntlMessages id="Preparation Time (Minutes)" />
                                                            </Label>
                                                            <Field as="select" name="preparation_time" className="form-control">
                                                                <option value="">Select</option>
                                                                {prep_time.map((pVal,pKey) => {
                                                                    return (
                                                                        <option key={pKey} value={pVal.value}>{pVal.name}</option>
                                                                    )
                                                                })}
                                                            </Field>
                                                            {formErrors.preparation_time && (
                                                                <div className="invalid-feedback d-block">
                                                                    {formErrors.preparation_time}
                                                                </div>
                                                            )}
                                                        </FormGroup>
                                                    </Col>
                                                    <Col sm="4">
                                                        {/*<FormGroup className="form-group has-float-label">
                                                            <Label>
                                                                <IntlMessages id="Delivery Time" />
                                                            </Label>
                                                            <Field as="select" name="delivery_time" className="form-control">
                                                                <option value="">Select</option>
                                                                {del_time.map((pVal,pKey) => {
                                                                    return (
                                                                        <option key={pKey} value={pVal.value}>{pVal.name}</option>
                                                                    )
                                                                })}
                                                            </Field>
                                                            {formErrors.delivery_time && (
                                                                <div className="invalid-feedback d-block">
                                                                    {formErrors.delivery_time}
                                                                </div>
                                                            )}
                                                        </FormGroup>*/}
                                                        <FormGroup className="form-group has-float-label">
                                                            <Label>
                                                                <IntlMessages id="Is Online" />
                                                            </Label>
                                                            <Field as="select" name="is_online" className="form-control">
                                                                <option value="">Select</option>
                                                                <option value="1">Yes</option>
                                                                <option value="2">No</option>
                                                            </Field>
                                                            {formErrors.is_online && (
                                                                <div className="invalid-feedback d-block">
                                                                    {formErrors.is_online}
                                                                </div>
                                                            )}
                                                        </FormGroup>
                                                    </Col>
                                                </Row>

                                                <FieldArray
                                                    name="cuisines"
                                                    render={arrayHelpers => (
                                                        <Row>
                                                            <Col sm="12" className="mb-2"><strong>Food Type</strong></Col>
                                                            {formFields.cuisines.map((pval, index) => (
                                                                <Col sm="3" key={`main_col_${index}`}>
                                                                    <Row className="mt-1" key={`row_${index}`}>
                                                                        <Col sm="9" className="mb-1 text-center" key={`label_col_${index}`}>
                                                                            <Label key={`label_${index}`}>{pval.name}</Label>
                                                                        </Col>
                                                                        <Col sm="3" className="mb-1"  key={`cuisines_col_${index}`}>
                                                                            <Field key={index} type="checkbox" className="form-control" name={`cuisines[${index}].status`} />
                                                                        </Col>
                                                                    </Row>
                                                                </Col>
                                                            ))}
                                                        </Row>
                                                    )}
                                                />

                                            </Col>
                                        </Row>

                                        <div className="d-flex justify-content-between align-items-center float-right mt-4">
                                            <Button
                                                color="primary"
                                                className="btn-shadow btn-multiple-state"
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
                                            <Col sm="3">
                                                <FormGroup className="form-group has-float-label">
                                                    <Label>
                                                        <IntlMessages id="Pre Order" />
                                                    </Label>
                                                    <Field as="select" name="is_pre_order" className="form-control">
                                                        <option value="">Select</option>
                                                        <option value="1">Yes</option>
                                                        <option value="2">No</option>
                                                    </Field>
                                                    {formErrors.is_pre_order && (
                                                        <div className="invalid-feedback d-block">
                                                            {formErrors.is_pre_order}
                                                        </div>
                                                    )}
                                                </FormGroup>
                                            </Col>
                                            <Col sm="6"></Col>
                                            <Col sm="3">
                                                <FormGroup className="form-group has-float-label">
                                                    <Label>
                                                        <IntlMessages id="Pick Up/delivery" />
                                                    </Label>
                                                    <Field as="select" name="pick_up_delivery" className="form-control">
                                                        <option value="">Select</option>
                                                        <option value="1">Pick Up</option>
                                                        <option value="2">Delivery</option>
                                                        <option value="3">Both</option>
                                                    </Field>
                                                    {formErrors.pick_up_delivery && (
                                                        <div className="invalid-feedback d-block">
                                                            {formErrors.pick_up_delivery}
                                                        </div>
                                                    )}
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        {/*<Row>
                                            <Col sm="12" className="mb-2"><strong>Order Timing</strong></Col>
                                            <Col sm="4"></Col>
                                            <Col sm="4"><Label>Start Timing</Label></Col>
                                            <Col sm="4"><Label>End Timing</Label></Col>
                                            <Col sm="12" className="mb-2">
                                                <FieldArray
                                                    name="order_timing"
                                                    render={arrayHelpers => (
                                                        <>
                                                        {formFields.order_timing.map((pval, index) => (
                                                            <Row className="mt-1" key={`row_${index}`}>
                                                                <Col sm="4" className="mb-1" key={`label_col_${index}`}>
                                                                    <Label key={`label_${index}`} className="float-right">{pval.name}</Label>
                                                                </Col>
                                                                <Col sm="4" className="mb-1"  key={`start_time_col_${index}`}>
                                                                    <Field as="select" className="form-control" name={`order_timing[${index}].start_time`}>
                                                                        <option value="">Select</option>
                                                                        {del_time.map((pVal,pKey) => {
                                                                            return (
                                                                                <option key={pKey} value={pVal.value}>{pVal.name}</option>
                                                                            )
                                                                        })}
                                                                    </Field>
                                                                    {(() => {
                                                                        if(formErrors.order_timing[index].start_error) {
                                                                            return (
                                                                                <div className="invalid-feedback d-block">
                                                                                    {formErrors.order_timing[index].start_error}
                                                                                </div>
                                                                            )
                                                                        }   
                                                                    })()}
                                                                </Col>
                                                                <Col sm="4" className="mb-1"  key={`end_time_col_${index}`}>
                                                                    <Field as="select" className="form-control" name={`order_timing[${index}].end_time`}>
                                                                        <option value="">Select</option>
                                                                        {del_time.map((pVal,pKey) => {
                                                                            return (
                                                                                <option key={pKey} value={pVal.value}>{pVal.name}</option>
                                                                            )
                                                                        })}
                                                                    </Field>
                                                                    {(() => {
                                                                        if(formErrors.order_timing[index].end_error) {
                                                                            return (
                                                                                <div className="invalid-feedback d-block">
                                                                                    {formErrors.order_timing[index].end_error}
                                                                                </div>
                                                                            )
                                                                        }   
                                                                    })()}
                                                                </Col>
                                                            </Row>
                                                        ))}
                                                    </>
                                                )}/>
                                            </Col>
                                        </Row>
                                        <Row className="mt-3">
                                            <Col sm="12" className="mb-2"><strong>Delivery Timing</strong></Col>
                                            <Col sm="4"></Col>
                                            <Col sm="4"><Label>Start Timing</Label></Col>
                                            <Col sm="4"><Label>End Timing</Label></Col>
                                            <Col sm="12" className="mb-2">
                                                <FieldArray
                                                    name="delivery_timing"
                                                    render={arrayHelpers => (
                                                        <>
                                                        {formFields.delivery_timing.map((pval, index) => (
                                                            <Row className="mt-1" key={`row_${index}`}>
                                                                <Col sm="4" className="mb-1" key={`label_col_${index}`}>
                                                                    <Label key={`label_${index}`} className="float-right">{pval.name}</Label>
                                                                </Col>
                                                                <Col sm="4" className="mb-1"  key={`start_time_col_${index}`}>
                                                                    <Field as="select" className="form-control" name={`delivery_timing[${index}].start_time`}>
                                                                        <option value="">Select</option>
                                                                        {del_time.map((pVal,pKey) => {
                                                                            return (
                                                                                <option key={pKey} value={pVal.value}>{pVal.name}</option>
                                                                            )
                                                                        })}
                                                                    </Field>
                                                                    {(() => {
                                                                        if(formErrors.delivery_timing[index].start_error) {
                                                                            return (
                                                                                <div className="invalid-feedback d-block">
                                                                                    {formErrors.delivery_timing[index].start_error}
                                                                                </div>
                                                                            )
                                                                        }   
                                                                    })()}
                                                                </Col>
                                                                <Col sm="4" className="mb-1"  key={`end_time_col_${index}`}>
                                                                    <Field as="select" className="form-control" name={`delivery_timing[${index}].end_time`}>
                                                                        <option value="">Select</option>
                                                                        {del_time.map((pVal,pKey) => {
                                                                            return (
                                                                                <option key={pKey} value={pVal.value}>{pVal.name}</option>
                                                                            )
                                                                        })}
                                                                    </Field>
                                                                    {(() => {
                                                                        if(formErrors.delivery_timing[index].end_error) {
                                                                            return (
                                                                                <div className="invalid-feedback d-block">
                                                                                    {formErrors.delivery_timing[index].end_error}
                                                                                </div>
                                                                            )
                                                                        }   
                                                                    })()}
                                                                </Col>
                                                            </Row>
                                                        ))}
                                                    </>
                                                )}/>
                                            </Col>
                                        </Row>*/}
                                        <Row className="mt-3">
                                            <Col sm="12" className="mb-2"><strong>Restaurant Timing</strong></Col>
                                            <Col sm="4"></Col>
                                            <Col sm="4"><Label>Start Timing</Label></Col>
                                            <Col sm="4"><Label>End Timing</Label></Col>
                                            <Col sm="12" className="mb-2">
                                                <FieldArray
                                                    name="restaurant_timing"
                                                    render={arrayHelpers => (
                                                        <>
                                                        {formFields.restaurant_timing.map((pval, index) => (
                                                            <Row className="mt-1" key={`row_${index}`}>
                                                                <Col sm="4" className="mb-1" key={`label_col_${index}`}>
                                                                    <Label key={`label_${index}`} className="float-right">{pval.name}</Label>
                                                                </Col>
                                                                <Col sm="4" className="mb-1"  key={`start_time_col_${index}`}>
                                                                    <Field as="select" className="form-control" name={`restaurant_timing[${index}].start_time`}>
                                                                        <option value="">Select</option>
                                                                        {del_time.map((pVal,pKey) => {
                                                                            return (
                                                                                <option key={pKey} value={pVal.value}>{pVal.name}</option>
                                                                            )
                                                                        })}
                                                                    </Field>
                                                                    {(() => {
                                                                        if(formErrors.restaurant_timing[index].start_error) {
                                                                            return (
                                                                                <div className="invalid-feedback d-block">
                                                                                    {formErrors.restaurant_timing[index].start_error}
                                                                                </div>
                                                                            )
                                                                        }   
                                                                    })()}
                                                                </Col>
                                                                <Col sm="4" className="mb-1"  key={`end_time_col_${index}`}>
                                                                    <Field as="select" className="form-control" name={`restaurant_timing[${index}].end_time`}>
                                                                        <option value="">Select</option>
                                                                        {del_time.map((pVal,pKey) => {
                                                                            return (
                                                                                <option key={pKey} value={pVal.value}>{pVal.name}</option>
                                                                            )
                                                                        })}
                                                                    </Field>
                                                                    {(() => {
                                                                        if(formErrors.restaurant_timing[index].end_error) {
                                                                            return (
                                                                                <div className="invalid-feedback d-block">
                                                                                    {formErrors.restaurant_timing[index].end_error}
                                                                                </div>
                                                                            )
                                                                        }   
                                                                    })()}
                                                                </Col>
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
                                            <Col sm="4" className="mb-1"><Label>GST(%)</Label></Col>
                                            <Col sm="4" className="mb-1">
                                                <Field
                                                    className="form-control"
                                                    type="number"
                                                    name="gst"
                                                />
                                                {formErrors.gst && (
                                                    <div className="invalid-feedback d-block">
                                                        {formErrors.gst}
                                                    </div>
                                                )}
                                            </Col>
                                            
                                            <Col sm="4"></Col>
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
                                                color="primary"
                                                className="btn-shadow btn-multiple-state ml-2"
                                                size="lg"
                                                onClick={() => { toggleTab('5','3',values); }}
                                            >
                                                <span className="label">
                                                    <IntlMessages id="Next" />
                                                </span>
                                            </Button>
                                        </div>

                                    </TabPane>

                                    <TabPane tabId="4">
                                        <Row className="mt-4">
                                            <Col sm="1" className="mb-1 text-center"><Label>#</Label></Col>
                                            <Col sm="2" className="mb-1"><Label>City Name</Label></Col>
                                            <Col sm="2" className="mb-1"><Label>Area Name</Label></Col>
                                            <Col sm="2" className="mb-1"><Label>Zip Code</Label></Col>
                                            <Col sm="2" className="mb-1"><Label>Charges</Label></Col>
                                            <Col sm="3" className="mb-1"><Label>Action</Label></Col>
                                        </Row>
                                        <FieldArray
                                            name="delivery_charges"
                                            render={arrayHelpers => (
                                                <>
                                                    {formFields.delivery_charges.map((pval, index) => (
                                                        <Row className="mt-1" key={`row_${index}`}>
                                                            <Col sm="1" className="mb-1" key={`label_col_${index}`}>
                                                                <Label key={`label_${index}`} className="list-number">{index+1}</Label>
                                                            </Col>
                                                            <Col sm="2" className="mb-1"  key={`city_col_${index}`}>
                                                                <Field key={index} className="form-control" name={`delivery_charges[${index}].city_name`}/>
                                                                {(() => {
                                                                    if(formErrors.delivery_charges.length>0) {
                                                                        if(formErrors.delivery_charges[index].city_name) {
                                                                            return (
                                                                                <div className="invalid-feedback d-block">
                                                                                    {formErrors.delivery_charges[index]['city_name']}
                                                                                </div>
                                                                            )
                                                                        }
                                                                    }
                                                                })()}
                                                            </Col>
                                                            <Col sm="2" className="mb-1"  key={`area_col_${index}`}>
                                                                <Field className="form-control" name={`delivery_charges[${index}].area_name`}/>
                                                                {(() => {
                                                                    if(formErrors.delivery_charges.length>0) {
                                                                        if(formErrors.delivery_charges[index].area_name) {
                                                                            return (
                                                                                <div className="invalid-feedback d-block">
                                                                                    {formErrors.delivery_charges[index]['area_name']}
                                                                                </div>
                                                                            )
                                                                        }
                                                                    }
                                                                })()}
                                                            </Col>
                                                            <Col sm="2" className="mb-1"  key={`zipcode_col_${index}`}>
                                                                <Field className="form-control" name={`delivery_charges[${index}].zip_code`}/>
                                                                {(() => {
                                                                    if(formErrors.delivery_charges.length>0) {
                                                                        if(formErrors.delivery_charges[index].zip_code) {
                                                                            return (
                                                                                <div className="invalid-feedback d-block">
                                                                                    {formErrors.delivery_charges[index]['zip_code']}
                                                                                </div>
                                                                            )
                                                                        }
                                                                    }
                                                                })()}
                                                            </Col>
                                                            <Col sm="2" className="mb-1"  key={`charges_col_${index}`}>
                                                                <Field className="form-control" name={`delivery_charges[${index}].charges`}/>
                                                                {(() => {
                                                                    if(formErrors.delivery_charges.length>0) {
                                                                        if(formErrors.delivery_charges[index].charges) {
                                                                            return (
                                                                                <div className="invalid-feedback d-block">
                                                                                    {formErrors.delivery_charges[index]['charges']}
                                                                                </div>
                                                                            )
                                                                        }
                                                                    }
                                                                })()}
                                                            </Col>
                                                            <Col sm="3" className="mb-1"  key={`action_col_${index}`}>
                                                                <i key={`add_${index}`} className="iconsminds-add font25" onClick={() => addToList(values,index)}></i>
                                                                <i key={`remove_${index}`} className="iconsminds-remove font25" onClick={() => removeFromList(values,index)}></i>
                                                                {/*<i key={`see_${index}`} className={pval.status?'iconsminds-yes font25':'iconsminds-close font25'} onClick={() => toggleStatus(values,index)}></i>*/}
                                                            </Col>
                                                        </Row>
                                                    ))}
                                                </>
                                            )}
                                        />
                                          
                                          <div className="d-flex justify-content-between align-items-center float-right mt-4">
                                            <Button
                                                color="primary"
                                                className="btn-shadow btn-multiple-state"
                                                size="lg"
                                                onClick={() => { toggleTab('3','4',values); }}
                                            >
                                                <span className="label">
                                                    <IntlMessages id="Prev" />
                                                </span>
                                            </Button>
                                            <Button
                                                color="primary"
                                                className="btn-shadow btn-multiple-state ml-2"
                                                size="lg"
                                                onClick={() => { toggleTab('5','4',values); }}
                                            >
                                                <span className="label">
                                                    <IntlMessages id="Next" />
                                                </span>
                                            </Button>
                                        </div>

                                    </TabPane>

                                    <TabPane tabId="5">
                                        <Row style={{display:'none'}}>
                                            <Col sm="6">
                                                <FormGroup className="form-group has-float-label">
                                                    <Label>
                                                        <IntlMessages id="Latitude" />
                                                    </Label>
                                                    <Field
                                                        className="form-control"
                                                        type="number"
                                                        name="latitude"
                                                    />
                                                    {formErrors.latitude && (
                                                        <div className="invalid-feedback d-block">
                                                            {formErrors.latitude}
                                                        </div>
                                                    )}
                                                </FormGroup>
                                            </Col>
                                            <Col sm="6">
                                                <FormGroup className="form-group has-float-label">
                                                    <Label>
                                                        <IntlMessages id="Longitude" />
                                                    </Label>
                                                    <Field
                                                        className="form-control"
                                                        type="number"
                                                        name="longitude"
                                                    />
                                                    {formErrors.longitude && (
                                                        <div className="invalid-feedback d-block">
                                                            {formErrors.longitude}
                                                        </div>
                                                    )}
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <FormGroup className="mt-4 form-group has-float-label">
                                            <Label>
                                                <IntlMessages id="Address" />
                                            </Label>
                                            <Field
                                                className="form-control"
                                                type="text"
                                                name="address"
                                            />
                                            {formErrors.address && (
                                                <div className="invalid-feedback d-block">
                                                    {formErrors.address}
                                                </div>
                                            )}
                                        </FormGroup>

                                        <Row>
                                            <Col sm="4">
                                                <FormGroup className="form-group has-float-label">
                                                    <Label>
                                                        <IntlMessages id="City" />
                                                    </Label>
                                                    <Field
                                                        className="form-control"
                                                        type="text"
                                                        name="city"
                                                    />
                                                    {formErrors.city && (
                                                        <div className="invalid-feedback d-block">
                                                            {formErrors.city}
                                                        </div>
                                                    )}
                                                </FormGroup>
                                            </Col>
                                            <Col sm="4">
                                                <FormGroup className="form-group has-float-label">
                                                    <Label>
                                                        <IntlMessages id="Region" />
                                                    </Label>
                                                    <Field
                                                        className="form-control"
                                                        type="text"
                                                        name="region"
                                                    />
                                                    {formErrors.region && (
                                                        <div className="invalid-feedback d-block">
                                                            {formErrors.region}
                                                        </div>
                                                    )}
                                                </FormGroup>
                                            </Col>
                                            <Col sm="4">
                                                <FormGroup className="form-group has-float-label">
                                                    <Label>
                                                        <IntlMessages id="Post Code" />
                                                    </Label>
                                                    <Field
                                                        className="form-control"
                                                        type="text"
                                                        name="zipcode"
                                                    />
                                                    {formErrors.zipcode && (
                                                        <div className="invalid-feedback d-block">
                                                            {formErrors.zipcode}
                                                        </div>
                                                    )}
                                                </FormGroup>
                                            </Col>
                                        </Row>


                                        {/*<Autocomplete
                                            className="form-control"
                                            apiKey={'AIzaSyCWBzQcRLFHTt4OWZ_SJQ6dgpdaocsxW5s'}
                                            onPlaceSelected={(place) => {
                                                console.log(place);
                                            }}
                                            types={['(regions)']}
                                            //componentRestrictions={{country: "ru"}}
                                        />*/}




                                        <div className="d-flex justify-content-between align-items-center float-right mt-4">
                                            <Button
                                                color="primary"
                                                className="btn-shadow btn-multiple-state"
                                                size="lg"
                                                onClick={() => { toggleTab('3','5',values); }}
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

