import React, { Component, Fragment } from 'react';
import axios, { URLaddress } from '../../axios';

import Button from 'react-bootstrap/Button';
import Figure from 'react-bootstrap/Figure';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';

import Col from 'react-bootstrap/Col';

import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import SucsessAlert from '../../components/Alerts/SucsessAlert';
import InfoAlert from '../../components/Alerts/InfoAlert';
import Spinner from '../../assest/Spinner';
import NewRecipe from '../../containers/NewRecipe/NewRecipe';
import IngredientList from '../../components/IngredientList/IngredientList';

import Styles from './Styles';

class RecipeDetails extends Component {

    state = {
        recipe: [],
        newIngredient: {
            quantity: "",
            unit: "",
            name: ""
        },
        edite: false,
        deleted: false,
        add: false,
        error: null
    };

    componentDidMount() {
        this.loadData();
    };

    loadData() {
        if (!this.state.recipe || (this.state.recipe && this.state.recipe.id !== +this.props.match.params.id)) {
            window.scrollTo({ top: 0 })
            axios.get('/recipe/' + this.props.match.params.id)
                .then(res => {
                    if (!res) {
                        throw new Error('Faild to fetch recipe');
                    }
                    this.setState({ recipe: res.data.recipe });
                })
                .catch(error => {
                    console.log(error)
                });
        };
    };

    deleteRcepieHandler = async () => {
        const userId = localStorage.getItem('userId');
        const token = localStorage.getItem('token');

        if (!userId || !token) {
            throw new Error('You are not authorized to perform this operation.');
        };

        try {
            let res = await axios.delete('/recipe/' + this.props.match.params.id, {
                headers: {
                    'Authorization': 'Bearer ' + token
                },
                data: {
                    userId
                }
            })
            if (res.status !== 200 && res.status !== 201) {
                throw new Error('Deleting post failed!');
            };
            this.setState({
                recipe: [],
                deleted: true
            });
        }
        catch (error) {
            console.log(error)
        }
    };

    addToShoppingListHandler = async () => {
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId');
        const ingredients = this.state.recipe.ingredients;
        const config = {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        };

        const data = {
            ingredients: ingredients,
            userId: userId
        }

        try {
            if (userId === null || token === null) {
                throw new Error('You must be logged in to perform this operation.');
            }
            let res = await axios.post('/shopping-list/' + userId, data, config);
            if (res.status !== 200) {
                throw new Error('Posting new ingredient failed.');
            }
            this.showAlert()
        }
        catch (error) {
            console.log(error);
            this.setState({ error: error }, () => {
                window.setTimeout(() => {
                    this.setState({ error: null })
                }, 2000)
            });
        }
    };

    showAlert = () => {
        this.setState({ add: true }, () => {
            window.setTimeout(() => {
                this.setState({ add: false })
            }, 1500)
        });
    };

    editeHandler = () => {
        const userId = localStorage.getItem('userId');
        const token = localStorage.getItem('token');

        if (!userId || !token) {
            throw new Error('You are not authorized to perform this operation.');
        }

        this.setState({ edite: true });
    };

    render() {
        const userId = localStorage.getItem('userId');
        let userCheck = (this.state.recipe.userId == userId);

        return (
            <Fragment>
                <Styles>
                    {this.state.error ? <InfoAlert message={'You must be logged in to add ingredients'} /> : null}
                    {!this.state.edite ? <Container className="justify-content-center">
                        {this.state.deleted ? <SucsessAlert message={'You successfully deleted recipe.'} destination={'/'} /> :
                            <Row className="justify-content-center">
                                {this.state.add ? <InfoAlert message={'Added to shopping list.'} /> : null}
                                {this.state.recipe.imageUrl ?
                                    <Col lg={4}>
                                        <Figure.Image
                                            src={URLaddress + '/images/' + this.state.recipe.imageUrl}
                                        />
                                    </Col>
                                    : <Spinner />}
                                <Col lg={{ span: 6, offset: 1 }} >
                                    <Row className="name">
                                        {this.state.recipe.recipeName}
                                    </Row>
                                    <Row>
                                        <Card.Link className="link" href="https://www.kwestiasmaku.com/pasta/makaron_carbonara/przepis.html">Go to recipe!</Card.Link>
                                    </Row>
                                    <Row>
                                        <Button variant="mystyle" size="mysize" onClick={() => this.addToShoppingListHandler()}>Add to shopping list</Button>
                                    </Row>
                                    {userCheck ? <Row>
                                        <Button variant="mystyle" size="mysize" onClick={this.editeHandler}>Edit</Button>
                                        <Button variant="mystyle" size="mysize" onClick={this.deleteRcepieHandler}>Delete</Button>
                                    </Row> : null}
                                </Col>
                                <Col lg={11} >
                                    <Row className="name" style={{ fontSize: '25px' }}>Ingredients list:</Row>
                                    {this.state.recipe.ingredients ?
                                        <IngredientList ingredients={this.state.recipe.ingredients} mystyle={'other'} />
                                        : <Spinner />}
                                </Col> </Row>}
                    </Container> :
                        <NewRecipe
                            imageUrl={this.state.recipe.imageUrl}
                            recipeName={this.state.recipe.recipeName}
                            ingredients={this.state.recipe.ingredients}
                            id={this.state.recipe.id} />}
                </Styles>
            </Fragment >
        );
    };
};

export default withErrorHandler(RecipeDetails, axios);
