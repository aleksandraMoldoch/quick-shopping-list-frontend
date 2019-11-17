import React, { Component, Fragment } from 'react';
import axios from '../../axios';

import IngredientList from '../../components/IngredientList/IngredientList';
import NewIngredient from '../../components/NewIngredient/NewIngredient';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';

import Styles from './Styles';

class ShoppingList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            ingredients: [],
            newIngredient: {
                quantity: "",
                unit: "",
                name: ""
            },
            edite: false
        };
    };

    componentDidMount = () => {
       this.loadIngredients()
    };

    loadIngredients = () =>{
        axios.get('/shopping-list/')
        .then(res => {
            this.setState({ ingredients: res.data.listIngredient });
        })
        .catch(error => {
            console.log(error);
        });
    };

    saveShoppingListHandler = () => {
        this.setState({
            edite: false
        });

        if(!this.state.ingredients){
            throw new Error('BRAK SKŁADNIKÓW');
        }else{
        axios.post('/shoppinglist/', this.state.ingredients)
            .then((res) => {
                if (res.status !== 200) {
                    throw new Error('BŁĄD');
                }
                this.setState({ completed: true });
            })
            .catch(this.catchError)}
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

    editeHandler = () =>{
        this.setState({
            edite: true
        });
    };

    render() {
        return (
            <Fragment>
                <Styles>
                <Row className="name">Your shopping list:</Row>
                {this.state.ingredients ?
                    <IngredientList
                    ingredients={this.state.ingredients}
                    mystyle={'sl'}
                    remove={this.removeIngredientHandler} />
                    : <div className="spinner-border text-primary" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>}
                <Row style={{margin:'1rem'}}>
                {!this.state.edite ? <Button variant="mystyle" size="mysize" onClick={this.editeHandler}>Edit Shopping List</Button> : null}
                    <Button variant="mystyle" size="mysize">Save Shopping List</Button>
                </Row>
                {this.state.edite ? <NewIngredient submitAddIngredient={this.addNewIngredientHandler}/> : null}
                </Styles>
            </Fragment>
        );
    };
};

export default withErrorHandler(ShoppingList, axios);
