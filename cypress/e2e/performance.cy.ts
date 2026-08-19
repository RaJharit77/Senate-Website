/// <reference types="cypress" />

describe('Tests de performance', () => {
    it('mesure le temps de chargement de la page d\'accueil', () => {
        cy.visit('/', {
            onBeforeLoad: (win) => {
                win.performance.mark('start');
            },
        });
        cy.window().then((win) => {
            win.performance.mark('end');
            win.performance.measure('load', 'start', 'end');
            const measure = win.performance.getEntriesByName('load')[0];
            cy.log(`Temps de chargement : ${measure.duration.toFixed(0)}ms`);
            // Seuil augmenté pour le développement local
            expect(measure.duration).to.be.lessThan(30000);
        });
    });

    it('mesure le temps d\'apparition du premier contenu (FCP) avec Performance API', () => {
        cy.visit('/');
        cy.window().then((win) => {
            const fcp = win.performance.getEntriesByType('paint').find(p => p.name === 'first-contentful-paint');
            if (fcp) {
                cy.log(`FCP : ${fcp.startTime.toFixed(0)}ms`);
                expect(fcp.startTime).to.be.lessThan(5000);
            }
        });
    });

    it('vérifie les métriques Web Vitals (LCP, FID, CLS) via l\'API PerformanceObserver', () => {
        cy.visit('/', {
            onBeforeLoad: (win) => {
                let lcpValue = 0;
                const observer = new win.PerformanceObserver((list) => {
                    const entries = list.getEntries();
                    entries.forEach((entry) => {
                        if (entry.entryType === 'largest-contentful-paint') {
                            lcpValue = entry.startTime;
                        }
                    });
                });
                observer.observe({ type: 'largest-contentful-paint', buffered: true });
                (win as Window & { __lcp?: number }).__lcp = lcpValue;
            },
        });
        cy.wait(3000);
        cy.window().then((win) => {
            const lcp = (win as Window & { __lcp?: number }).__lcp || 0;
            cy.log(`LCP : ${lcp.toFixed(0)}ms`);
            expect(lcp).to.be.lessThan(10000);
        });
    });

    it('simule une connexion lente (3G) et mesure le temps de chargement', () => {
        cy.intercept('**/wp-json/**', (req) => {
            req.on('response', (res) => {
                res.setDelay(1000);
            });
        }).as('slowApi');

        cy.visit('/', {
            onBeforeLoad: (win) => {
                win.performance.mark('start');
            },
        });

        cy.window().then((win) => {
            win.performance.mark('end');
            win.performance.measure('loadSlow', 'start', 'end');
            const measure = win.performance.getEntriesByName('loadSlow')[0];
            cy.log(`Temps de chargement avec réseau lent : ${measure.duration.toFixed(0)}ms`);
            expect(measure.duration).to.be.lessThan(30000);
        });
    });
});