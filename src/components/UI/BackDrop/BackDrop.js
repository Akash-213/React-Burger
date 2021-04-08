import React from 'react';
import './BackDrop.css';

const backDrop = (props) => (
    props.show ?
        <div
            className='BackDrop'
            onClick={props.clickedBackDrop}
        >
        </div>
        : null
);

export default backDrop;
