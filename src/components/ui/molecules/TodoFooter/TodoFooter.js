import { useSelector } from "react-redux";

import styles from './TodoFooter.module.scss';
import { Button } from '../../atoms';
import { selectTotalCount } from "../../../../store/todosSlice";

const TodoFooter = () => {
  const todosTotalCount = useSelector(selectTotalCount);

  return (
    <footer className={styles.Footer}>
      <span className={styles.ItemsLeft}>{todosTotalCount} items left</span>
      <div className={styles.Filters}>
        <Button
          title='All'
          className={styles.FilterButton}
          onClick={() => {alert('All')}} />
        <Button
          title='Active'
          className={styles.FilterButton}
          onClick={() => {alert('Active')}} />
        <Button
          title='Completed'
          className={styles.FilterButton}
          onClick={() => {alert('Completed')}} />
      </div>
      <Button title='Clear Completed' />
    </footer>
  );
};

export default TodoFooter;
