import React, {Component} from 'react';

import Order from '../../components/Order/Order';
import axios from '../../axios-ordered';

class Orders extends Component {
    state = {

    }

    componentDidMount () {

    }
    
    render () {
        return (
            <div>
                <Order />
                <Order />
            </div>
        )
    }
}

export default Orders;