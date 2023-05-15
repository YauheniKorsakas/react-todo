import { useSelector } from "react-redux";

import styles from './TodoContainer.module.scss';
import { TodoFooter, TodoHeader, TodoList } from "../../molecules";
import { selectAllTodos } from "../../../../store/todosSlice";

const TodoContainer = () => {
  const todos = useSelector(selectAllTodos);

  return (
    <div className={styles.TodoContainer}>
      <TodoHeader className={styles.TodoHeader} />
      <br />
      <div className={styles.Container}>
        <TodoList todos={todos} />
        <TodoFooter />
      </div>
    </div>);
};

export default TodoContainer;
