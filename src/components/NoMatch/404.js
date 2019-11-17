import React from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import styled from 'styled-components';

const Styles = styled.div`
.titel{
    font-family: 'Kanit', sans-serif;
    font-size: 100px;
}
.text{
    font-family: 'Kanit', sans-serif;
    font-size: 40px;
}
`;

const Footer = () => (
    <Styles>
        <Container fluid="true" className="justify-content-center">
            <Row>
                <p className="titel">404 Error</p>
            </Row>
            <Row>
                <p className="text">Page not found</p>
            </Row>
        </Container>
    </Styles>
)

export default Footer;
