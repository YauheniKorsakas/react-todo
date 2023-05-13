import styles from './Checkbox.module.scss';

const Checkbox = ({className = '', ...props}) => {
  return (
    <div className={`${styles.Round} ${className}`}>
      <input type="checkbox" id="checkbox" />
      <label htmlFor="checkbox"></label>
    </div>
  )
};

export default Checkbox;
