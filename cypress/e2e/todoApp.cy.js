/* eslint-disable no-undef */
describe('todo app page', () => {
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
    const newTodoContent = 'Task 1';
    let inputForTodoContent = cy.get('input:not([disabled])[type="text"]');

    inputForTodoContent.type(newTodoContent);
    inputForTodoContent.type('{enter}');
    const disabledInputForCreatedTodo = cy.get('input[disabled][type="text"]');
    inputForTodoContent = cy.get('input:not([disabled])[type="text"]');

    disabledInputForCreatedTodo.should('exist');
    // disabledInputForCreatedTodo.should('have.value', newTodoContent);
    inputForTodoContent.should('have.value', '');
  });

  it('should remove todo', () => {
    const newTodoContent = 'Task for deletion';
    let inputForTodoContent = cy.get('input:not([disabled])[type="text"]');
    inputForTodoContent.type(newTodoContent);
    inputForTodoContent.type('{enter}');
    let disabledInputForCreatedTodo = cy.get('input[disabled][type="text"]');
    disabledInputForCreatedTodo.should('exist');
    disabledInputForCreatedTodo.should('have.value', newTodoContent);

    const deleteButton = disabledInputForCreatedTodo.next('button');
    deleteButton.click();

    disabledInputForCreatedTodo = cy.get('input[disabled][type="text"]');
    disabledInputForCreatedTodo.should('not.exist');
  });
})
