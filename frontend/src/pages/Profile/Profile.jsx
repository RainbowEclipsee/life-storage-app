import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setProfileData, clearProfile } from '../../store/profileSlice'
import Button from '../../components/Button/Button'
import './Profile.css'

const Profile = () => {
  const dispatch = useDispatch()
  const profile = useSelector((state) => state.profile)

  const [isEditing, setIsEditing] = useState(false)
  const [form, setForm] = useState({
    name: '',
    dateOfBirth: '',
    estimatedDeathDate: '',
    sex: '',
    country: '',
  })

  useEffect(() => {
    setForm(profile)
  }, [profile])

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleEdit = () => {
    setIsEditing(true)
  }
  
  const handleSave = () => {
    dispatch(setProfileData(form))
    setIsEditing(false)
  }
  const handleClear = () => {
    dispatch(clearProfile())

    window.location.reload()
  }

  const handleCancelEdit = () => {
    setForm(profile)
    setIsEditing(false)
  }

  return (
    <div className="profile">
      <div className="profile__container">
        <h3>Персональная информация</h3>

        <div className="input__container">
          <label htmlFor="name">Имя:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={form.name}
            onChange={handleChange}
            disabled={!isEditing}
            placeholder='Укажите имя'
          />
        </div>

        <div className="input__container">
          <label htmlFor="dateOfBirth">Рождение:</label>
          <input
            type="date"
            id="dateOfBirth"
            name="dateOfBirth"
            value={form.dateOfBirth}
            onChange={handleChange}
            disabled={!isEditing}
          />
        </div>

        <div className="input__container">
          <label htmlFor="estimatedDeathDate">Ожидаемый возраст жизни:</label>
          <input
            type="date"
            id="estimatedDeathDate"
            name="estimatedDeathDate"
            value={form.estimatedDeathDate}
            onChange={handleChange}
            disabled={!isEditing}
          />
        </div>

        <div className="input__container">
          <label htmlFor="sex">Пол:</label>
          <input
            type="text"
            id="sex"
            name="sex"
            value={form.sex}
            onChange={handleChange}
            disabled={!isEditing}
            placeholder='Укажите пол'
          />
        </div>

        <div className="input__container">
          <label htmlFor="country">Страна:</label>
          <input
            type="text"
            id="country"
            name="country"
            value={form.country}
            onChange={handleChange}
            disabled={!isEditing}
            placeholder='Страна проживания'
          />
        </div>
      </div>

      <div className="button__container">
        {!isEditing ? (
          <Button btnName="Редактировать" onClick={handleEdit} />
        ) : (
          <div className="button__container">
            <Button btnName="Сохранить изменения" onClick={handleSave} />
            <Button btnName="Отменить сохранение" onClick={handleCancelEdit}/>
            <Button btnName="Очистить данные" onClick={handleClear} />
          </div>
        )}
      </div>
    </div>
  )
}

export default Profile
