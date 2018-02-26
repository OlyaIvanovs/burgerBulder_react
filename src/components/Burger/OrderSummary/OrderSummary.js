import React from 'react';

import Aux from '../../../hoc/Aux'

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
            <p>Continue to checkout?</p>
        </Aux>
    );
};

export default orderSummary;