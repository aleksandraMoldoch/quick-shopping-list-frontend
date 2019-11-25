import React from 'react';
import { Draggable } from 'react-beautiful-dnd';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import styled from 'styled-components';
import Styles from '../Styles';

const ButtonDelete = styled.button`
    background-color: #FF3428;
    border: none;
    color: white;
    padding: 6px 9px;
    font-size: 10px;
    border-radius:3px;
	display:inline-block;
    cursor: pointer;
  :hover {
    background-color: #DB3428;
    color: white;
  }
`;

const ingredient = (props) => (
    <Styles>
        <Draggable draggableId={props.id} index={props.index}>
            {provided => (
                <Row
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                    className="shopping-list-row justify-content-center"
                >
                    <Col xl={2} lg={2} md={2} sm={2} xs={8}>{props.quantity}</Col>
                    <Col xl={2} lg={2} md={4} sm={4} xs={8}>{props.unit}</Col>
                    <Col xl={4} lg={4} md={4} sm={4} xs={8}>{props.name}</Col>
                    <Col xl={1} lg={1} md={2} sm={2} xs={8}>
                        <ButtonDelete className="btn" title='delete ingredient' type="button" onClick={props.remove}><i className="fa fa-close"></i></ButtonDelete>
                    </Col>
                </Row>
            )}
        </Draggable>
    </Styles>
);

export default ingredient;
