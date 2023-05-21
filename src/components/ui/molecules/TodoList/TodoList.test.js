import userEvent from "@testing-library/user-event";
import { screen, waitFor } from "@testing-library/react";

import { renderWithProviders } from "../../../../utils/test-utils";
import TodoList from "./TodoList";

const todoTileTestId = 'todo-tile-test-id';
const todoTileToggleButtonTestId = 'todo-tile-toggle-button-test-id';
const todoTileRemoveButtonTestId = 'todo-tile-remove-button-test-id';

jest.mock('../TodoTile/TodoTile', () => {
  const TodoTileMock = ({ onToggleTodo, onRemoveTodo }) =>
    <div data-testid={todoTileTestId}>
      <button data-testid={todoTileToggleButtonTestId} onClick={onToggleTodo}></button>
      <button data-testid={todoTileRemoveButtonTestId} onClick={onRemoveTodo}></button>
    </div>;

  return TodoTileMock;
});

const getInitialTodos = () => [
  {
    id: 1,
    content: 'first content',
    isCompleted: false
  }
];

describe('TodoList:', () => {
  const initialTodosState = {
    todoItems: [...getInitialTodos()]
  };
  const renderTodoList = () =>
    renderWithProviders(<TodoList todos={initialTodosState.todoItems} />, {
      preloadedState: {
        todos: initialTodosState
      }
    });

  beforeEach(() => {
    initialTodosState.todoItems = [...getInitialTodos()];
  });

  test('should render header with content if no todos', () => {
    initialTodosState.todoItems = [];
    renderTodoList();
    const heading = screen.getByRole('heading');
    const tiles = screen.queryAllByTestId(todoTileTestId);

    expect(heading).toBeInTheDocument();
    expect(heading).toHaveClass('NoContent');
    expect(tiles.length).toBe(0);
  });

  test('should render list with items for each passed todo', () => {
    renderTodoList();
    const tiles = screen.getAllByTestId(todoTileTestId);

    expect(tiles.length).toBe(initialTodosState.todoItems.length);
  });

  test('should not render header with content when todos exist', () => {
    renderTodoList();
    const heading = screen.queryByText('There are no  todos yet');

    expect(heading).not.toBeInTheDocument();
  });

  test('should remove tile from list after triggering onRemoveTodo', async () => {
    const { store, rerender } = renderTodoList();
    const buttonToTriggerRemove = screen.getByTestId(todoTileRemoveButtonTestId);

    await userEvent.click(buttonToTriggerRemove);
    rerender(<TodoList todos={store.getState().todos.totoItems} />)

    const todoTiles = screen.queryAllByTestId(todoTileTestId);

    expect(todoTiles.length).toBe(0);
  });
});
