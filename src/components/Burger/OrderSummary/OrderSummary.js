import React, { Component } from 'react';

import Aux from '../../../hoc/Aux/Aux'
import Button from '../../UI/Button/Button'

class OrderSummary extends Component {
    render() {
        const ingredientsSummary = Object.keys(this.props.ingredients).map(ingKey => {
            return (
            <li key={ingKey}>
                <span style={{textTransform: 'capitalize'}}>{ingKey}</span>
                : {this.props.ingredients[ingKey]}
            </li>)
        });

        return (
            <Aux>
                <h3>Your order:</h3>
                <p>A burger with delicious ingredients:</p>
                <ul>
                    {ingredientsSummary}
                </ul>
                <p><strong>Total Price: {this.props.totalPrice.toFixed(2)} $</strong></p>
                <p>Continue to checkout?</p>
                <Button 
                    btnType="Danger" 
                    clicked={this.props.orderCanceled}>
                    CANCEL
                </Button>
                <Button 
                    btnType="Success" 
                    clicked={this.props.orderConfirmed}>
                    CONTINUE
                </Button>
            </Aux>
        );
    }
};

export default OrderSummary;