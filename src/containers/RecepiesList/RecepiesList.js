import React, { Component } from 'react';

import axios from '../../axios';

import Recepie from '../../components/Recepie/Recepie';
import Spinner from '../../assest/Spinner';
import InfoAlert from '../../components/Alerts/InfoAlert';

import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

import CardDeck from 'react-bootstrap/CardDeck';

class RecepiesList extends Component {

    state = {
        recepies: [],
        add: false
    }

    componentDidMount() {
        this.loadRecepiesList();
    };

    recepieSelectedHandler = (id) => {
        this.props.history.push('/recepies/' + id);
    };

    loadRecepiesList = () => {
        axios.get('/recepies/')
            .then(res => {
                if (!res) {
                    throw new Error('BŁĄD');
                }
                this.setState({ recepies: res.data.recepies });
            })
            .catch(error => {
                console.log(error.response);
            });
    };

    addToShoppingList = (ingredients) => {
        axios.post('/shopping-list', ingredients)
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

    renderRecepieHandler = () => {
        return (
            <CardDeck className="justify-content-center">
                {this.state.recepies.map((recepie) => {
                    const { id, imageUrl, recepieName, ingredients } = recepie
                    return (
                        <Recepie
                            key={id}
                            imageUrl={'http://aleksandramoldoch.com:8080/images/' + imageUrl}
                            recepieName={recepieName}
                            clickedDetails={() => this.recepieSelectedHandler(id)}
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
                {this.state.recepies ? this.renderRecepieHandler() : <Spinner />}
            </React.Fragment>
        );
    };
};

export default withErrorHandler(RecepiesList, axios);
