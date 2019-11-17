import React, { Component } from 'react';

import ErrorAlert from '../../components/Alerts/ErrorAlert';

const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {
        constructor(props) {
            super(props)
            this.state = {
                error: null
            }
            this.reqInterceptor = axios.interceptors.request.use(req => {
                this.setState({ error: null });
                return req;
            });
            this.resInterceptor = axios.interceptors.response.use(res => res, error => {
                if (error.response.status === 404) {
                    return this.props.history.push(`/404`);
                }
                this.setState({ error: error });
            });
        };

        componentWillUnmount() {
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.resInterceptor);
        };

        errorConfirmedHandler = () => {
            this.setState({ error: null });
        };

        render() {
            return (
                <React.Fragment >
                    {this.state.error ? <ErrorAlert show={this.state.error}
                        close={this.errorConfirmedHandler}>
                        <p>{this.state.error.message}</p>
                        <p>{this.state.error.response.data.message}</p>
                    </ErrorAlert> : null}
                    <WrappedComponent {...this.props} />
                </React.Fragment>
            );
        };
    };
};

export default withErrorHandler;
