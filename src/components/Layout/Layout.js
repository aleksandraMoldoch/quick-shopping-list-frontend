import React from 'react';
import styled from 'styled-components';

import NavigationBar from './/NavigationBar/NavigationBar';
import Footer from './Footer/Footer';
import BackToTopButton from './BackToTopButton/BackToTopButton';

import Container from 'react-bootstrap/Container';

const Styles = styled.div`
    .container{
        background-color: #4367A8;
        margin-top: 2.5rem;
        min-height: 600px;
    }
`;

const Layout = (props) => (
<Styles>
<NavigationBar />
    <Container className="container">
        {props.children}
    </Container>
    <BackToTopButton/>
<Footer/>
    </Styles>
);

export default Layout;
