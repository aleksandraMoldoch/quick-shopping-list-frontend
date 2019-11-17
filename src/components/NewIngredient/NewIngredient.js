import React, { Fragment } from 'react';
import { Formik } from 'formik';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';

import ingredientSchema from './IngredientSchema';

import Styles from './Styles';

const newIngredient = (props) => (
    <Fragment>
        <Formik onSubmit={(values, { setSubmitting }) => {
            props.submitAddIngredient(values)
            setSubmitting(false)
        }}
            initialValues={{ quantity: '', unit: '', ingredientName: '' }}
            validationSchema={ingredientSchema}
        >
            {({ values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting }) => (
                    <Styles>
                        <Form as={Col} lg={8} onSubmit={handleSubmit}>
                            <Form.Row >
                                <Form.Label className="label">Add ingredient</Form.Label>
                            </Form.Row>
                            <Form.Row >
                                <Form.Group as={Col} lg={3} controlId="quantity">
                                    <Form.Control
                                        name="quantity"
                                        placeholder="Quantity"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.quantity}
                                        isInvalid={touched.quantity && !!errors.quantity} />
                                    <Form.Control.Feedback className="feedback" type="invalid">
                                        {errors.quantity}
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group as={Col} lg={3} controlId="unit">
                                    <Form.Control
                                        name="unit"
                                        placeholder="Unit"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.unit}
                                        isInvalid={touched.unit && !!errors.unit} />
                                    <Form.Control.Feedback className="feedback" type="invalid">
                                        {errors.unit}
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group as={Col} lg={4} controlId="ingredientName">
                                    <Form.Control
                                        name="ingredientName"
                                        placeholder="Ingredient name"
                                        onChange={handleChange}
                                        value={values.ingredientName}
                                        onBlur={handleBlur}
                                        isInvalid={touched.ingredientName && !!errors.ingredientName} />
                                    <Form.Control.Feedback className="feedback" type="invalid">
                                        {errors.ingredientName}
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Col lg={2}>
                                    <Button
                                        variant="mystyle"
                                        size="mysize"
                                        type="submit"
                                        onClick={handleSubmit}
                                        disabled={isSubmitting} >
                                        Add
                                    </Button>
                                </Col>
                            </Form.Row>
                        </Form>
                    </Styles>
                )}
        </Formik>
    </Fragment >
);

export default newIngredient;
