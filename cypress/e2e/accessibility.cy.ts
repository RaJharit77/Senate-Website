/// <reference types="cypress" />
/// <reference types="cypress-axe" />

describe('Tests d\'accessibilité', () => {
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
    cy.intercept('GET', '**/*twitter*.com/**', { statusCode: 204, body: '' });
    cy.intercept('GET', '**/*instagram*.com/**', { statusCode: 204, body: '' });

    cy.injectAxe();
  });

  const hideIframes = () => {
    cy.window().then((win) => {
      const style = win.document.createElement('style');
      style.innerHTML = 'iframe { display: none !important; }';
      win.document.head.appendChild(style);
    });
  };

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

  const mainSelector = 'main';

  it('vérifie l\'accessibilité de la page d\'accueil', () => {
    cy.visit('/');
    hideIframes();
    cy.wait(500);
    cy.checkA11y(mainSelector, axeOptions);
  });

  it('vérifie l\'accessibilité de la page À propos', () => {
    cy.visit('/about');
    hideIframes();
    cy.wait(500);
    cy.checkA11y(mainSelector, axeOptions);
  });

  it('vérifie l\'accessibilité de la page Contact', () => {
    cy.visit('/contact');
    cy.wait(500);
    cy.checkA11y(mainSelector, axeOptions);
  });

  it('vérifie l\'accessibilité du formulaire de contact', () => {
    cy.visit('/contact');
    cy.wait(500);
    cy.checkA11y('form', axeOptions);
  });
});