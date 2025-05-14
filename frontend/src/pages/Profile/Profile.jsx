import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setProfileData, clearProfile } from '../../store/profileSlice'
import Button from '../../components/Button/Button'
import './Profile.css'

const Profile = () => {
  const dispatch = useDispatch()
  const profile = useSelector((state) => state.profile)

  const [form, setForm] = useState({
    name: '',
    dateOfBirth: '',
    estimatedDeathDate: '',
    sex: '',
    country: '',
  })

  useEffect(() => {
    setForm({
      name: profile.name || '',
      dateOfBirth: profile.dateOfBirth || '',
      estimatedDeathDate: profile.estimatedDeathDate || '',
      sex: profile.sex || '',
      country: profile.country || '',
    })
  }, [profile])

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSave = () => {
    dispatch(setProfileData(form))
    
  }
  const handleClear = () => {
    dispatch(clearProfile())
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
          />
        </div>

        <div className="input__container">
          <label htmlFor="estimatedDeathDate">Предп. возраст жизни:</label>
          <input
            type="date"
            id="estimatedDeathDate"
            name="estimatedDeathDate"
            value={form.estimatedDeathDate}
            onChange={handleChange}
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
          />
        </div>
      </div>

      <div className="button_container">
        <Button btnName="Редактировать" />
        <Button btnName="Сохранить изменения" onClick={handleSave} />
        <Button btnName="Очистить данные" onClick={handleClear} />
      </div>
    </div>
  )
}

export default Profile
