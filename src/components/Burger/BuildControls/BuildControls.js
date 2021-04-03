import React from 'react'
import './BuildControls.css'
import BuildControl from './BuildControl/BuildControl'

const controls = [
    { label: 'Salad', type: 'salad' },
    { label: 'Bacon', type: 'bacon' },
    { label: 'Cheese', type: 'cheese' },
    { label: 'Patty', type: 'patty' },
]
const buildControls = (props) => {
    return (
        <div className='BuildControls'>
            <p>Current Price : <strong>{props.totalPrice.toFixed(2)}</strong></p>

            {controls.map(control => (
                <BuildControl
                    key={control.label}
                    label={control.label}
                    added={() => props.ingredientAdded(control.type)}
                    removed={() => props.ingredientRemoved(control.type)}
                    disabled={props.disabled[control.type]}
                />

            ))}
            <button className='OrderButton'
                disabled={!props.purchaseable}
                onClick={props.ordered}>
                ORDER NOW
            </button>
        </div>
    )
}

export default buildControls
