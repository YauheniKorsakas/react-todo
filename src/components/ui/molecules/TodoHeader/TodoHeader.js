import classNames from 'classnames';
import { useDispatch } from 'react-redux';
import { useState } from 'react';

import { addTodo } from '../../../../store/todosSlice';
import TodoTile from '../TodoTile/TodoTile';
import styles from './TodoHeader.module.scss';

const TodoHeader = ({ className = '' }) => {
  const [todoTileValue, setTodoTileValue] = useState('');
  const dispatch = useDispatch();
  const onAddTodo = (e) => {
    if (e.key === 'Enter') {
      const newTodo = { content: todoTileValue};
      dispatch(addTodo(newTodo));
    }
  }
  const onChange = (e) => setTodoTileValue(e.target.value);

  return (
    <div className={classNames(styles.TodoHeader, className)}>
      <h1>TODO</h1>
      <TodoTile
        id={'todo-header-tile'}
        value={todoTileValue}
        onAddTodo={onAddTodo}
        onChange={onChange}
        placeholder={"Write your todo here..."} />
    </div>
  );
};

export default TodoHeader;
