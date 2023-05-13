import styles from './Button.module.scss';

const Button = ({title = '', onClick, className = '', ...props}) => {
  return (
    <button
      {...props}
      className={`${styles.Button} ${className}`}
      onClick={onClick}>{title}</button>)
};

export default Button;
