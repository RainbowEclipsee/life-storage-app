import React from 'react'
import styles from './Profile.module.css'

const ProfileField = ({ label, type, name, value, onChange, disabled, placeholder }) => {
  return (
    <div className={styles.input__container}>
      <label htmlFor={name}>{label}</label>
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        placeholder={placeholder}
      />
    </div>
  )
}

export default ProfileField
