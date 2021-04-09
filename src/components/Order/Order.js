import React from 'react'
import './Order.css'

const order = (props) => {

    const ingredients = [];

    for (let ingName in props.ingredients) {
        ingredients.push({
            name: ingName,
            amount: props.ingredients[ingName]
        })
    }

    const ingredientOutput = ingredients.map(ig => {
        return <span
            style={{
                textTransform: 'capitalize',
                display: 'inline-block',
                margin: '0 8px',
                border: '1px solid #ccc',
                padding: '10px'
            }}
            key={ig.name}>
            {ig.name} ({ig.amount})</span>
    })

    return (
        <div className='Order'>

            <p>Ingredients : {ingredientOutput}</p>
            <p>Price : <strong>₹ {(props.price)} </strong></p>
        </div>
    );
}


export default order
