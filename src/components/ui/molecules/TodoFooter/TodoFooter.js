import classNames from "classnames";
import { useDispatch, useSelector } from "react-redux";

import styles from './TodoFooter.module.scss';
import Filters from "../../../../constants/Filters";
import { Button } from '../../atoms';
import {
  changeFilter,
  clearCompletedTodos,
  selectCurrentTodosFilter,
  selectTodosCountByFilter
} from "../../../../store/todosSlice";

const TodoFooter = () => {
  const todosTotalCount = useSelector(selectTodosCountByFilter);
  const currentTodosFilter = useSelector(selectCurrentTodosFilter);
  const dispatch = useDispatch();
  const onClearCompleted = () => dispatch(clearCompletedTodos());
  const onChangeFilter = (filter) => dispatch(changeFilter(filter));

  return (
    <footer className={styles.Footer}>
      <span className={styles.ItemsLeft}>{todosTotalCount} items left</span>
      <div className={styles.Filters}>
        <Button
          title={Filters.All}
          className={classNames(
              styles.FilterButton,
              { [styles.Selected]: currentTodosFilter === Filters.All })}
          onClick={() => onChangeFilter(Filters.All)} />
        <Button
          title={Filters.Active}
          className={classNames(
            styles.FilterButton,
            { [styles.Selected]: currentTodosFilter === Filters.Active })}
          onClick={() => onChangeFilter(Filters.Active)} />
        <Button
          title={Filters.Completed}
          className={classNames(
            styles.FilterButton,
            { [styles.Selected]: currentTodosFilter === Filters.Completed })}
          onClick={() => onChangeFilter(Filters.Completed)} />
      </div>
      <Button title='Clear Completed' onClick={onClearCompleted}/>
    </footer>
  );
};

export default TodoFooter;
