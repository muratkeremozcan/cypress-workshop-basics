/// <reference types="cypress" />
/// <reference path="../../custom-commands.d.ts" />
// require('cypress-pipe')
import { resetData, visitSite } from '../../support/utils'

beforeEach(resetData)
beforeEach(visitSite)

// simple custom command
Cypress.Commands.add('createTodo', (todo) => {
  cy.get('.new-todo').type(`${todo}{enter}`)
})

// with full command log
Cypress.Commands.add('createTodo', (todo) => {
  Cypress.log({
    name: 'create todo',
    message: todo,
    consoleProps() {
      return {
        'Create todo yo yo': todo
      }
    }
  })

  cy.get('.new-todo', { log: false })
    .type(`${todo}{enter}`, { log: false })
})

it('creates a todo', () => {
  cy.createTodo('my first todo')
})
