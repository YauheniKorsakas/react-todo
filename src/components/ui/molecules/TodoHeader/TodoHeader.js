import { useState } from 'react';

import styles from './TodoHeader.module.scss';
import TodoTile from '../TodoTile/TodoTile';
import classNames from 'classnames';

const TodoHeader = ({ className = '' }) => {
  const [todoTileValue, setTodoTileValue] = useState('');

  return (
    <div className={classNames(styles.TodoHeader, className)}>
      <h1>TODO</h1>
      <TodoTile
        id={'todo-header-tile'}
        value={todoTileValue}
        onChange={(e) => setTodoTileValue(e.target.value)} 
        placeholder={"Write your todo here..."} />
    </div>
  );
};

export default TodoHeader;
