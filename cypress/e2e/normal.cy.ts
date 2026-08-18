/// <reference types="cypress" />

describe('Normal Tests – Interactions & Dynamic Content', () => {
    it('displays President message', () => {
        cy.visit('/about/president-message');
        cy.get('h1').should('contain', 'Message du Président');
        cy.get('.relative.w-48.h-48 img, .rounded-full img').should('be.visible');
        cy.get('.president-content p').should('have.length.at.least', 1);
    });

    it('performs search and shows results', () => {
        cy.visit('/');
        // Utiliser cy.contains sur le bouton avec le texte "Rechercher…"
        cy.contains('button', 'Rechercher…').click();
        // Attendre que l'input de recherche apparaisse
        cy.get('input[type="search"]').should('be.visible').type('Sénat{enter}');
        cy.url().should('include', '/search?q=Sénat');
        cy.get('h1').contains('Résultats de recherche').should('be.visible');
        cy.get('.bg-white\\/10, [class*="result"]').should('exist');
    });

    it('submits contact form with validation', () => {
        cy.visit('/contact');
        cy.get('button[type="submit"]').click();
        // Attendre qu'un message d'erreur apparaisse (classe text-red-400)
        cy.get('.text-red-400', { timeout: 5000 }).should('be.visible');

        cy.get('input[name="name"]').type('John Doe');
        cy.get('input[name="email"]').type('john@example.com');
        cy.get('textarea[name="message"]').type('Test message');
        cy.get('button[type="submit"]').click();
        // Message de succès (text-green-400)
        cy.get('.text-green-400', { timeout: 10000 }).should('be.visible');
    });

    it('loads agenda list and detail', () => {
        cy.visit('/agenda');
        cy.get('h1').contains('Ordre du Jour').should('be.visible');
        cy.get('.bg-white\\/10 a, .card a').should('have.length.at.least', 1);
        cy.get('.bg-white\\/10 a, .card a').first().click();
        cy.url().should('include', '/agenda/');
        cy.get('h1').should('be.visible');
        cy.get('.prose').should('exist');
    });
});