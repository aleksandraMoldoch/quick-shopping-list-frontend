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
        add: false
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
                    throw new Error('BŁĄD');
                }
                this.setState({ recipes: res.data.recipes });
            })
            .catch(error => {
                console.log(error.response);
            });
    };

    addToShoppingList = (ingredients) => {
        axios.post('/shopping-list/1', ingredients)
            .then(res => {
                if (!res) {
                    throw new Error('BŁĄD');
                }
                this.showAlert()
            })
            .catch(this.catchError);
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
                {this.state.add ? <InfoAlert /> : null}
                {this.state.recipes ? this.renderRecipeHandler() : <Spinner />}
            </React.Fragment>
        );
    };
};

export default withErrorHandler(RecipesList, axios);
