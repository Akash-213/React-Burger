import React, { Component } from "react";
import Aux from "../../hoc/Auxi/auxi";

import Burger from '../../components/Burger/Burger'
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import Spinner from '../../components/UI/Spinner/Spinner';

import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'

const INGREDIENT_PRICES = {
    salad: 10,
    cheese: 15,
    patty: 20,
    bacon: 10
}
class BurgerBuilder extends Component {

    state = {
        ingredients: null,
        totalPrice: 40,
        purchaseable: false,
        purchasing: false,
        loading: false,
        error: false,
    }


    componentDidMount() {
        axios.get('https://react-burger-f1a12-default-rtdb.firebaseio.com/ingredients.json')
            .then(res => {
                this.setState({ ingredients: res.data })
            })
            .catch(error => {
                this.setState({ error: true })
            });
    }

    updatePurchaseState(ingredients) {

        const total = Object.keys(ingredients)
            .map(ingKey => {
                return ingredients[ingKey]
            })
            .reduce((total, ele) => {
                return total + ele;
            }, 0);

        this.setState({ purchaseable: total > 0 })
    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;

        const priceAdd = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAdd;
        this.setState({
            totalPrice: newPrice,
            ingredients: updatedIngredients,
        })
        this.updatePurchaseState(updatedIngredients);
    }

    removeIngredienthandler = (type) => {
        const oldCount = this.state.ingredients[type];

        if (oldCount <= 0) {
            return;
        }
        const updatedCount = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;

        const priceSubtract = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceSubtract;
        this.setState({
            totalPrice: newPrice,
            ingredients: updatedIngredients,
        })
        this.updatePurchaseState(updatedIngredients);
    }

    purchaseHandler = () => {
        this.setState({ purchasing: true })
    }

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false })
    }

    purchaseContinueHandler = () => {
        //alert('Burger will reach to you in 1 minute')

        this.setState({ loading: true })

        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
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
                // console.log(response);
                this.setState({ loading: false, purchasing: false })
            })
            .catch(error => {
                // console.log(error)
                this.setState({ loading: false, purchasing: false })
            });


    }

    render() {

        const disabledInfo = {
            ...this.state.ingredients
        }
        for (let key in disabledInfo) {
            //true or false
            //{patty : true , ....}
            disabledInfo[key] = disabledInfo[key] <= 0
        }


        let orderSummary = null
        let burger = this.state.error ?
            <p>Ingredients cant be loaded!!</p> : <Spinner />

        if (this.state.ingredients) {
            burger = (
                <Aux>
                    <Burger ingredients={this.state.ingredients} />
                    <BuildControls
                        ingredientAdded={this.addIngredientHandler}
                        ingredientRemoved={this.removeIngredienthandler}
                        disabled={disabledInfo}
                        totalPrice={this.state.totalPrice}
                        purchaseable={this.state.purchaseable}
                        ordered={this.purchaseHandler}
                    />
                </Aux>
            );
            orderSummary = <OrderSummary
                ingredients={this.state.ingredients}
                purchaseCancelled={this.purchaseCancelHandler}
                purchaseContinued={this.purchaseContinueHandler}
                price={this.state.totalPrice} />

            if (this.state.loading) {
                orderSummary = <Spinner />
            }
        }


        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>

                {burger}

            </Aux>
        );
    }
}

export default withErrorHandler(BurgerBuilder, axios);