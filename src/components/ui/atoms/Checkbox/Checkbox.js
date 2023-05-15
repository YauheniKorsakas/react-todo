import styles from './Checkbox.module.scss';
import classNames from 'classnames';

const Checkbox = ({className = '', id, onClick, disabled = false}) => {
  return (
    <div className={classNames(styles.Round, className)}>
      <input
        disabled={disabled}
        type="checkbox"
        id={id}
        onClick={onClick} />
      <label htmlFor={id}></label>
    </div>
  )
};

export default Checkbox;
