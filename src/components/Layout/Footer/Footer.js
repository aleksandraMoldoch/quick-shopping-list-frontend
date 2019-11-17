import React from 'react';

import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import Styles from './Styles';

const Footer = () => (
    <Styles>
        <Container fluid="true" className="cont">
            <Row className="row justify-content-center">
                <Col>
                <p>Created by: Aleksandra Mołdoch</p>
                    </Col>
            </Row>
        </Container>
    </Styles>
)

export default Footer;