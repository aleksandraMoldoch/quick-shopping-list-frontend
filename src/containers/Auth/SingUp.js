import React, { Component, Fragment } from 'react';
import { Formik } from 'formik';
import { Link } from 'react-router-dom';
import axios from '../../axios';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';

import SucsessAlert from '../../components/Alerts/SucsessAlert';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import singupSchema from './SingupSchema';
import Styles from './Styles';

class Singup extends Component {

    state = {
        completed: false
    }

    submitSingup = async (values) => {
        try {
            let res = await axios.post('/singup', values)
            if (res.status === 200) {
                this.setState({
                    completed: true,
                });
            } else {
                throw new Error('Unable to fetch ingredients list.');
            }
        } catch (error) {
            console.log(error);
        };
    };

    render() {
        return (
            <Fragment>
                {this.state.completed ?
                    <SucsessAlert message={'Welcome! Your account was created. You can now login.'} destination={'/login'} />
                    : null}
                <Formik onSubmit={(values, { setSubmitting }) => {
                    this.submitSingup(values)
                    setSubmitting(false)
                }}
                    initialValues={{ login: '', password: '', passwordConfirmation: '' }}
                    validationSchema={singupSchema}
                >
                    {({ values,
                        errors,
                        touched,
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        isSubmitting }) => (
                            <Styles>
                                <Form onSubmit={handleSubmit}>
                                    <Card style={{ width: '50%' }}>
                                        <Card.Header>
                                            <Form.Label className="label">Create Account</Form.Label>
                                        </Card.Header>
                                        <Card.Body>
                                            <Form.Group as={Col} lg={8} controlId="login">
                                                <Form.Control
                                                    name="login"
                                                    placeholder="Login"
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values.login}
                                                    isInvalid={touched.login && !!errors.login} />
                                                <Form.Control.Feedback className="feedback" type="invalid">
                                                    {errors.login}
                                                </Form.Control.Feedback>
                                            </Form.Group>
                                            <Form.Group as={Col} lg={8} controlId="password">
                                                <Form.Control
                                                    type="password"
                                                    name="password"
                                                    placeholder="Password"
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values.password}
                                                    isInvalid={touched.password && !!errors.password} />
                                                <Form.Control.Feedback className="feedback" type="invalid">
                                                    {errors.password}
                                                </Form.Control.Feedback>
                                            </Form.Group>
                                            <Form.Group as={Col} lg={8} controlId="passwordConfirmation">
                                                <Form.Control
                                                    type="password"
                                                    name="passwordConfirmation"
                                                    placeholder="Repeat password"
                                                    onChange={handleChange}
                                                    value={values.passwordConfirmation}
                                                    onBlur={handleBlur}
                                                    isInvalid={touched.passwordConfirmation && !!errors.passwordConfirmation} />
                                                <Form.Control.Feedback className="feedback" type="invalid">
                                                    {errors.passwordConfirmation}
                                                </Form.Control.Feedback>
                                            </Form.Group>
                                            <Button
                                                variant="mystyle"
                                                size="mysize"
                                                type="submit"
                                                onClick={handleSubmit}
                                                disabled={isSubmitting} >
                                                Sign Up!
                                            </Button>
                                        </Card.Body>
                                        <Card.Footer>Already have account? <Link to='/login'>Go to login!</Link></Card.Footer>
                                    </Card>
                                </Form>
                            </Styles>
                        )}
                </Formik>
            </Fragment >
        );
    };
};

export default withErrorHandler(Singup, axios);
