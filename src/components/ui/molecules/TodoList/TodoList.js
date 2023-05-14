import styles from './TodoList.module.scss';

import TodoTile from '../TodoTile/TodoTile';

const TodoList = ({ todos }) => {
  const todosExist = todos && todos.length > 0;
  
  return (
    <>
    {todosExist && 
      <div>
        {todos.map(todo =>
          <>
            <TodoTile
                className={styles.TodoTile}
                key={todo.id}
                disabled={true}
                value={todo.content} />
            <hr />
          </>)}
      </div>
    }
    {!todosExist && <h4 className={styles.NoContent}>There are no todos yet</h4>}
    </>
  );
};

export default TodoList;
