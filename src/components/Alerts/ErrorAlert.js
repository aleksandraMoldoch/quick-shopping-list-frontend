import React from 'react';

import Alert from 'react-bootstrap/Alert';

const errorAlert = (props) => (
    <Alert variant="danger" onClose={props.close} dismissible>
        <Alert.Heading>Error!!</Alert.Heading>
        <div>{props.children}</div>
        <hr />
        <p>Sorry for inconvenience.</p>
    </Alert>)

export default errorAlert;