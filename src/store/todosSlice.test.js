import { configureStore } from '@reduxjs/toolkit';
import Filters from '../constants/Filters';
import todoReducer, {
  addTodo,
  changeFilter,
  clearCompletedTodos,
  removeTodo,
  reorderTodos,
  selectTodosCountByFilter,
  toggleTodo
} from './todosSlice';

describe('todosSlice:', () => {
  test('addTodo action should add new todo', () => {
    const todoContent = 'todocontent';
    const store = configureStore({
      reducer: todoReducer,
      preloadedState: {
        filter: '',
        todoItems: []
      }
    });

    store.dispatch(addTodo({ content: todoContent }));

    const expectedState = {
      filter: '',
      todoItems: [
        { id: 1, content: todoContent, isCompleted: false }
      ]
    };

    expect(store.getState()).toEqual(expectedState);
  });

  test('removeTodo action should remove item from store', () => {
    const store = configureStore({
      reducer: todoReducer,
      preloadedState: {
        filter: '',
        todoItems: [
          { id: 1, content: 'some content', isCompleted: false }
        ]
      }
    });

    store.dispatch(removeTodo(1));

    const expectedState = {
      filter: '',
      todoItems: []
    };

    expect(store.getState()).toEqual(expectedState);
  });

  test('clearCompletedTodos action should remove all completed items from store', () => {
    const store = configureStore({
      reducer: todoReducer,
      preloadedState: {
        filter: '',
        todoItems: [
          { id: 1, content: 'some content', isCompleted: false },
          { id: 2, content: 'some content', isCompleted: true },
          { id: 3, content: 'some content', isCompleted: true },
        ]
      }
    });

    store.dispatch(clearCompletedTodos());
    const expectedState = {
      filter: '',
      todoItems: [
        { id: 1, content: 'some content', isCompleted: false }
      ]
    }

    expect(store.getState()).toEqual(expectedState);
  });

  test('toggleTodo action should change completed status of todo', () => {
    const store = configureStore({
      reducer: todoReducer,
      preloadedState: {
        filter: '',
        todoItems: [
          { id: 1, content: 'some content', isCompleted: false }
        ]
      }
    });

    store.dispatch(toggleTodo(1));
    const expectedState = {
      filter: '',
      todoItems: [
        { id: 1, content: 'some content', isCompleted: true }
      ]
    }

    expect(store.getState()).toEqual(expectedState);
  });

  test('changeFilter action should change current filter of todos', () => {
    const store = configureStore({
      reducer: todoReducer,
      preloadedState: {
        filter: Filters.All,
        todoItems: [
          { id: 1, content: 'some content', isCompleted: false }
        ]
      }
    });

    store.dispatch(changeFilter(Filters.Active));
    const expectedState = {
      filter: Filters.Active,
      todoItems: [
        { id: 1, content: 'some content', isCompleted: false }
      ]
    }

    expect(store.getState()).toEqual(expectedState);
  });

  test('reorderTodos action should reorder todos when filter is `All`', () => {
    const store = configureStore({
      reducer: todoReducer,
      preloadedState: {
        filter: Filters.All,
        todoItems: [
          { id: 1, content: 'some content', isCompleted: false },
          { id: 2, content: 'some content', isCompleted: false }
        ]
      }
    });
    const payload = {
      dragIndex: 0,
      dropIndex: 1,
      todos: store.getState().todoItems
    };

    store.dispatch(reorderTodos(payload));
    
    const expectedTodos = [
      { id: 2, content: 'some content', isCompleted: false },
      { id: 1, content: 'some content', isCompleted: false }
    ];
    expect(store.getState().todoItems).toEqual(expectedTodos);
  });

  test('reorderTodos action should reorder todos when filter is `Active`', () => {
    const store = configureStore({
      reducer: todoReducer,
      preloadedState: {
        filter: Filters.Active,
        todoItems: [
          { id: 1, content: 'some content', isCompleted: false },
          { id: 2, content: 'some content', isCompleted: false }
        ]
      }
    });
    const payload = {
      dragIndex: 0,
      dropIndex: 1,
      todos: store.getState().todoItems
    };

    store.dispatch(reorderTodos(payload));
    
    const expectedTodos = [
      { id: 2, content: 'some content', isCompleted: false },
      { id: 1, content: 'some content', isCompleted: false }
    ];
    expect(store.getState().todoItems).toEqual(expectedTodos);
  });

  test('selectTodosCountByFilter selector should return length items for All filter', () => {
    const store = configureStore({
      reducer: todoReducer,
      preloadedState: {
        todos: {
          filter: Filters.All,
          todoItems: [
            { id: 1, content: 'some content', isCompleted: false }
          ]
        }
      }
    });

    const result = selectTodosCountByFilter(store.getState());

    expect(result).toEqual(1);
  });

  test('selectTodosCountByFilter selector should return length items for Active filter', () => {
    const store = configureStore({
      reducer: todoReducer,
      preloadedState: {
        todos: {
          filter: Filters.Active,
          todoItems: [
            { id: 1, content: 'some content', isCompleted: false }
          ]
        }
      }
    });

    const result = selectTodosCountByFilter(store.getState());

    expect(result).toEqual(1);
  });

  test('selectTodosCountByFilter selector should return length items for Completed filter', () => {
    const store = configureStore({
      reducer: todoReducer,
      preloadedState: {
        todos: {
          filter: Filters.Completed,
          todoItems: [
            { id: 1, content: 'some content', isCompleted: false }
          ]
        }
      }
    });

    const result = selectTodosCountByFilter(store.getState());

    expect(result).toEqual(0);
  });

  test('selectTodosByFilter selector should return todos for All filter', () => {
    const store = configureStore({
      reducer: todoReducer,
      preloadedState: {
        todos: {
          filter: Filters.Completed,
          todoItems: [
            { id: 1, content: 'some content', isCompleted: false }
          ]
        }
      }
    });

    const result = selectTodosCountByFilter(store.getState());

    expect(result).toEqual(0);
  });
});