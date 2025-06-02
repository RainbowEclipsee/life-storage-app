import React from 'react'
import './Spinner.css'

const Spinner = ({strInfo}) => {
  return (
    <div className="spinner-container">
      <div className="spinner" />
      <span>Загружаем {strInfo}...</span>
    </div>
  )
}

export default Spinner
