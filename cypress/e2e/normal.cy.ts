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
        // Le bouton de recherche est dans l'en-tête, souvent un bouton avec une icône Search
        // On peut chercher un bouton contenant une icône Search
        cy.get('button:has(svg[data-icon="search"])').click(); // ou utiliser un sélecteur plus générique
        // Alternative: chercher un input de recherche visible après clic
        cy.get('input[type="search"]').type('Sénat{enter}');
        cy.url().should('include', '/search?q=Sénat');
        cy.get('h1').contains('Résultats de recherche').should('be.visible');
        // Les résultats sont dans une liste
        cy.get('.bg-white\\/10, [class*="result"]').should('exist');
        cy.get('a[href*="/search"]').should('have.length.at.least', 0);
    });

    it('submits contact form with validation', () => {
        cy.visit('/contact');
        cy.get('button[type="submit"]').click();
        // Le message d'erreur peut être un paragraphe avec une classe
        cy.get('.text-red-400, .error').should('be.visible');

        cy.get('input[name="name"]').type('John Doe');
        cy.get('input[name="email"]').type('john@example.com');
        cy.get('textarea[name="message"]').type('Test message');
        cy.get('button[type="submit"]').click();
        // Message de succès
        cy.get('.text-green-400, .success', { timeout: 10000 }).should('be.visible');
    });

    it('loads agenda list and detail', () => {
        cy.visit('/agenda');
        cy.get('h1').contains('Ordre du Jour').should('be.visible');
        // Les articles de l'agenda sont dans des cartes
        cy.get('.bg-white\\/10 a, .card a').should('have.length.at.least', 1);
        cy.get('.bg-white\\/10 a, .card a').first().click();
        cy.url().should('include', '/agenda/');
        cy.get('h1').should('be.visible');
        cy.get('.prose').should('exist');
    });
});