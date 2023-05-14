import { TodoFooter, TodoHeader, TodoList } from "../../molecules";
import styles from './TodoContainer.module.scss';

const TodoContainer = () => {
  const data = [
    {id: 1, content: 'test1'},
    {id: 2, content: 'test2'},
    {id: 3, content: 'test3'},
    {id: 4, content: 'test4'},
    {id: 5, content: 'test5'},
  ];

  return (
    <div className={styles.TodoContainer}>
      <TodoHeader />
      <br />
      <div className={styles.Container}>
        <TodoList todos={data} />
        <TodoFooter />
      </div>
    </div>);
};

export default TodoContainer;
