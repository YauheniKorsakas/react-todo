import classNames from 'classnames';

import styles from './Checkbox.module.scss';

const Checkbox = ({className = '', id, onChange, disabled = false, checked = false}) => {
  return (
    <div className={classNames(styles.Round, className)}>
      <input
        checked={checked}
        disabled={disabled}
        type="checkbox"
        id={id}
        onChange={onChange} />
      <label htmlFor={id}></label>
    </div>
  )
};

export default Checkbox;
