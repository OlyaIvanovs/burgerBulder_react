import React, {Component} from 'react';

import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-ordered';
import * as actionTypes from '../../store/actions'

import {connect} from 'react-redux';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}

class BurgerBuilder extends Component {
    state = {
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
        const queryParams = [];
        for (let i in this.props.ings) {
            queryParams.push(encodeURIComponent(i) + 
            '=' + encodeURIComponent(this.props.ings[i]))
        }
        queryParams.push('price=' + this.props.price);
        const queryString = queryParams.join('&');
        this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryString
        });

    }

    addIngredientHandler = (type) => {
        let updatedIngredientCount = this.props.ings[type] + 1;
        let updatedIngredients = {
            ...this.props.ings
        };
        updatedIngredients[type] =  updatedIngredientCount;
        let updatedTotalPrice = this.props.price + INGREDIENT_PRICES[type];
        this.setState({
            totalPrice: updatedTotalPrice,
            ingredients: updatedIngredients
        });
        this.updatePurchaseState(updatedIngredients);
    }

    removeIngredientHandler = (type) => {
        let oldCount = this.props.ings[type];
        if (oldCount <= 0) {
            return;
        }
        let updatedIngredientCount = oldCount - 1;
        let updatedIngredients = {
            ...this.props.ings
        };
        updatedIngredients[type] =  updatedIngredientCount;
        let updatedTotalPrice = this.props.price - INGREDIENT_PRICES[type];
        this.setState({
            totalPrice: updatedTotalPrice,
            ingredients: updatedIngredients
        });
        this.updatePurchaseState(updatedIngredients);
    }


    render () {
        const disabledInfo = {
            ...this.props.ings
        }
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        let orderSummary = <OrderSummary 
            totalPrice={this.props.price}
            orderCanceled={this.purchaseCanceleHandle}
            orderConfirmed={this.purchaseContinueHandle}
            ingredients={this.props.ings} />;
        if (this.state.loading) {
            orderSummary = <Spinner />;
        }
        return (
            <Aux>
                <Modal 
                    show={this.state.purchasing} 
                    modalClosed={this.purchaseCanceleHandle}>
                    {orderSummary}
                </Modal>
                <Burger ingredients={this.props.ings}/>
                <BuildControls 
                    ordered={this.purchaseHandler}
                    purchasable={this.state.purchasable}
                    price={this.props.price}
                    disabledInfo={disabledInfo}
                    ingredientAdded={this.props.onIngredientAdded}
                    ingredientRemoved={this.props.onIngredientRemoved}/>
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        price: state.totalPrice
    }
}


const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch({
            type: actionTypes.ADD_INGREDIENT, 
            ingredientName: ingName
        }),
        onIngredientRemoved: (ingName) => dispatch({
            type: actionTypes.REMOVE_INGREDIENT, 
            ingredientName: ingName
        })
    }
}


export default 
connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));