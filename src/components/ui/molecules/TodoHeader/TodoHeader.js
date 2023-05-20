import classNames from 'classnames';
import { useDispatch } from 'react-redux';
import { useState } from 'react';

import TodoTile from '../TodoTile/TodoTile';
import styles from './TodoHeader.module.scss';
import { addTodo } from '../../../../store/todosSlice';

const TodoHeader = ({ className = '' }) => {
  const [todoTileValue, setTodoTileValue] = useState('');
  const dispatch = useDispatch();
  const onAddTodo = (e) => {
    if (e.key === 'Enter') {
      const newTodo = { content: todoTileValue};
      dispatch(addTodo(newTodo));
      setTodoTileValue('');
    }
  }
  const onChange = (e) => setTodoTileValue(e.target.value);

  return (
    <header className={classNames(styles.TodoHeader, className)}>
      <h1>Todo</h1>
      <TodoTile
        id={'todo-header-tile'}
        value={todoTileValue}
        onAddTodo={onAddTodo}
        onChange={onChange}
        placeholder={"Write your todo here..."} />
    </header>
  );
};

export default TodoHeader;
