import { queryHelpers, screen } from "@testing-library/react";

import { renderWithProviders } from "../../../../utils/test-utils";
import TodoList from "./TodoList";

describe('TodoList:', () => {
  test('should render header with content if no todos', () => {
    renderWithProviders(<TodoList todos={[]} />);
    const heading = screen.queryByRole('heading');
    
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveClass('NoContent');
  });

  test('should render list with items for each passed todo', () => {
    const todos = [
      {
        id: 1,
        content: 'first content',
        isCompleted: false
      },
      {
        id: 2,
        content: 'second content',
        isCompleted: true
      }
    ];

    renderWithProviders(<TodoList todos={todos} />);

  });
});
