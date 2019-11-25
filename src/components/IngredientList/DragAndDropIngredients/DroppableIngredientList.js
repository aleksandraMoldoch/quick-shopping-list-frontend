import React from 'react';

import { Droppable } from 'react-beautiful-dnd';
import Ingredient from './DraggableIngredient';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import Styles from '../Styles';

import styled from 'styled-components';

const Container = styled.div`
 { background-color: #F2F2F2;
    font-size: 15px;
    margin-top: 1rem;
    padding: 0 !important;
    font-family: courier, monospace;
    border: 1px solid #dedede;
    position: relative;
    box-shadow: 0 5px 10px -5px rgba(0,0,0,0.5);
    &::before {
      content: "";
      border-left: 1px solid #ffaa9f;
      border-right: 1px solid #ffaa9f;
      width: 2px;
      position: absolute;
      height: 100%;
      left: 8%;
    }`;

const ingredientList = (props) => (
    <Styles>
        <Container>
            <Row className="row justify-content-center">
                <Col xl={2} lg={2} md={2} sm={2} xs={8}>Quantity</Col>
                <Col xl={2} lg={2} md={4} sm={4} xs={8}>Unit</Col>
                <Col xl={4} lg={4} md={4} sm={4} xs={8}>Ingredient</Col>
                <Col xl={1} lg={1} md={2} sm={2} xs={8} />
            </Row>
            <Droppable droppableId={props.droppableId}>
                {provided =>
                    (<div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                    >
                        {props.ingredients.map((ingredient, index) => {
                            let draggableId = ingredient.id.toString();
                            return (<Ingredient
                                key={ingredient.id}
                                index={index}
                                id={draggableId}
                                quantity={ingredient.quantity}
                                unit={ingredient.unit}
                                name={ingredient.name}
                                remove={() => props.remove(ingredient.id)}
                                 />)
                        })}
                        {provided.placeholder}
                    </div>)}
            </Droppable>
        </Container>
    </Styles>
);

export default ingredientList;
