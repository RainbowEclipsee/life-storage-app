import React from 'react'
import Button from '../Button/Button'
import styles from './Profile.module.css'

const ProfileButtons = ({ isEditing, onEdit, onSave, onCancel, onClear }) => {
  return (
    <div className={styles.button__container}>
      {!isEditing ? (
        <Button btnName="Редактировать" onClick={onEdit} />
      ) : (
        <>
          <Button btnName="Сохранить изменения" onClick={onSave} />
          <Button btnName="Отменить сохранение" onClick={onCancel} />
          <Button btnName="Очистить данные" onClick={onClear} />
        </>
      )}
    </div>
  )
}

export default ProfileButtons
