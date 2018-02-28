import React, {Component} from 'react';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

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
        purchasing: false
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
        this.setState({purchasing: true});
        alert('You continue');
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
        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCanceleHandle}>
                    <OrderSummary 
                    totalPrice={this.state.totalPrice}
                    orderCanceled={this.purchaseCanceleHandle}
                    orderConfirmed={this.purchaseContinueHandle}
                    ingredients={this.state.ingredients} />
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

export default BurgerBuilder;