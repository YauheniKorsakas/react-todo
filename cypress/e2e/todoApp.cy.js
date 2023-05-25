/* eslint-disable no-undef */
describe('todo app page', () => {
  const todoContent = 'NewTodoContent';
  const firstTodoContent = `${todoContent}1`;
  const secondTodoContent = `${todoContent}2`;
  const todoInputSelector = 'input:not([disabled])[type="text"]';

  const createNewTodo = (content = todoContent) => {
    let inputForTodoContent = cy.get(todoInputSelector);
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
    const inputForTodoContent = cy.get(todoInputSelector);
    inputForTodoContent.should('have.value', '');

    const containerForCreatedTodo = cy.contains('span', todoContent);
    containerForCreatedTodo.should('exist');
    containerForCreatedTodo.should('contain', todoContent);
  });

  it('should remove todo', () => {
    createNewTodo();
    let createdTodoContainer = cy.contains('span', todoContent);
    createdTodoContainer.should('exist');
    createdTodoContainer.should('contain', todoContent);

    const deleteButton = createdTodoContainer.next('button');
    deleteButton.click();

    createdTodoContainer = cy.contains('span', todoContent);
    createdTodoContainer.should('not.exist');
  });

  it('should clear completed todos', () => {
    createNewTodo();

    let labelForCreatedTodo = cy.get('input:not([disabled])[type="checkbox"]').next();
    labelForCreatedTodo.should('exist');
    labelForCreatedTodo.click();

    const clearCompletedButton = cy.contains('button', /clear completed/i);
    clearCompletedButton.should('exist');
    clearCompletedButton.click();

    let containerForTodo = cy.contains('span', todoContent);
    containerForTodo.should('not.exist');
  });

  it('should display correct items count and tiles for `All` filter', () => {
    createNewTodo(firstTodoContent);
    createNewTodo(secondTodoContent);

    const allFilterButton = cy.contains('button', 'All');
    allFilterButton.click();

    const todoCountContainer = cy.contains('span', /2 items left/i);
    todoCountContainer.should('exist');
    const containersForTodos = cy
      .get('span')
      .filter(`:contains(${firstTodoContent}), :contains(${secondTodoContent})`);
    containersForTodos.should('have.length', 2);
  });

  it('should display correct items count and tiles for `Active` filter', () => {
    createNewTodo(firstTodoContent);
    createNewTodo(secondTodoContent);

    const allFilterButton = cy.contains('button', 'Active');
    allFilterButton.click();

    const todoCountContainer = cy.contains('span', /2 items left/i);
    todoCountContainer.should('exist');
    const containersForTodos = cy
      .get('span')
      .filter(`:contains(${firstTodoContent}), :contains(${secondTodoContent})`);
    containersForTodos.should('have.length', 2);
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
    const containersForTodos = cy
      .get('span')
      .filter(`:contains(${firstTodoContent}), :contains(${secondTodoContent})`);
    containersForTodos.should('have.length', 1);
  });
})
