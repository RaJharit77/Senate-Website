import './commands';
import './accessibility';
import 'cypress-axe';

// Ignorer les erreurs React non capturées (Minified React error #418)
Cypress.on('uncaught:exception', (err) => {
    if (err.message.includes('Minified React error #418')) {
        return false; // empêche Cypress de faire échouer le test
    }
    return true;
});