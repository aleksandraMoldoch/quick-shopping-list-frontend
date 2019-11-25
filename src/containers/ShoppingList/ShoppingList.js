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
            column: {
                id: 'column-1'
            }
        };
    };

    componentDidMount = () => {
        this.loadIngredients()
    };

    loadIngredients = async () => {
        try {
            let res = await axios.get('/shopping-list/1')
            if (res.status === 200) {
                this.setState({
                    ingredients: res.data.listIngredient,
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

        try {
            let res = await axios.put('/shopping-list/1', ingredients);
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

        if (isNaN(values.quantity)) {
            let quantityArr = values.quantity.split("/");
            let newQuantity = Number(quantityArr[0]) / Number(quantityArr[1]);
            values.quantity = newQuantity;
        };

        let ingredient = [{
            name: values.ingredientName,
            unit: values.unit,
            quantity: values.quantity
        }]

        try {
            let res = await axios.post('/shopping-list/1', ingredient)
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
        try {
            let res = await axios.delete('/shopping-list/1', { data: { id } });
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
