import styles from './Checkbox.module.scss';
import classNames from 'classnames';

const Checkbox = ({className = '', ...props}) => {
  return (
    <div className={classNames(styles.Round, className)}>
      <input type="checkbox" id="checkbox" />
      <label htmlFor="checkbox"></label>
    </div>
  )
};

export default Checkbox;
