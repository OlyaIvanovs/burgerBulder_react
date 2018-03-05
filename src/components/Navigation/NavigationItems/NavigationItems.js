import React from 'react';
import { NavLink } from 'react-router-dom';

import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem'


const navigationItems = () => (
    <ul className={classes.NavigationItems}>
        <NavigationItem link="/" active>BurgerBuilder</NavigationItem>
        <NavigationItem link="/">Checkout</NavigationItem>
        <NavLink 
            activeClassName='active'
            to="/">
            BurgerBuilder
        </NavLink>
        <NavLink 
            activeClassName='active'
            to="/checkout">
            Checkout
        </NavLink>
    </ul>
);

export default navigationItems;