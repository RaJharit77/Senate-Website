/// <reference types="cypress" />

describe('Normal Tests – Interactions & Dynamic Content', () => {
    it('displays President message', () => {
        cy.visit('/about/president-message');
        cy.get('h1').should('contain', 'Président');
        cy.get('.relative.w-48.h-48 img, .rounded-full img').should('be.visible');
        cy.get('.president-content p').should('have.length.at.least', 1);
    });

    it('performs search and shows results', () => {
        cy.visit('/');

        // Étape 1 : Ouvrir la barre de recherche en cliquant sur le bouton contenant "Rechercher"
        cy.contains('button', /Rechercher/).first().click({ force: true });

        // Étape 2 : Trouver l'input de recherche par son placeholder (plus fiable que data-testid)
        cy.get('input[type="search"], input[placeholder*="Rechercher"]').first()
            .should('be.visible', { timeout: 10000 })
            .type('Sénat{enter}'); // Taper le texte + valider avec Entrée

        // Vérifications finales
        cy.url().should('include', '/search');
        cy.contains('Sénat').should('be.visible');

        // Vérification de l'URL encodée (si vous voulez absolument garder votre regex)
        cy.url().then((url) => {
            expect(decodeURIComponent(url)).to.match(/\/search\?q=.*Sénat/);
        });
    });

    it('submits contact form with validation', () => {
        cy.intercept('POST', '**/wp-json/contact-form-7/v1/contact-forms/*/feedback', {
            statusCode: 200,
            body: { status: 'mail_sent', message: 'Votre message a bien été envoyé.' },
        }).as('contactSubmit');

        cy.visit('/contact');
        cy.get('[data-testid="contact-submit"], button[type="submit"]').first().click();
        cy.get('[class*="text-red"], [class*="error"]', { timeout: 5000 }).should('be.visible');

        cy.get('[data-testid="contact-name"], input[name="name"]').first().type('John Doe');
        cy.get('[data-testid="contact-email"], input[name="email"]').first().type('john@example.com');
        cy.get('[data-testid="contact-message"], textarea[name="message"]').first().type('Test message');
        cy.get('[data-testid="contact-submit"], button[type="submit"]').first().click();
        cy.wait('@contactSubmit');
        cy.get('[class*="text-green"], [class*="success"]', { timeout: 10000 }).should('be.visible');
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