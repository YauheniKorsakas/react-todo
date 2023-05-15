import { useSelector } from "react-redux";

import { TodoFooter, TodoHeader, TodoList } from "../../molecules";
import styles from './TodoContainer.module.scss';
import {
  selectAllTodos,
  selectTotalCount
} from "../../../../store/todosSlice";

const TodoContainer = () => {
  const todos = useSelector(selectAllTodos);
  const todosTotalCount = useSelector(selectTotalCount);

  return (
    <div className={styles.TodoContainer}>
      <TodoHeader className={styles.TodoHeader} />
      <br />
      <div className={styles.Container}>
        <TodoList todos={todos} />
        <TodoFooter totalCount={todosTotalCount} />
      </div>
    </div>);
};

export default TodoContainer;
