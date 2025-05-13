import Button from '../../components/Button/Button'
import './Profile.css'

const Profile = () => {

  const btnName = 'Сохранить изменения'

  return (
    <div className='profile'>
      <div className="profile__container">
      <h3>Персональная информация</h3>
        <div className='input__container'>
          <label htmlFor='name'>Имя:</label>
          <input type='text' id='name' name='name' placeholder='Укажите имя'/>
        </div>
        <div className='input__container'>
          <label htmlFor='dateOfBirth'>Рождение:</label>
          <input type='date' id='dateOfBirth' name='dateOfBirth' placeholder='Укажите дату рождения'/>
        </div>
        <div className='input__container'>
          <label htmlFor='sex'>Пол:</label>
          <input type='text' id='sex' name='sex' placeholder='Укажите свой пол'/>
        </div>
        <div className='input__container'>
          <label htmlFor='country'>Страна:</label>
          <input type='text' id='country' name='country' placeholder='Укажите страну проживания'/>
        </div>
      </div>
      <div className='button_container'>
        <Button btnName={btnName}/>
      </div>
      
    </div>
  )
}

export default Profile
