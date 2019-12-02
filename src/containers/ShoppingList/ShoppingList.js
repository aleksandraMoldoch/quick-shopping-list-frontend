import React, { Component, Fragment } from 'react';
import axios from '../../axios';

import IngredientList from '../../components/IngredientList/DragAndDropIngredients/DroppableIngredientList';
import NewIngredient from '../../components/NewIngredient/NewIngredient';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

import { DragDropContext } from 'react-beautiful-dnd';
import Row from 'react-bootstrap/Row';

import Styles from './Styles';

class ShoppingList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            ingredients: [],
            shoppingListId: null,
            column: {
                id: 'column-1'
            }
        };
    };

    componentDidMount = () => {
        this.loadIngredients()
    };

    loadIngredients = async () => {
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId');
        const config = {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        };

        try {
            let res = await axios.get(
                '/shopping-list/' + userId, config)
            if (res.status === 200) {
                this.setState({
                    ingredients: res.data.listIngredient,
                    shoppingListId: res.data.shoppingListId
                });
            } else {
                throw new Error('Unable to fetch ingredients list.');
            }
        } catch (error) {
            console.log(error);
        };
    };

    onDragEnd = async result => {
        const { destination, source } = result;

        if (!destination) { return }

        if (destination.droppableId === source.droppableId &&
            destination.index === source.index) { return }

        const newIngredients = Array.from(this.state.ingredients);
        newIngredients.splice(destination.index, 0, newIngredients.splice(source.index, 1)[0]);

        let ingredients = [];

        if (destination.index > source.index) {

            let changedIngredients = this.state.ingredients.slice(source.index + 1, destination.index + 1);
            changedIngredients.map(ingredient => {
                ingredients.push({
                    id: ingredient.id,
                    orderId: ingredient.orderId - 1
                });
            });

            let changedIngredient = this.state.ingredients.slice(source.index, source.index + 1);

            ingredients.push({
                id: changedIngredient[0].id,
                orderId: changedIngredient[0].orderId + (destination.index - source.index)
            });

        } else {

            let changedIngredients = this.state.ingredients.slice(destination.index, source.index);

            changedIngredients.map(ingredient => {
                ingredients.push({
                    id: ingredient.id,
                    orderId: ingredient.orderId + 1
                });
            });

            let changedIngredient = this.state.ingredients.slice(source.index, source.index + 1);

            ingredients.push({
                id: changedIngredient[0].id,
                orderId: changedIngredient[0].orderId - (source.index - destination.index)
            });
        }

        this.setState({
            ingredients: newIngredients
        });
        const token = localStorage.getItem('token');

        const config = {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        };

        try {
            let res = await axios.put('/shopping-list/' + this.state.shoppingListId, ingredients, config);
            if (res.status === 200) {
                this.loadIngredients();
            } else {
                throw new Error('Unable to update ingredients order.');
            }
        } catch (err) {
            console.log(err);
        };
    };

    addNewIngredientHandler = async (values) => {
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId');

        const config = {
            headers:
                { 'Authorization': 'Bearer ' + token }
        };

        if (isNaN(values.quantity)) {
            let quantityArr = values.quantity.split("/");
            let newQuantity = Number(quantityArr[0]) / Number(quantityArr[1]);
            values.quantity = newQuantity;
        };

        let ingredient = [{
            name: values.ingredientName,
            unit: values.unit,
            quantity: values.quantity
        }];

        const data = { ingredients: ingredient, userId: userId }

        try {
            let res = await axios.post('/shopping-list/' + userId, data, config)
            if (res.status === 200) {
                this.loadIngredients()
            } else {
                throw new Error('Unable to add new ingredient.');
            }
        } catch (err) {
            console.log(err);
        };
    };

    removeIngredientHandler = async (id) => {
        const token = localStorage.getItem('token');

        try {
            let res = await axios.delete('/shopping-list/' + this.state.shoppingListId, {
                headers: {
                    'Authorization': 'Bearer ' + token
                },
                data: { id }
            });
            if (res.status !== 200) {
                throw new Error('Unable to delete ingredient.');
            }
            this.loadIngredients()
        } catch (err) {
            console.log(err)
        };
    };

    render() {
        return (
            <Fragment>
                <Styles>
                    <Row className="name">Your shopping list:</Row>
                    <DragDropContext onDragEnd={this.onDragEnd}>
                        <IngredientList
                            droppableId={'column-1'}
                            key={'column-1'}
                            ingredients={this.state.ingredients}
                            remove={this.removeIngredientHandler} />
                    </DragDropContext>
                    <NewIngredient submitAddIngredient={this.addNewIngredientHandler} />
                </Styles>
            </Fragment>
        );
    };
};

export default withErrorHandler(ShoppingList, axios);
