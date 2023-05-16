import { createSlice } from '@reduxjs/toolkit';
import Filters from '../constants/Filters';

const initialState = {
  filter: Filters.All,
  todoItems: [
    { id: 1, content: 'Check phone', isCompleted: true },
    { id: 2, content: 'Verify credentials', isCompleted: false },
    { id: 3, content: 'Check email', isCompleted: false },
  ]
}

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: (state, action) => {
      if (action?.payload?.content) {
        const todos = state.todoItems;
        const maxId = todos.length ? Math.max(...todos.map(item => item.id)) : 1;
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
      state.filter = action.payload
    }
  }
});

const selectTotalCount = (state) => state.todos.todoItems.length;
const selectCurrentTodosFilter = (state) => state.todos.filter;
const selectTodosByFilter = (state) => {
  const filter = state.todos.filter;
  const predicate = {
    [Filters.All]: item => item,
    [Filters.Active]: item => !item.isCompleted,
    [Filters.Completed]: item => item.isCompleted
  }[filter];

  return state.todos.todoItems.filter(predicate);
};

export {
  selectCurrentTodosFilter,
  selectTodosByFilter,
  selectTotalCount
};
export const {
  addTodo,
  changeFilter,
  clearCompletedTodos,
  toggleTodo,
  removeTodo
} = todosSlice.actions;
export default todosSlice.reducer;