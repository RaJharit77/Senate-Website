/// <reference types="cypress" />

describe('Normal Tests – Interactions & Dynamic Content', () => {
    it('displays President message', () => {
        cy.visit('/about/president-message');
        cy.get('h1').should('contain', 'Message du Président');
        cy.get('[data-testid="president-photo"]').should('be.visible');
        cy.get('.president-content p').should('have.length.at.least', 1);
    });

    it('performs search and shows results', () => {
        cy.visit('/');
        cy.get('[data-testid="search-button"]').click();
        cy.get('input[type="search"]').type('Sénat{enter}');
        cy.url().should('include', '/search?q=Sénat');
        cy.get('h1').contains('Résultats de recherche').should('be.visible');
        cy.get('[data-testid="search-results"]').should('exist');
        cy.get('[data-testid="search-results"] a').should('have.length.at.least', 0);
    });

    it('submits contact form with validation', () => {
        cy.visit('/contact');
        cy.get('button[type="submit"]').click();
        // error message should appear
        cy.get('[data-testid="error-message"]').should('be.visible');

        cy.get('input[name="name"]').type('John Doe');
        cy.get('input[name="email"]').type('john@example.com');
        cy.get('textarea[name="message"]').type('Test message');
        cy.get('button[type="submit"]').click();
        cy.get('[data-testid="success-message"]', { timeout: 10000 }).should('be.visible');
    });

    it('loads agenda list and detail', () => {
        cy.visit('/agenda');
        cy.get('h1').contains('Ordre du Jour').should('be.visible');
        cy.get('[data-testid="agenda-list"] a').should('have.length.at.least', 1);
        cy.get('[data-testid="agenda-list"] a').first().click();
        cy.url().should('include', '/agenda/');
        cy.get('h1').should('be.visible');
        cy.get('.prose').should('exist');
    });
});