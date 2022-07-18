import React from 'react'

function GameItem({props}) {

    console.log(props)

  return (
    <li key={props.id}>{props.title}</li>
  )
}

export default GameItem