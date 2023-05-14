import styles from './TodoList.module.scss';

import TodoTile from '../TodoTile/TodoTile';
import { Fragment } from 'react';

const TodoList = ({ todos }) => {
  const todosExist = todos && todos.length > 0;
  
  return (
    <div className={styles.TodoList}>
    {todosExist &&
      <>
        {todos.map(todo =>
          <Fragment key={`todo-list-tile-container-${todo.id}`}>
            <TodoTile
              id={`todo-list-tile-${todo.id}`}
              className={styles.TodoTile}
              disabled={true}
              value={todo.content} />
            <hr />
          </Fragment>)}
      </>
    }
    {!todosExist && <h4 className={styles.NoContent}>There are no todos yet</h4>}
    </div>
  );
};

export default TodoList;
