import React, { Component } from 'react';

import Modal from '../../components/UI/Modal/Modal';

import Aux from '../Auxi/auxi'




const withErrorHandler = (WrappedComponent, axios) => {

    return class extends Component {

        state = {
            error: null
        }

        // constructor() {
        //     super();
        //     axios.interceptors.request.use(req => {
        //         this.setState({ error: null })
        //         return req
        //     })

        //     // returning interceptors is necessary
        //     axios.interceptors.response.use(res => res, error => {
        //         this.setState({ error: error })
        //     })
        // }

        // use constructors
        componentWillMount() {

            axios.interceptors.request.use(req => {
                this.setState({ error: null })
                return req
            })

            // returning interceptors is necessary
            axios.interceptors.response.use(res => res, error => {
                this.setState({ error: error })
            })
        }

        //old Method to remove interceptors
        // componentWillUnmount() {

        // }

        errorConfirmHandler = () => {
            this.setState({ error: null })
        }
        render() {
            return (
                <Aux>
                    <Modal show={this.state.error}
                        modalClosed={this.errorConfirmHandler}>
                        {this.state.error ? this.state.error.message : null}

                    </Modal>
                    <WrappedComponent {...this.props} />
                </Aux>
            )
        }
    }

}

export default withErrorHandler
