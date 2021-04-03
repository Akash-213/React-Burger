import React from 'react';

import './SideDrawer.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems'

import Backdrop from '../../UI/BackDrop/BackDrop';
import Aux from '../../../hoc/Auxi/auxi';

/* <Logo height='11%' style={{ margin: '32px' }} /> */
const sideDrawer = (props) => {

    let attachedClasses = ['SideDrawer', 'Close'];
    if (props.open) {
        attachedClasses = ['SideDrawer', 'Open'];
    }


    return (
        <Aux>
            <Backdrop
                show={props.open}
                clickedBackDrop={props.closed}
            />
            <div className={attachedClasses.join(' ')}>

                <div className='myLogo'>
                    <Logo />
                </div>
                <nav>
                    <NavigationItems />
                </nav>
            </div>
        </Aux>

    );
}


export default sideDrawer;
