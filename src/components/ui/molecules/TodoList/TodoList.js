import {
  DragDropContext,
  Draggable,
  Droppable
} from 'react-beautiful-dnd';
import { useMemo } from 'react';
import { useDispatch } from 'react-redux';

import TodoTile from '../TodoTile/TodoTile';
import styles from './TodoList.module.scss';
import { removeTodo, reorderTodos, toggleTodo } from '../../../../store/todosSlice';

const TodoList = ({ todos }) => {
  const todosExist = useMemo(() => todos && todos.length > 0, [todos]);
  const dispatch = useDispatch();

  const onRemoveTodo = (todoId) => {
    dispatch(removeTodo(todoId));
  };

  const onToggleTodo = (todoId) => {
    dispatch(toggleTodo(todoId));
  }

  const onDragEnd = (dndResult) => {
    dispatch(reorderTodos({
      dragIndex: dndResult.source.index,
      dropIndex: dndResult.destination.index,
      todos: todos
    }));
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <section className={styles.TodoList}>
        {todosExist &&
          <Droppable droppableId="todos-list">
            {(provided) =>
            (<div {...provided.droppableProps} ref={provided.innerRef}>

              {todos.map((todo, index) =>
                <Draggable draggableId={`${todo.id}`} key={`${todo.id}`} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}>
                      <TodoTile
                        id={`todo-list-tile-${todo.id}`}
                        className={styles.TodoTile}
                        disabled={true}
                        value={todo.content}
                        checked={todo.isCompleted}
                        onToggleTodo={() => onToggleTodo(todo.id)}
                        onRemoveTodo={() => onRemoveTodo(todo.id)} />

                    </div>
                  )}
                </Draggable>
              )}
              {provided.placeholder}

            </div>)
            }
          </Droppable>
        }
        {!todosExist && <h4 className={styles.NoContent}>There are no todos yet</h4>}
      </section>
    </DragDropContext>
  );
};

export default TodoList;
