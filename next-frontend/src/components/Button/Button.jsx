import styles from './Button.module.css'

const Button = ({ btnName, onClick }) => {
  return (
    <button className={styles.buttonMain} onClick={onClick}>
      {btnName}
    </button>
  )
}

export default Button