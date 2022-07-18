import React from 'react';

export default function ListItem(props) {

    console.log(props)

    return (
        <li key={props.id}>{props.props.model}</li>
    )
}