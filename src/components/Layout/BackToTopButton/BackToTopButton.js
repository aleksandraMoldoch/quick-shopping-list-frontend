import React, { Component, Fragment } from 'react';

import styled from 'styled-components';

const Button = styled.button`
{
    position: sticky;
    float: right;
    bottom: 0.5rem;
    right: 0.5rem
    border: none;
    width:50px;
    height:50px;
    font-size: 25px;
    background-color: transparent;
    color:white;
    &:hover{
        background-color: #395385;
    }
}
`
class BackToTopButton extends Component {
    state = {
        displayButton: false,
        scrollPosition: 0
    };

    handleScroll = (e) => {
        this.setState({
            scrollPosition: window.pageYOffset
        }, this.checkScroll)
    };

    checkScroll = () => {
        if (this.state.scrollPosition > 100) {
            this.setState({
                displayButton: true
            })
        }
        else {
            this.setState({
                displayButton: false
            })
        }
    }

    handleScrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    render() {
        return (
            <Fragment>
                {window.addEventListener("scroll", this.handleScroll)}
                {this.state.displayButton ?
                    <Button onClick={this.handleScrollToTop}><i className="fa fa-angle-up"></i></Button>: null}
            </Fragment>
        );
    };
};

export default BackToTopButton;
