import React from 'react';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import Styles from './Styles';

const recepie = (props) => (
    <Styles>
        <Card className="card">
            <Card.Img variant="top" src={props.imageUrl} alt="..." className="image" />
            <Card.Body>
                <Card.Title className="name">{props.recepieName}</Card.Title>
                <div className="button-group">
                    <Button variant="mystyle" size="mysize" onClick={props.clickedDetails}>Details</Button>
                    <Button variant="mystyle" size="mysize" onClick={props.clickedAdd}>Add</Button>
                </div>
            </Card.Body>
        </Card>
    </Styles>
);

export default recepie;
