import React from "react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { render } from "@testing-library/react";

import todosReducer from "../store/todosSlice";

export function renderWithProviders(
  ui,
  { preloadedState = {}, ...renderOptions } = {}
) {
  const store = configureStore({
    reducer: {
      todos: todosReducer,
    },
    preloadedState,
  });
  const Wrapper = ({ children }) => {
    return <Provider store={store}>{children}</Provider>;
  };

  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}
