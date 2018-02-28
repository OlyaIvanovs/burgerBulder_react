import React, { Component } from 'react';
import Aux from '../../hoc/Aux'
import Toolbar from '../Navigation/Toolbar/Toolbar'
import SideDrawer from '../Navigation/SideDrawer/SideDrawer'

import classes from './Layout.css'

class Layout extends Component {
    state = {
        showSideDrawer: false
    }

    sideDrawerShowedHandler = () => {
        this.setState({
            showSideDrawer: true
        });
    }

    sideDrawerClosedHandler = () => {
        this.setState({
            showSideDrawer: false
        });
    }

    render () {
        return (
            <Aux>
                <div>
                    <Toolbar toggleBtnClicked={this.sideDrawerShowedHandler}/>
                    <SideDrawer 
                    show={this.state.showSideDrawer} 
                    closed={this.sideDrawerClosedHandler}/>
                </div>
                <main className={classes.content}>
                    { this.props.children }
                </main>
            </Aux>
        );
    };
};

export default Layout;