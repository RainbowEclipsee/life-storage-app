import React from 'react'
import ProfileField from './ProfileField'

const ProfileForm = ({ form, isEditing, handleChange }) => {
  return (
    <>
      <ProfileField
        label="Имя:"
        type="text"
        name="name"
        value={form.name}
        onChange={handleChange}
        disabled={!isEditing}
        placeholder="Укажите имя"
      />

      <ProfileField
        label="Рождение:"
        type="date"
        name="dateOfBirth"
        value={form.dateOfBirth}
        onChange={handleChange}
        disabled={!isEditing}
      />

      <ProfileField
        label="Ожидаемая продолжительность жизни:"
        type="date"
        name="estimatedDeathDate"
        value={form.estimatedDeathDate}
        onChange={handleChange}
        disabled={!isEditing}
      />

      <ProfileField
        label="Пол:"
        type="text"
        name="sex"
        value={form.sex}
        onChange={handleChange}
        disabled={!isEditing}
        placeholder="Укажите пол"
      />

      <ProfileField
        label="Страна:"
        type="text"
        name="country"
        value={form.country}
        onChange={handleChange}
        disabled={!isEditing}
        placeholder="Страна проживания"
      />
    </>
  )
}

export default ProfileForm
