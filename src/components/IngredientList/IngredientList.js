import React from 'react';

import Ingredient from './Ingredient/Ingredient';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import Styles from './Styles';

const ingredientList = (props) => (
    <Styles>
        <div className={props.mystyle==='sl' ? "list" : "list2"}>
                <Row className={props.mystyle==='sl' ? "row justify-content-center" : "row2 justify-content-center"}>
                    <Col xl={2} lg={2} md={2} sm={2} xs={8}>Quantity</Col>
                    <Col xl={2} lg={2} md={4} sm={4} xs={8}>Unit</Col>
                    <Col xl={4} lg={4} md={4} sm={4} xs={8}>Ingredient</Col>
                    <Col xl={1} lg={1} md={2} sm={2} xs={8}/>
                </Row>
                { props.ingredients.map((ingredient, index) => {
                    return (
                        <Ingredient
                            key={index}
                            quantity={ingredient.quantity}
                            unit={ingredient.unit}
                            name={ingredient.name}
                            remove={() => props.remove(index)} />)
                })}
                </div>
        </Styles>
);

export default ingredientList;
