import { configureStore } from '@reduxjs/toolkit';

import TodoKey from '../constants/LocalStorageKeys';
import getRepository from './../data/repository';
import todosReducer from './todosSlice';

const repository = getRepository(TodoKey);
const store = configureStore({
  reducer: {
    todos: todosReducer
  }
});

store.subscribe(() => repository.save(store.getState()));

export default store;
