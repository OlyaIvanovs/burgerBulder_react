import React, {Component} from 'react';

import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-ordered';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}

class BurgerBuilder extends Component {
    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        loading: false
    }

    updatePurchaseState (ingredients) {
        const sum = Object.keys(ingredients).map(ingKey => {
            return ingredients[ingKey]
        }).reduce((sum, el) => (sum + el), 0);
        this.setState({purchasable: sum > 0});
    };

    purchaseHandler = () => {
        this.setState({purchasing: true});
    }

    purchaseCanceleHandle = () => {
        this.setState({purchasing: false});
    }

    purchaseContinueHandle = () => {
        // this.setState({purchasing: true});
        // const order = {
        //     ingredients: this.state.ingredients,
        //     price: this.state.totalPrice,
        //     customer: {
        //         name: 'Olya',
        //         address: {
        //             street: 'Hataitai',
        //             zipCode: '123456',
        //             country: 'New Zealand'
        //         },
        //         email: 'olya@ivanovs.info'
        //     },
        //     deliveryMethod: 'fastest'
        // };
        // this.setState({loading: true});
        // axios.post('/orders.json', order)
        //     .then(response => {
        //         console.log(response);
        //         this.setState({loading: false, purchasing: false});
        //     })
        //     .catch(error =>  {
        //         console.log(error);
        //         this.setState({loading: false, purchasing: false});
        //     })

        this.props.history.push('/checkout');

    }

    addIngredientHandler = (type) => {
        let updatedIngredientCount = this.state.ingredients[type] + 1;
        let updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] =  updatedIngredientCount;
        let updatedTotalPrice = this.state.totalPrice + INGREDIENT_PRICES[type];
        this.setState({
            totalPrice: updatedTotalPrice,
            ingredients: updatedIngredients
        });
        this.updatePurchaseState(updatedIngredients);
    }

    removeIngredientHandler = (type) => {
        let oldCount = this.state.ingredients[type];
        if (oldCount <= 0) {
            return;
        }
        let updatedIngredientCount = oldCount - 1;
        let updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] =  updatedIngredientCount;
        let updatedTotalPrice = this.state.totalPrice - INGREDIENT_PRICES[type];
        this.setState({
            totalPrice: updatedTotalPrice,
            ingredients: updatedIngredients
        });
        this.updatePurchaseState(updatedIngredients);
    }


    render () {
        const disabledInfo = {
            ...this.state.ingredients
        }
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        let orderSummary = <OrderSummary 
            totalPrice={this.state.totalPrice}
            orderCanceled={this.purchaseCanceleHandle}
            orderConfirmed={this.purchaseContinueHandle}
            ingredients={this.state.ingredients} />;
        if (this.state.loading) {
            orderSummary = <Spinner />;
        }
        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCanceleHandle}>
                    {orderSummary}
                </Modal>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls 
                    ordered={this.purchaseHandler}
                    purchasable={this.state.purchasable}
                    price={this.state.totalPrice}
                    disabledInfo={disabledInfo}
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved={this.removeIngredientHandler}/>
            </Aux>
        );
    }
}

export default withErrorHandler(BurgerBuilder, axios);