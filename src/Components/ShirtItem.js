import React from 'react'

function ShirtItem(props) {

    console.log(props)

  return (
    <li key={props.id}>{props.props.description}</li>
  )
}

export default ShirtItem