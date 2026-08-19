import './commands';
import './accessibility';
import 'cypress-axe';

Cypress.on('uncaught:exception', (err) => {
    if (err.message.includes('Hydration failed') ||
        err.message.includes('Minified React error #418') ||
        err.message.includes('Minified React error #423') ||
        err.message.includes('ResizeObserver loop')) {
        return false;
    }
    return true;
});

Cypress.config('defaultCommandTimeout', 15000);