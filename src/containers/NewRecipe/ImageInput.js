import React, { Component, Fragment } from "react";

import {URLaddress} from '../../axios';

import Form from 'react-bootstrap/Form';
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";

import styled from 'styled-components';

const Styles = styled.div`
.input{
    display: none;
}
.label {
    background-color: #1C325C;
    border: 1px solid #B39974;
    font-size: 18px;
    display: inline-block;
    margin-top: 1rem;
    padding: 4px 10px;
    cursor: pointer;
}
.label:hover {
      background-color: #395385;
    }
.preview{
    padding: 15px;
}
.feedback{
        color: #F55D7E;
    }
  `

class ImageInput extends Component {
    constructor(props) {
        super(props);
        this.handleImageChange = this.handleImageChange.bind(this);
        this.state = {
            imagePreviewUrl: props.imagePreview || '',
            changed: false
        }
    }

    handleImageChange(e) {
        e.preventDefault();

        let file = e.target.files[0];
        let reader = new FileReader();

        reader.onloadend = () => {
            this.setState({
                imagePreviewUrl: reader.result,
                changed: true
            });
        };

        reader.readAsDataURL(file)

        if (file) {
            this.props.setFieldValue(this.props.field.name, file);
        };
    };

    render() {
        const { errorMessage } = this.props;
        const { name } = this.props.field;
        let imagePreview = '';

        if (this.props.imagePreview && !this.state.changed) {
            imagePreview = URLaddress +'/images/' + this.state.imagePreviewUrl;
        } else {
            imagePreview = this.state.imagePreviewUrl
        };
        return (
            <Fragment>
                <Styles>
                    <div className="preview">
                        {(this.state.imagePreviewUrl && !errorMessage) ?
                            <Image width="200" src={imagePreview} rounded />
                            : <i className="fa fa-camera fa-2x" width="100" />}
                    </div>
                    <Form.Group as={Col} lg={8} controlId="image">
                        <Form.Label className="label"><i className="fa fa-upload" /> Choose image</Form.Label>
                        <Form.Control
                            className="input"
                            name={name}
                            type="file"
                            isInvalid={!!errorMessage}
                            onChange={this.handleImageChange}
                        />
                        <Form.Control.Feedback className="feedback" type="invalid">
                            {errorMessage}
                        </Form.Control.Feedback>
                    </Form.Group>
                </Styles>
            </Fragment>
        );

    };
};

export default ImageInput;
