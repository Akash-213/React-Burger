import React, { Component } from 'react'

import Button from '../../../components/UI/Button/Button'
import './ContactData.css'
import Spinner from '../../../components/UI/Spinner/Spinner'

import axios from '../../../axios-orders';

class ContactData extends Component {

    state = {
        name: '',
        email: '',
        address: {
            city: '',
            postalCode: '',
        },
        loading: false,
    }

    orderHandler = (event) => {
        event.preventDefault();
        console.log(this.props.ingredients)

        this.setState({ loading: true })

        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            customer: {
                name: 'Customer',
                address: {
                    city: 'My City',
                },
                email: 'test@gmail.com',
            },
            deliveryMethod: 'fastest'
        }
        axios.post('/orders.json', order)
            .then(response => {
                this.setState({ loading: false })
                this.props.history.push('/');
            })
            .catch(error => {

                this.setState({ loading: false })
            });
    }
    render() {

        let form = (
            <form>
                <input className='Input' type='text' name="name" placeholder='Your Name here' />
                <input className='Input' type='email' name="email" placeholder='Your Email here' />
                <input className='Input' type='text' name="city" placeholder='Your City here' />
                <input className='Input' type='text' name="postalCode" placeholder='Your Postal-Code here' />

                <Button btnType='Success' clicked={this.orderHandler}>Order Now</Button>

            </form>
        );

        if (this.state.loading) {
            form = <Spinner />
        }
        return (
            <div className='ContactData'>
                <h4>Enter your Contact Data</h4>
                {form}

            </div>
        )
    }
}

export default ContactData;
