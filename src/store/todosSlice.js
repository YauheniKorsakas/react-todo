import { createSlice } from '@reduxjs/toolkit';
import Statuses from '../constants/Filters';

const initialState = {
  filter: Statuses.All,
  todoItems: [
    { id: 1, content: 'Check phone', isCompleted: false },
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
    }
  }
});

const selectAllTodos = (state) => state.todos.todoItems.slice();

const selectCompletedTodos = (state) => state.todos.todoItems.filter(item => item.isCompleted);

const selectNotCompletedTodos = (state) => state.todos.todoItems.filter(item => !item.isCompleted);

const selectTotalCount = (state) => state.todos.todoItems.length;


export {
  selectAllTodos,
  selectTotalCount,
  selectCompletedTodos,
  selectNotCompletedTodos
};
export const {
  addTodo,
  clearCompletedTodos,
  toggleTodo,
  removeTodo
} = todosSlice.actions;
export default todosSlice.reducer;