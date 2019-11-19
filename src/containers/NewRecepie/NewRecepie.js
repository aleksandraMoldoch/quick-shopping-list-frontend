import React, { Component, Fragment } from 'react';

import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import { Formik, Field } from 'formik';

import axios from '../../axios';
import SucsessAlert from '../../components/Alerts/SucsessAlert';
import IngredientList from '../../components/IngredientList/IngredientList';
import NewIngredient from '../../components/NewIngredient/NewIngredient';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

import RecepieSchema from '../NewRecepie/RecepieSchema';
import ImageInput from '../NewRecepie/ImageInput';

import Styles from './Styles';

class NewRecepie extends Component {
    constructor(props) {
        super(props);

        this.state = {
            ingredients: props.ingredients || [],
            newIngredient: {
                quantity: "",
                unit: "",
                name: ""
            },
            recepieName: props.recepieName || "",
            image: props.imageUrl,
            completed: false
        };
    };

    addNewRecepieHandler = (values) => {
        const formData = new FormData();
        const ingredients = this.state.ingredients;

        const config = { headers: { 'content-type': 'multipart/form-data' } };

        formData.append('image', values.image);
        formData.append('recepieName', values.recepieName);
        ingredients.map((ingredient) => {
            return formData.append('ingredients[]', JSON.stringify(ingredient));
        });

        axios.post('/recepie/', formData, config)
            .then(res => {
                if (!res) {
                    throw new Error('Error');
                }
                this.setState({ completed: true });
                window.scrollTo({
                    top: 0
                });
            })
            .catch(error => {
                console.log(error);
            });
    };

    updateRecepieHandler = (values) => {

        const formData = new FormData();
        const ingredients = this.state.ingredients;

        const config = { headers: { 'content-type': 'multipart/form-data' } };

        formData.append('image', values.image);
        formData.append('recepieName', values.recepieName);
        ingredients.map((ingredient) => {
            return formData.append('ingredients[]', JSON.stringify(ingredient));
        });

        axios.put('/recepie/' + this.props.id, formData, config)
            .then((res) => {
                if (!res) {
                    throw new Error('Error');
                }
                this.setState({ completed: true });
            })
            .catch(error => {
                console.log(error);
            });

        window.scrollTo({
            top: 0
        });
    };

    addNewIngredientHandler = (values) => {
        const ingredients = [...this.state.ingredients];
        let change = false;

        if (isNaN(values.quantity)) {
            let quantityArr = values.quantity.split("/");
            let newQuantity = Number(quantityArr[0]) / Number(quantityArr[1]);
            values.quantity = newQuantity;
        };

        ingredients.map((ingredient) => {
            if (ingredient.name === values.ingredientName && ingredient.unit === values.unit) {
                ingredient.quantity = Number(ingredient.quantity) + Number(values.quantity);
                change = true;
            }
            return ingredient;
        });

        if (!change) {
            this.setState({
                newIngredient: {
                    quantity: values.quantity,
                    unit: values.unit,
                    name: values.ingredientName
                }
            })
            ingredients.push({ ...this.state.newIngredient });
        };

        this.setState({
            ingredients: ingredients,
            newIngredient: {
                quantity: "",
                unit: "",
                name: ""
            }
        });
    };

    removeIngredientHandler = (index) => {
        const ingredients = [...this.state.ingredients];
        ingredients.splice(index, 1);
        this.setState({ ingredients: ingredients });
    };

    render() {
        return (
            <Fragment>
                <Styles>
                    {this.state.completed ? <SucsessAlert message={'Pomyślnie dodano nowy przepis'} /> :
                        <div as={Col} className="cont justify-content-center">
                            <Formik validationSchema={RecepieSchema}
                                initialValues={{ recepieName: this.state.recepieName, image: this.state.image }}
                                onSubmit={(values, { setSubmitting }) => {
                                    !this.props.id ? this.addNewRecepieHandler(values) : this.updateRecepieHandler(values)
                                    setSubmitting(false)
                                }}>
                                {({ values,
                                    errors,
                                    touched,
                                    handleChange,
                                    handleBlur,
                                    handleSubmit,
                                    setFieldValue,
                                    isSubmitting }) => (
                                        <Form onSubmit={handleSubmit} >
                                            <Button className="button" variant="primary" type="submit" active={!errors}>Save recepie!</Button>
                                            <Form.Group as={Col} lg={9} controlId="recepieName">
                                                <Form.Label className="label">Recepie name</Form.Label>
                                                <Form.Control
                                                    type="string"
                                                    name="recepieName"
                                                    placeholder="Recepie name"
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values.recepieName}
                                                    isInvalid={touched.recepieName && !!errors.recepieName}
                                                />
                                                <Form.Control.Feedback className="feedback" type="invalid">
                                                    {errors.recepieName}
                                                </Form.Control.Feedback>
                                            </Form.Group>
                                            <Field
                                                name="image"
                                                component={ImageInput}
                                                title="Select a file"
                                                setFieldValue={setFieldValue}
                                                imagePreview={this.state.image}
                                                errorMessage={errors["image"] ? errors["image"] : undefined}
                                                touched={touched["image"]}
                                                onBlur={handleBlur}
                                            />
                                            {this.state.ingredients.length === 0 ? null :
                                                <div className="div"><Form.Label className="label">Ingredients list</Form.Label>
                                                    <IngredientList
                                                        mystyle={'other'}
                                                        ingredients={this.state.ingredients}
                                                        remove={this.removeIngredientHandler} /></div>}
                                        </Form>
                                    )}
                            </Formik>
                            <NewIngredient submitAddIngredient={this.addNewIngredientHandler} /></div>}
                </Styles>
            </Fragment>
        );
    };
};

export default withErrorHandler(NewRecepie, axios);
