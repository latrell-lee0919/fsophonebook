import React from 'react'

const Persons = (props) => {
    return (
        <div>
            <div>
                {props.name} {props.number}
                <button onClick={props.removePerson}>delete</button>
            </div>
        </div>
    )
};

export default Persons