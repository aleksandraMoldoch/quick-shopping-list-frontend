import React, { Fragment } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { Formik } from 'formik';
import axios from '../../axios';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';

import { useAuth } from '../../context/auth';
import loginSchema from './LoginSchema';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

import Styles from './Styles';

const Login = (props) => {

    const { setAuthTokens } = useAuth();

    const submitLogin = async (values) => {
        try {
            let res = await axios.post('/login', values);
            if (res.status === 200) {
                setAuthTokens(res.data.token);
                localStorage.setItem('token', res.data.token);
                localStorage.setItem('userId', res.data.user.id);
                return props.history.push('/');
            } else {
                throw new Error('Unable to fetch user');
            }
        } catch (error) {
            console.log(error);
        };
    };

    return (
        <Fragment>
            <Formik onSubmit={(values, { setSubmitting }) => {
                submitLogin(values)
                setSubmitting(false)
            }}
                initialValues={{ login: '', password: '' }}
                validationSchema={loginSchema}
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
                                        <Form.Label className="label">Login</Form.Label>
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
                                        <Button
                                            variant="mystyle"
                                            size="mysize"
                                            type="submit"
                                            onClick={handleSubmit}
                                            disabled={isSubmitting} >
                                            Login!
                                    </Button>
                                    </Card.Body>
                                    <Card.Footer>You don't have an account? <Link to='/singup'>Create one!</Link></Card.Footer>
                                </Card>
                            </Form>
                        </Styles>
                    )}
            </Formik>
        </Fragment >
    );
};

export default withRouter(withErrorHandler(Login, axios));
