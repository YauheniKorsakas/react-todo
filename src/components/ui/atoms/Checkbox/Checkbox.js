import styles from './Checkbox.module.scss';
import classNames from 'classnames';

const Checkbox = ({className = '', id, ...props}) => {
  return (
    <div className={classNames(styles.Round, className)}>
      <input type="checkbox" id={id} />
      <label htmlFor={id}></label>
    </div>
  )
};

export default Checkbox;
