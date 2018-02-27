import React from 'react';

import Aux from '../../../hoc/Aux'
import Button from '../../UI/Button/Button'

const orderSummary = (props) => {
    const ingredientsSummary = Object.keys(props.ingredients).map(ingKey => {
        return (
        <li key={ingKey}>
            <span style={{textTransform: 'capitalize'}}>{ingKey}</span>
            : {props.ingredients[ingKey]}
        </li>)
    });

    return (
        <Aux>
            <h3>Your order:</h3>
            <p>A burger with delicious ingredients:</p>
            <ul>
                {ingredientsSummary}
            </ul>
            <p><strong>Total Price: {props.totalPrice.toFixed(2)} $</strong></p>
            <p>Continue to checkout?</p>
            <Button btnType="Danger" clicked={props.orderCanceled}>CANCEL</Button>
            <Button btnType="Success" clicked={props.orderConfirmed}>CONTINUE</Button>
        </Aux>
    );
};

export default orderSummary;