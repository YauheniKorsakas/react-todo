/* eslint-disable no-undef */
describe('todo app page', () => {
  const todoContent = 'NewTodoContent';
  const firstTodoContent = `${todoContent}1`;
  const secondTodoContent = `${todoContent}2`;

  const createNewTodo = (content = todoContent) => {
    let inputForTodoContent = cy.get('input:not([disabled])[type="text"]');
    inputForTodoContent.type(content);
    inputForTodoContent.type('{enter}');
  };

  beforeEach(() => {
    localStorage.clear();
    const url = 'http://localhost:3000';
    cy.visit(url);
  });

  it('h1 should contain correct text', () => {
    const element = cy.get("h1");

    element.contains(/todo/i);
  });

  it('should create new todo', () => {
    createNewTodo();
    const inputForTodoContent = cy.get('input:not([disabled])[type="text"]');
    inputForTodoContent.should('have.value', '');

    const disabledInputForCreatedTodo = cy.get('input[disabled][type="text"]');
    disabledInputForCreatedTodo.should('exist');
    disabledInputForCreatedTodo.should('have.value', todoContent);
  });

  it('should remove todo', () => {
    createNewTodo();
    let disabledInputForCreatedTodo = cy.get('input[disabled][type="text"]');
    disabledInputForCreatedTodo.should('exist');
    disabledInputForCreatedTodo.should('have.value', todoContent);

    const deleteButton = disabledInputForCreatedTodo.next('button');
    deleteButton.click();

    disabledInputForCreatedTodo = cy.get('input[disabled][type="text"]');
    disabledInputForCreatedTodo.should('not.exist');
  });

  it('should clear completed todos', () => {
    createNewTodo();

    let labelForCreatedTodo = cy.get('input:not([disabled])[type="checkbox"]').next();
    labelForCreatedTodo.should('exist');
    labelForCreatedTodo.click();

    const clearCompletedButton = cy.contains('button', /clear completed/i);
    clearCompletedButton.should('exist');
    clearCompletedButton.click();

    let checkboxForCreatedTodo = cy.get('input:not([disabled])[type="checkbox"]');
    checkboxForCreatedTodo.should('not.exist');
  });

  it('should display correct items count and tiles for `All` filter', () => {
    createNewTodo(firstTodoContent);
    createNewTodo(secondTodoContent);

    const allFilterButton = cy.contains('button', 'All');
    allFilterButton.click();

    const todoCountContainer = cy.contains('span', /2 items left/i);
    todoCountContainer.should('exist');
    const inputsForTodos = cy.get('input[disabled][type="text"]');
    inputsForTodos.should('have.length', 2);
  });

  it('should display correct items count and tiles for `Active` filter', () => {
    createNewTodo(firstTodoContent);
    createNewTodo(secondTodoContent);

    const allFilterButton = cy.contains('button', 'Active');
    allFilterButton.click();

    const todoCountContainer = cy.contains('span', /2 items left/i);
    todoCountContainer.should('exist');
    const inputsForTodos = cy.get('input[disabled][type="text"]');
    inputsForTodos.should('have.length', 2);
  });

  it('should display correct items count and tiles on `Completed` filter', () => {
    createNewTodo(firstTodoContent);
    createNewTodo(secondTodoContent);

    const allFilterButton = cy.contains('button', 'Active');
    allFilterButton.click();

    let labelForFirstCreatedTodo = cy
      .get('input:not([disabled])[type="checkbox"]')
      .eq(0)
      .next();
    labelForFirstCreatedTodo.click();

    const completedFilterButton = cy.contains('button', 'Completed');
    completedFilterButton.click();

    const todoCountContainer = cy.contains('span', /1 items left/i);
    todoCountContainer.should('exist');
    const inputsForTodos = cy.get('input[disabled][type="text"]');
    inputsForTodos.should('have.length', 1);
  });
})
