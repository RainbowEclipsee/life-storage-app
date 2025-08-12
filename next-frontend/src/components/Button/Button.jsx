import './Button.module.css'

const Button = ({ btnName, onClick }) => {
  return (
    <button className={buttonMain} onClick={onClick}>
      {btnName}
    </button>
  )
}

export default Button