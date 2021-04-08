import React, { Component } from 'react';
import Aux from '../../../hoc/Auxi/auxi';

import Button from '../../UI/Button/Button';


class OrderSummary extends Component {
    // Class Component not needed just for the method;

    componentDidUpdate() {
        //console.log('Order Summary Updates');
    }
    render() {

        const ingredientSummary = Object.keys(this.props.ingredients)
            .map(ingKey => {
                return <li key={ingKey}>
                    <span
                        style={{ textTransform: 'capitalize' }}> {ingKey}
                    </span>
            : {this.props.ingredients[ingKey]}
                </li>
            })
        return (
            <Aux>
                <h3>Your Burger is being prepared</h3>
                <p>Please confirm your ingredients : </p>
                <ul>
                    {ingredientSummary}
                </ul>
                <p> <strong>Total Price : {this.props.price.toFixed(2)}</strong></p>
                <p> Continue to CheckOut</p>

                <Button btnType="Danger" clicked={this.props.purchaseCancelled}>
                    Cancel
            </Button>

                <Button btnType="Success" clicked={this.props.purchaseContinued}>
                    Continue
            </Button>

            </Aux>

        )
    }

}

export default OrderSummary;
