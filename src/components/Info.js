import React from 'react'

const Info = (props) => {
    console.log(props);
    return (
        <div>
            {props.name} {props.number}
        </div>
    )
};

export default Info