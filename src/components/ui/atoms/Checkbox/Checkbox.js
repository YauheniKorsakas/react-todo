import styles from './Checkbox.module.scss';

const Checkbox = () => {
  return (
    <div className={styles.Round}>
      <input type="checkbox" id="checkbox" />
      <label htmlFor="checkbox"></label>
    </div>
  )
};

export default Checkbox;
