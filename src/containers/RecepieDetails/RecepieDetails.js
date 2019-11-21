import React, { Component, Fragment } from 'react';
import axios from '../../axios';

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
import NewRecepie from '../../containers/NewRecepie/NewRecepie';
import IngredientList from '../../components/IngredientList/IngredientList';

import Styles from './Styles';

class RecepieDetails extends Component {

    state = {
        recepie: [],
        newIngredient: {
            quantity: "",
            unit: "",
            name: ""
        },
        edite: false,
        deleted: false,
        add: false
    };

    componentDidMount() {
        this.loadData();
    };

    loadData() {
        if (!this.state.recepie || (this.state.recepie && this.state.recepie.id !== +this.props.match.params.id)) {
            window.scrollTo({ top: 0 })
            axios.get('/recepie/' + this.props.match.params.id)
                .then(res => {
                    if (!res) {
                        console.log('Faild to fetch')
                        throw new Error('Faild to fetch recepie');
                    }
                    this.setState({ recepie: res.data.recepie });
                })
                .catch(error => {
                    console.log(error)
                });
        };
    };

    deleteRcepieHandler = () => {
        axios.delete('/recepie/' + this.props.match.params.id)
            .then(res => {
                if (res.status !== 200 && res.status !== 201) {
                    throw new Error('Deleting post failed!');
                }
                this.setState({
                    recepie: [],
                    deleted: true
                });
            })
            .catch(this.catchError);
    };

    addToShoppingListHandler = () => {
        const ingredients = this.state.recepie.ingredients;
        axios.post('/shopping-list/1', ingredients)
            .then((res) => {
                if (res.status !== 200) {
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

    editeHandler = () => {
        this.setState({ edite: true });
    };

    render() {
        return (
            <Fragment>
                <Styles>
                    {!this.state.edite ? <Container className="justify-content-center">
                        {this.state.deleted ? <SucsessAlert message={'You successfully deleted recepie.'} /> :
                            <Row className="justify-content-center">
                                {this.state.add ? <InfoAlert /> : null}
                                {this.state.recepie.imageUrl ?
                                    <Col lg={4}>
                                        <Figure.Image
                                            src={'http://aleksandramoldoch.com:8080/images/' + this.state.recepie.imageUrl}
                                        />
                                    </Col>
                                    : <Spinner />}
                                <Col lg={{ span: 6, offset: 1 }} >
                                    <Row className="name">
                                        {this.state.recepie.recepieName}
                                    </Row>
                                    <Row>
                                        <Card.Link className="link" href="https://www.kwestiasmaku.com/pasta/makaron_carbonara/przepis.html">Go to recepie!</Card.Link>
                                    </Row>
                                    <Row>
                                        <Button variant="mystyle" size="mysize" onClick={() => this.addToShoppingListHandler()}>Add to shopping list</Button>
                                    </Row>
                                    <Row>
                                        <Button variant="mystyle" size="mysize" onClick={this.editeHandler}>Edit</Button>
                                        <Button variant="mystyle" size="mysize" onClick={this.deleteRcepieHandler}>Delete</Button>
                                    </Row>
                                </Col>
                                <Col lg={11} >
                                    <Row className="name" style={{ fontSize: '25px' }}>Ingredients list:</Row>
                                    {this.state.recepie.ingredients ?
                                        <IngredientList ingredients={this.state.recepie.ingredients} mystyle={'other'} />
                                        : <Spinner />}
                                </Col> </Row>}
                    </Container> :
                        <NewRecepie
                            imageUrl={this.state.recepie.imageUrl}
                            recepieName={this.state.recepie.recepieName}
                            ingredients={this.state.recepie.ingredients}
                            id={this.state.recepie.id} />}
                </Styles>
            </Fragment >
        );
    };
};

export default withErrorHandler(RecepieDetails, axios);
