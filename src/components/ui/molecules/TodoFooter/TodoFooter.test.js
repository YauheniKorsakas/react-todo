import userEvent from "@testing-library/user-event";
import { screen } from "@testing-library/react";

import { renderWithProviders } from "../../../../utils/test-utils";
import TodoFooter from "./TodoFooter";
import Filters from "../../../../constants/Filters";

describe('TodoFooter:', () => {
  const selectedClassName = 'Selected';
  const initialTodosState = {
    filter: Filters.All,
    todoItems: [
      { id: 1, content: 'First', isCompleted: false }
    ]
  };
  const renderFooter = () => {
    renderWithProviders(<TodoFooter />, {
      preloadedState: {
        todos: initialTodosState
      }
    });
  };

  test('should render successfuly', () => {
    renderFooter();
    const footer = screen.getByRole('contentinfo');

    expect(footer).toBeInTheDocument();
  });

  test('should render count of left items', () => {
    const leftItemsCount = initialTodosState.todoItems.length;

    renderFooter();
    const span = screen.getByText(/items left/);
    const spanTextContent = `${leftItemsCount} items left`;

    expect(span).toBeInTheDocument();
    expect(span.textContent).toBe(spanTextContent);
  });

  test('button for `All` status should update class of the button', () => {
    initialTodosState.filter = Filters.Completed;
    renderFooter();
    const button = screen.getByText('All');
    const buttonInitiallyContainsSelectedClass = button.className.includes(selectedClassName);

    userEvent.click(button);

    expect(buttonInitiallyContainsSelectedClass).toBeFalsy();
    expect(button.className.includes(selectedClassName)).toBeTruthy();
  });

  test('button for `Active` status should update class of the button', () => {
    initialTodosState.filter = Filters.Completed;
    renderFooter();
    const button = screen.getByText('Active');
    const buttonInitiallyContainsSelectedClass = button.className.includes(selectedClassName);

    userEvent.click(button);

    expect(buttonInitiallyContainsSelectedClass).toBeFalsy();
    expect(button.className.includes(selectedClassName)).toBeTruthy();
  });

  test('button for `Completed` status should update class of the button', () => {
    initialTodosState.filter = Filters.All;
    renderFooter();
    const button = screen.getByText('Completed');
    const buttonInitiallyContainsSelectedClass = button.className.includes(selectedClassName);

    userEvent.click(button);

    expect(buttonInitiallyContainsSelectedClass).toBeFalsy();
    expect(button.className.includes(selectedClassName)).toBeTruthy();
  });
});
