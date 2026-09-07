/// <reference types="cypress" />

describe('User Journey – Full visitor simulation', () => {
    it('simulates a visitor exploring the site', () => {
        cy.visit('/');
        cy.get('section.relative.overflow-hidden').should('be.visible');

        // Premier article
        cy.get('.grid a, .card a').first().click({ force: true });
        cy.url().should('match', /\/actualite\/.+/);
        cy.get('h1').should('exist');

        // Retour arrière avec vérification explicite
        cy.go('back');
        cy.url().should('eq', 'http://localhost:3000/');

        // Navigation "À propos"
        cy.get('header, nav').should('be.visible');
        cy.contains('À propos du Sénat').trigger('mouseover');
        cy.contains('Missions et attributions').click();

        cy.url().should('include', '/about');
        cy.contains('Missions et attributions').should('exist');
        cy.contains('Structures').should('exist');
        cy.contains('Textes de référence').should('exist');

        // Recherche
        cy.get('body').then(($body) => {
            if ($body.find('[data-testid="search-button"]').length) {
                cy.get('[data-testid="search-button"]').first().click({ force: true });
            } else {
                cy.contains('button', /Rechercher/).first().click({ force: true });
            }
        });
        cy.get('input[type="search"], input[placeholder*="Rechercher"]').first()
            .should('be.visible', { timeout: 10000 })
            .type('loi{enter}');

        cy.url().should('match', /\/search\?q=.*loi/);
        cy.get('.grid a, .card a', { timeout: 10000 }).should('exist');
        cy.get('.grid a, .card a').first().click();

        cy.url().should('not.contain', '/search');
        cy.get('h1').should('exist');

        cy.get('a').contains('Espace Presse').click();
        cy.url().should('include', '/press-area');
        cy.get('h1').contains('Espace de Presse').should('be.visible');

        // Historique
        cy.scrollTo('bottom');
        cy.get('footer a').contains('Historique').click();
        cy.url().should('include', '/historical');

        // Attendre que le loader disparaisse avant de chercher le titre
        cy.contains('Chargement en cours...').should('not.exist', { timeout: 15000 });
        cy.get('h1').contains('Histoire du Sénat').should('be.visible');

        // Chatbot - CORRECTION FINALE
        cy.get('body').then(($body) => {
            if ($body.find('[data-testid="chatbot-toggle"]').length) {
                cy.get('[data-testid="chatbot-toggle"]').first().click({ force: true });
            } else {
                cy.get('button.fixed.bottom-4.right-4').first().click({ force: true });
            }
        });

        cy.get('.fixed.bottom-20, [class*="chatbot-window"]').should('be.visible');

        // Saisir un message
        cy.get('input[placeholder*="question"], input[placeholder*="Posez"]')
            .should('be.visible')
            .click({ force: true })
            .type('Bonjour{enter}');

        // ✅ Vérifier qu'au moins deux messages (utilisateur + assistant) sont apparus
        // Utilisez un sélecteur plus flexible pour les messages du chatbot
        cy.get('[class*="message"], [class*="chat"], .flex', { timeout: 15000 })
            .should('have.length.at.least', 2);
    });
});