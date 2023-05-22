import { createSlice } from '@reduxjs/toolkit';

import Filters from '../constants/Filters';
import getRepository from '../data/repository';
import TodoKey from '../constants/LocalStorageKeys';

const repository = getRepository(TodoKey);
const loadedTodos = repository.load(TodoKey)?.todos;
const initialState = loadedTodos ||
{
  filter: Filters.All,
  todoItems: [
    { id: 1, content: 'Check phone', isCompleted: true },
    { id: 2, content: 'Verify credentials', isCompleted: false },
    { id: 3, content: 'Check email', isCompleted: false }
  ]
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
    removeTodo: (state, action) => {
      state.todoItems = state.todoItems.filter(item => item.id !== action.payload);
    },
    clearCompletedTodos: (state) => {
      state.todoItems = state.todoItems.filter(item => item.isCompleted === false);
    },
    toggleTodo: (state, action) => {
      const todoToUpdate = state.todoItems.find(item => item.id === action.payload);

      if (todoToUpdate) {
        todoToUpdate.isCompleted = !todoToUpdate.isCompleted;
      }
    },
    changeFilter: (state, action) => {
      if (Object.values(Filters).some(item => item === action.payload)) {
        state.filter = action.payload
      }
    },
    reorderTodos: (state, { payload }) => {
      if (payload.destination) {
        const items = Array.from(state.todoItems);
        const [reorderedItem] = items.splice(payload.source.index, 1);
        state.todoItems = items.splice(payload.destination.index, 0, reorderedItem);
      }
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