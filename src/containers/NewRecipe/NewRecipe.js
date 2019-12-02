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

import RecipeSchema from '../NewRecipe/RecipeSchema';
import ImageInput from '../NewRecipe/ImageInput';

import Styles from './Styles';

class NewRecipe extends Component {
    constructor(props) {
        super(props);

        this.state = {
            ingredients: props.ingredients || [],
            newIngredient: {
                quantity: "",
                unit: "",
                name: ""
            },
            recipeName: props.recipeName || "",
            image: props.imageUrl,
            completed: false,
            edit: false
        };
    };

    addNewRecipeHandler = (values) => {
        const formData = new FormData();
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId');
        const ingredients = this.state.ingredients;

        const config = {
            headers: {
                'content-type': 'multipart/form-data',
                'Authorization': 'Bearer ' + token
            }
        };

        formData.append('image', values.image);
        formData.append('recipeName', values.recipeName);
        formData.append('userId', userId);

        ingredients.map((ingredient) => {
            return formData.append('ingredients[]', JSON.stringify(ingredient));
        });

        axios.post('/recipe/', formData, config)
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

    updateRecipeHandler = (values) => {
        const userId = localStorage.getItem('userId');
        const token = localStorage.getItem('token');
        const formData = new FormData();
        const ingredients = this.state.ingredients;

        const config = {
            headers: {
                'content-type': 'multipart/form-data',
                'Authorization': 'Bearer ' + token
            }
        };

        if (!userId || !token) {
            throw new Error('You are not authorized to perform this operation.');
        }

        formData.append('image', values.image);
        formData.append('recipeName', values.recipeName);
        formData.append('userId', userId);
        ingredients.map((ingredient) => {
            return formData.append('ingredients[]', JSON.stringify(ingredient));
        });

        axios.put('/recipe/' + this.props.id, formData, config)
            .then((res) => {
                if (!res) {
                    throw new Error('Error');
                }
                this.setState({
                    completed: true,
                    edit: true
                });
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
                    {(this.state.edit & this.state.completed) ?
                        <SucsessAlert message={'Changes added successfully'} destination={'/recipes/'} />
                        : null}
                    {(this.state.completed & !this.state.edit) ? <SucsessAlert message={'Added new recipe successfully'} destination={'/recipes/'} /> :
                        <div as={Col} className="cont justify-content-center">
                            <Formik validationSchema={RecipeSchema}
                                initialValues={{ recipeName: this.state.recipeName, image: this.state.image }}
                                onSubmit={(values, { setSubmitting }) => {
                                    !this.props.id ? this.addNewRecipeHandler(values) : this.updateRecipeHandler(values)
                                    setSubmitting(false)
                                }}>
                                {({ values,
                                    errors,
                                    touched,
                                    handleChange,
                                    handleBlur,
                                    handleSubmit,
                                    setFieldValue }) => (
                                        <Form onSubmit={handleSubmit} >
                                            <Button className="button" variant="primary" type="submit" active={!errors}>Save recipe!</Button>
                                            <Form.Group as={Col} lg={9} controlId="recipeName">
                                                <Form.Label className="label">Recipe name</Form.Label>
                                                <Form.Control
                                                    type="string"
                                                    name="recipeName"
                                                    placeholder="Recipe name"
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values.recipeName}
                                                    isInvalid={touched.recipeName && !!errors.recipeName}
                                                />
                                                <Form.Control.Feedback className="feedback" type="invalid">
                                                    {errors.recipeName}
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

export default withErrorHandler(NewRecipe, axios);
