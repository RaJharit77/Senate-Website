/// <reference types="cypress" />
/// <reference types="cypress-axe" />

describe('Tests d\'accessibilité (locaux uniquement)', () => {
  const isCI = process.env.CI === 'true';
  const testFn = isCI ? it.skip : it;

  before(() => {
    Cypress.config('screenshotOnRunFailure', false);
  });

  after(() => {
    Cypress.config('screenshotOnRunFailure', true);
  });

  beforeEach(() => {
    cy.intercept('GET', '**/*youtube*.com/**', { statusCode: 204, body: '' });
    cy.intercept('GET', '**/*ytimg.com/**', { statusCode: 204, body: '' });
    cy.intercept('GET', '**/*facebook*.com/**', { statusCode: 204, body: '' });
    cy.intercept('GET', '**/*fbcdn.net/**', { statusCode: 204, body: '' });

    cy.injectAxe();
  });

  const axeOptions = {
    runOnly: {
      type: 'tag' as const,
      values: ['wcag2a'],
    },
    rules: {
      'color-contrast': { enabled: false },
      'page-has-heading-one': { enabled: false },
      'region': { enabled: false },
    },
  };

  testFn('vérifie l\'accessibilité de la page d\'accueil', () => {
    cy.visit('/');
    cy.wait(500);
    cy.checkA11y('main', axeOptions);
  });

  testFn('vérifie l\'accessibilité de la page À propos', () => {
    cy.visit('/about');
    cy.wait(500);
    cy.checkA11y('main', axeOptions);
  });

  testFn('vérifie l\'accessibilité de la page Contact', () => {
    cy.visit('/contact');
    cy.wait(500);
    cy.checkA11y('main', axeOptions);
  });

  testFn('vérifie l\'accessibilité du formulaire de contact', () => {
    cy.visit('/contact');
    cy.wait(500);
    cy.checkA11y('form', axeOptions);
  });
});