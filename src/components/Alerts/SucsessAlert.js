import React from 'react';
import { Link } from 'react-router-dom';

import Alert from 'react-bootstrap/Alert';

const sucsessAlert = (props) => (
    <Alert variant="success">
        <Alert.Heading>Sucsses!!</Alert.Heading>
        <p>{props.message}</p>
        <div className="d-flex justify-content-end">
            <Link to="/recipes/">
                OK!
                </Link>
        </div>
    </Alert>
);

export default sucsessAlert;