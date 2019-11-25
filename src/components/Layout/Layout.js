import React, { Fragment } from 'react';
import styled from 'styled-components';

import NavigationBar from './/NavigationBar/NavigationBar';
import Footer from './Footer/Footer';
import BackToTopButton from './BackToTopButton/BackToTopButton';

import Container from 'react-bootstrap/Container';

const Styles = styled.div`
    .main-container{
        background-color: #4367A8;
        margin-top: 2rem;
        min-height: 600px;
    }
`;

const Layout = (props) => (
    <Fragment>
        <Styles>
            <NavigationBar />
            <Container className="main-container">
                {props.children}
            </Container>
            <BackToTopButton />
        </Styles>
        <Footer />
    </Fragment>
);

export default Layout;
