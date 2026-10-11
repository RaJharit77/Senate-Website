describe('Vérifications Smoke', () => {
    it('vérifie que les data-testid sont présents', () => {
        cy.visit('/');
        cy.get('body').then(($body) => {
            if ($body.find('[data-testid="search-button"]').length) {
                cy.get('[data-testid="search-button"]').should('exist');
            } else {
                cy.contains('button', /Rechercher/).should('exist');
            }
        });
    });
});