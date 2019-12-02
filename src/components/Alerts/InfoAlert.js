import React from 'react';

import Alert from 'react-bootstrap/Alert';

const infoAlert = (props) => (
    <Alert variant='warning'>
        {props.message}
    </Alert>
);

export default infoAlert;
