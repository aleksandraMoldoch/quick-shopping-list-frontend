import React, { Component } from 'react';

import axios, { URLaddress } from '../../axios';

import Recipe from '../../components/Recipe/Recipe';
import Spinner from '../../assest/Spinner';
import InfoAlert from '../../components/Alerts/InfoAlert';

import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

import CardDeck from 'react-bootstrap/CardDeck';

class RecipesList extends Component {

    state = {
        recipes: [],
        add: false,
        error: null
    }

    componentDidMount() {
        this.loadRecipesList();
    };

    recipeSelectedHandler = (id) => {
        this.props.history.push('/recipes/' + id);
    };

    loadRecipesList = () => {
        axios.get('/recipes/')
            .then(res => {
                if (!res) {
                    throw new Error('Could not get recipes.');
                }
                this.setState({ recipes: res.data.recipes });
            })
            .catch(error => {
                console.log(error);
            });
    };

    addToShoppingList = async (ingredients) => {
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId');

        const config = {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        };

        const data = { ingredients }
        try {
            if (userId === null || token === null) {
                throw new Error('You must be logged in to perform this operation.');
            }
            let res = await axios.post('/shopping-list/' + userId, data, config)

            if (!res) {
                throw new Error('Posting new ingredient failed.');
            }
            this.showAlert()
        } catch (error) {
            console.log(error)
            this.setState({ error: error }, () => {
                window.setTimeout(() => {
                    this.setState({ error: null })
                }, 2000)
            });
        };
    };

    showAlert = () => {
        this.setState({ add: true }, () => {
            window.setTimeout(() => {
                this.setState({ add: false })
            }, 1500)
        });
    };


    renderRecipeHandler = () => {
        return (
            <CardDeck className="justify-content-center">
                {this.state.recipes.map((recipe) => {
                    const { id, imageUrl, recipeName, ingredients } = recipe
                    return (
                        <Recipe
                            key={id}
                            imageUrl={URLaddress + '/images/' + imageUrl}
                            recipeName={recipeName}
                            clickedDetails={() => this.recipeSelectedHandler(id)}
                            clickedAdd={() => this.addToShoppingList(ingredients)}
                        />);
                })}
            </CardDeck>
        );
    };

    render() {
        return (
            <React.Fragment>
                {this.state.error ? <InfoAlert message={'You must be logged in to add ingredients to shopping list.'} /> : null}
                {this.state.add ? <InfoAlert message={'Added to shopping list.'} /> : null}
                {this.state.recipes ? this.renderRecipeHandler() : <Spinner />}
            </React.Fragment>
        );
    };
};

export default withErrorHandler(RecipesList, axios);
