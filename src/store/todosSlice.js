import { createSlice } from '@reduxjs/toolkit';

const initialState = [
  { id: 1, content: 'Check phone'},
  { id: 2, content: 'Verify credentials'},
];

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: (state, action) => {
      if (action) {
        const maxId = Math.max(...state.map(item => item.id))
        action.payload.id = maxId + 1;
        state.push(action.payload);
      }
    },
    removeTodo: (state, action) => {
      if (action) {
        state = state.filter(item => item.id !== action.id);
      }
    }
  }
});


const selectAllTodos = (state) => state.todos;

const selectTotalCount = (state) => state.todos.length;

export {
  selectAllTodos,
  selectTotalCount
};
export const { addTodo, removeTodo } = todosSlice.actions;
export default todosSlice.reducer;