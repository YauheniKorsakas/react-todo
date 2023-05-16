import { useSelector } from "react-redux";

import styles from './TodoContainer.module.scss';
import { selectTodosByFilter } from "../../../../store/todosSlice";
import {
  TodoFooter,
  TodoHeader,
  TodoList
} from "../../molecules";

const TodoContainer = () => {
  const actualTodos = useSelector(selectTodosByFilter);

  return (
    <div className={styles.TodoContainer}>
      <TodoHeader className={styles.TodoHeader} />
      <br />
      <div className={styles.Container}>
        <TodoList todos={actualTodos} />
        <TodoFooter />
      </div>
    </div>);
};

export default TodoContainer;
