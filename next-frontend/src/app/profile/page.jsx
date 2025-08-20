'use client'

import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setProfileData, clearProfile } from '../../redux/profileSlice'
import ProfileForm from '../../components/Profile/ProfileForm'
import ProfileButtons from '../../components/Profile/ProfileButtons'
import styles from '../../components/Profile/Profile.module.css'

const Profile = () => {
  const dispatch = useDispatch()
  const profile = useSelector((state) => state.profile)

  const [isEditing, setIsEditing] = useState(false)
  const [form, setForm] = useState({
    name: profile.name,
    dateOfBirth: profile.dateOfBirth,
    estimatedDeathDate: profile.estimatedDeathDate,
    sex: profile.sex,
    country: profile.country,
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleEdit = () => setIsEditing(true)

  const handleSave = () => {
    dispatch(setProfileData(form))
    setIsEditing(false)
  }

  const handleClear = () => {
    dispatch(clearProfile())
    window.location.reload() // временное решение
  }

  const handleCancelEdit = () => {
    setForm(profile)
    setIsEditing(false)
  }

  return (
    <div className={styles.profile}>
      <div className={styles.profile__container}>
        <h3>Персональная информация</h3>
        <ProfileForm form={form} isEditing={isEditing} handleChange={handleChange} />
      </div>

      <ProfileButtons
        isEditing={isEditing}
        onEdit={handleEdit}
        onSave={handleSave}
        onCancel={handleCancelEdit}
        onClear={handleClear}
      />
    </div>
  )
}

export default Profile
