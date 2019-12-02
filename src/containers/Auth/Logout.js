import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';

import { useAuth } from '../../context/auth';

const Logout = () => {
    const { setAuthTokens } = useAuth();

    useEffect(() => {
        logoutHandler()
    });

    const logoutHandler = () => {
        setAuthTokens(null)
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
    };
    return (
        <Redirect to="/" />
    )
};

export default Logout;
