import React from 'react';
import './Burger.css'

import BurgerIngredients from './BurgerIngredients/BurgerIngredients';


const burger = (props) => {

    let transformedIngredients = Object.keys(props.ingredients)
        .map(ingKey => {
            return [...Array(props.ingredients[ingKey])]
                .map((_, i) => {
                    return < BurgerIngredients key={ingKey + i} type={ingKey} />
                });
        })
        .reduce((arr, ele) => {
            return arr.concat(ele)
        }, []);

    //console.log(transformedIngredients)
    if (transformedIngredients.length === 0) {
        transformedIngredients = <p>Please Start Adding Ingredients</p>
    }

    return (
        <div className='Burger' >
            <BurgerIngredients type='bread-top' />
            {transformedIngredients}
            <BurgerIngredients type='bread-bottom' />

        </div>
    );
}

export default burger;