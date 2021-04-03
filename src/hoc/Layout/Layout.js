import React, { Component } from 'react';
import Aux from '../Auxi/auxi';

import './Layout.css';
import Toolbar from '../../components/Navigation/ToolBar/Toolbar';

import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component {

    state = {
        showSideDrawer: true,
    }

    sideDrawerCloseHandler = () => {
        console.log('Clicked Backdrop')
        this.setState({ showSideDrawer: false });
    }

    sideDrawerToggleHandler = () => {
        this.setState((prevState) => {
            return { showSideDrawer: !prevState.showSideDrawer };
        })
    }

    render() {
        return (
            <Aux>
                <Toolbar drawerToggleClicked={this.sideDrawerToggleHandler} />
                <SideDrawer
                    open={this.state.showSideDrawer}
                    closed={this.sideDrawerCloseHandler}
                />
                <main className='content'>
                    {this.props.children}
                </main>
            </Aux>
        );
    }

}


export default Layout;