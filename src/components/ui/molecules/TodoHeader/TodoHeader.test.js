import userEvent from "@testing-library/user-event";
import { screen } from "@testing-library/react";

import TodoHeader from "./TodoHeader";
import { renderWithProviders } from "../../../../utils/test-utils";

describe('TodoHeader:', () => {
  test('should render successfully', () => {
    renderWithProviders(<TodoHeader />);
    const header = screen.queryByRole('banner');
    
    expect(header).toBeInTheDocument();
  });

  test('should render heading with correct content', () => {
    renderWithProviders(<TodoHeader />);
    const heading = screen.queryByRole('heading');
    
    expect(heading).toBeInTheDocument();
    expect(heading.textContent).toMatch(/todo/i);
  });

  test('should render input', () => {
    renderWithProviders(<TodoHeader />);
    const input = screen.queryByRole('textbox');

    expect(input).toBeInTheDocument();
    expect(input.value).toBe('');
    expect(input.placeholder).toMatch(/Write your todo here.../i);
  });

  test('input should reset its value after pressing enter', async () => {
    renderWithProviders(<TodoHeader />);
    const input = screen.queryByRole('textbox');
    const initialInputValue = 'initial input value';

    userEvent.type(input, initialInputValue);
    await userEvent.keyboard('{enter}'); 

    expect(input.value).toBe('');
  });

  test('input should dispatch action to add new item into state after pressing enter', async () => {
    const {store} = renderWithProviders(<TodoHeader />, {
      preloadedState: {
        todos: {
          todoItems: []
        }
      }
    });
    const input = screen.queryByRole('textbox');
    const valueToSave = 'Some value to save';
    
    userEvent.type(input, valueToSave);
    await userEvent.keyboard('{enter}');

    expect(store.getState().todos.todoItems.length).toBe(1);
  });
});
