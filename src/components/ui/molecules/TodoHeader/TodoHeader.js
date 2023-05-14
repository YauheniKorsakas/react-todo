import { useState } from 'react';

import styles from './TodoHeader.module.scss';
import TodoTile from '../TodoTile/TodoTile';

const TodoHeader = () => {
  const [todoTileValue, setTodoTileValue] = useState('');

  return (
    <div className={styles.TodoHeader}>
      <h1>TODO</h1>
      <TodoTile
        value={todoTileValue}
        onChange={(e) => setTodoTileValue(e.target.value)} 
        placeholder={"Write your todo here..."} />
    </div>
  );
};

export default TodoHeader;
