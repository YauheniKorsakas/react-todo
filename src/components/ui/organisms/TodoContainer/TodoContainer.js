import { useSelector } from "react-redux";
import { useState } from 'react';

import styles from './TodoContainer.module.scss';
import {
  selectAllTodos,
  selectCompletedTodos,
  selectNotCompletedTodos
} from "../../../../store/todosSlice";
import {
  TodoFooter,
  TodoHeader,
  TodoList
} from "../../molecules";
import Statuses from '../../../../constants/Filters';

const TodoContainer = () => {
  const allTodos = useSelector(selectAllTodos);
  const completedTodos = useSelector(selectCompletedTodos);
  const notCompletedTodos = useSelector(selectNotCompletedTodos);
  const [filter, setFilter] = useState(Statuses.All);

  // TODO: write complex selector that accepts state and status and returns needed array;

  const actualTodos = {
    [Statuses.All]: allTodos,
    [Statuses.Active]: notCompletedTodos,
    [Statuses.Completed]: completedTodos
  }[filter];

  return (
    <div className={styles.TodoContainer}>
      <TodoHeader className={styles.TodoHeader} />
      <br />
      <div className={styles.Container}>
        <TodoList todos={actualTodos} />
        <TodoFooter
          filter={filter}
          setFilter={setFilter} />
      </div>
    </div>);
};

export default TodoContainer;
