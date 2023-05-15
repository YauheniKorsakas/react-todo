import { Fragment, useMemo } from 'react';
import { useDispatch } from 'react-redux';

import TodoTile from '../TodoTile/TodoTile';
import styles from './TodoList.module.scss';
import { removeTodo } from '../../../../store/todosSlice';

const TodoList = ({ todos }) => {
  const todosExist = useMemo(() => todos && todos.length > 0, [todos]);
  const dispatch = useDispatch();

  const onRemoveTodo = (todoId) => {
    dispatch(removeTodo(todoId));
  };
  
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
              value={todo.content}
              onRemoveTodo={() => onRemoveTodo(todo.id)} />
            <hr />
          </Fragment>)}
      </>
    }
    {!todosExist && <h4 className={styles.NoContent}>There are no todos yet</h4>}
    </div>
  );
};

export default TodoList;
