import { createSlice } from '@reduxjs/toolkit';

const initialState = [
  { id: 1, content: 'Check phone', isCompleted: false },
  { id: 2, content: 'Verify credentials', isCompleted: false},
  { id: 3, content: 'Check email', isCompleted: false},
];

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: (state, action) => {
      if (action?.payload?.content) {
        const maxId = state.length ? Math.max(...state.map(item => item.id)) : 1;
        action.payload.id = maxId + 1;
        state.push({ ...action.payload, isCompleted: false });
      }
    },
    removeTodo: (state, action) => {
      const newState = state.filter(item => item.id !== action.payload);
      return newState;
    }
  }
});

const selectAllTodos = (state) => state.todos.slice().reverse();

const selectTotalCount = (state) => state.todos.length;

export {
  selectAllTodos,
  selectTotalCount
};
export const { addTodo, removeTodo } = todosSlice.actions;
export default todosSlice.reducer;