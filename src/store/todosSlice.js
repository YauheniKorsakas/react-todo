import { createSlice } from '@reduxjs/toolkit';

import Filters from '../constants/Filters';
import getRepository from '../data/repository';
import TodoKey from '../constants/LocalStorageKeys';

const repository = getRepository(TodoKey);
const loadedTodos = repository.load(TodoKey)?.todos;
const initialState = loadedTodos ||
{
  filter: Filters.All,
  todoItems: []
}

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: (state, action) => {
      if (action?.payload?.content) {
        const todos = state.todoItems;
        const maxId = todos.length ? Math.max(...todos.map(item => item.id)) : 0;
        action.payload.id = maxId + 1;
        todos.unshift({ ...action.payload, isCompleted: false });
      }
    },
    removeTodo: (state, { payload }) => {
      state.todoItems = state.todoItems.filter(item => item.id !== payload);
    },
    clearCompletedTodos: (state) => {
      state.todoItems = state.todoItems.filter(item => item.isCompleted === false);
    },
    toggleTodo: (state, { payload }) => {
      const todoToUpdate = state.todoItems.find(item => item.id === payload);

      if (todoToUpdate) {
        todoToUpdate.isCompleted = !todoToUpdate.isCompleted;
      }
    },
    changeFilter: (state, {payload}) => {
      if (Object.values(Filters).some(item => item === payload)) {
        state.filter = payload
      }
    },
    reorderTodos: (state, { payload }) => {
      let { dragIndex, dropIndex, todos } = payload;

      if (!Number.isInteger(dragIndex) || !Number.isInteger(dropIndex) || !todos) {
        return;
      }

      if (state.filter !== Filters.All) {
        dragIndex = todos.findIndex(
          item => item.id === state.todoItems[dragIndex].id
        );
        dropIndex = todos.findIndex(
          item => item.id === state.todoItems[dropIndex].id
        );
      }

      const items = [...state.todoItems]
      const reorderedItem = items.splice(dragIndex, 1)[0];
      items.splice(dropIndex, 0, reorderedItem);
      state.todoItems = items;
    }
  }
});

const predicatesForTodoFilters = {
  [Filters.All]: item => item,
  [Filters.Active]: item => !item.isCompleted,
  [Filters.Completed]: item => item.isCompleted
};
const selectTodosCountByFilter = (state) => {
  const filter = state.todos.filter;
  const predicate = predicatesForTodoFilters[filter];

  return state.todos.todoItems.filter(predicate).length;
}
const selectCurrentTodosFilter = (state) => state.todos.filter;
const selectTodosByFilter = (state) => {
  const filter = state.todos.filter;
  const predicate = predicatesForTodoFilters[filter];

  return state.todos.todoItems.filter(predicate);
};

export {
  selectCurrentTodosFilter,
  selectTodosByFilter,
  selectTodosCountByFilter
};
export const {
  addTodo,
  changeFilter,
  clearCompletedTodos,
  toggleTodo,
  removeTodo,
  reorderTodos
} = todosSlice.actions;
export default todosSlice.reducer;