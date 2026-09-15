<p align="center">
  <img src="https://senat.mg/wp-content/themes/senat13/images/logo-senat.png" alt="Sénat de Madagascar" width="180" />
</p>

<h1 align="center">Sénat de Madagascar — Portail Web Officiel</h1>

<p align="center">
  Plateforme web officielle de l'institution du Sénat de Madagascar. Ce projet assure la modernisation structurelle, la transparence des travaux parlementaires, l'accessibilité citoyenne et l'optimisation SEO de l'institution.
</p>

---

## 🚀 Technologies & Écosystème

Le projet s'appuie sur une stack front-end moderne orientée composants, alliant performance, accessibilité et animations fluides.

### Core Stack

![Next.js](https://img.shields.io/badge/Next.js-16.2.12-000000?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19.2.7-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-6.0.3-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![pnpm](https://img.shields.io/badge/pnpm-11.20.0-F69220?style=for-the-badge&logo=pnpm&logoColor=white)

### UI & Styling

![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.3.3-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Shadcn UI](https://img.shields.io/badge/Shadcn_UI-4.16.2-000000?style=for-the-badge&logo=shadcnui&logoColor=white)
![Radix UI](https://img.shields.io/badge/Radix_UI-1.6.7-161618?style=for-the-badge&logo=radix-ui&logoColor=white)
![Material UI](https://img.shields.io/badge/Material_UI-9.2.0-007FFF?style=for-the-badge&logo=mui&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-12.43.0-0055FF?style=for-the-badge&logo=framer&logoColor=white)
![GSAP](https://img.shields.io/badge/GSAP-3.15.0-88CE02?style=for-the-badge&logo=greensock&logoColor=white)
![Lenis](https://img.shields.io/badge/Lenis-Smooth_Scroll-000000?style=for-the-badge)

### Tests & Qualité Code

![Cypress](https://img.shields.io/badge/Cypress-15.20.0-17202C?style=for-the-badge&logo=cypress&logoColor=white)
![Playwright](https://img.shields.io/badge/Playwright-1.62.1-2EAD33?style=for-the-badge&logo=playwright&logoColor=white)
![ESLint](https://img.shields.io/badge/ESLint-10.8.0-4B32C3?style=for-the-badge&logo=eslint&logoColor=white)

---

## 📂 Structure du Projet

```text
Senate-Website/
├── .github/                      # Workflows CI/CD & actions GitHub
├── app/                          # Next.js App Router (Pages & Routes)
│   ├── about/                    # Présentation de l'institution
│   │   ├── missions-and-responsibilities/
│   │   ├── president-message/
│   │   ├── reference-texts/
│   │   └── structures/
│   ├── agenda/                   # Calendrier et événements officiels
│   │   └── [slug]/
│   ├── api/                      # Endpoints API (BFF)
│   │   ├── chat/
|   |   ├── live/
|   |   ├── media/
|   |   ├── proxy/
│   │   ├── release/
│   │   └── search/
│   ├── channel-tv-and-radio/     # Vidéos youtube, live, podcast,...
|   |   ├── audio/
|   |   |   └── [slug]/
|   |   ├── live/
|   |   |   ├──  radio/
|   |   |   └── tv/
|   |   ├── montage/
|   |   |   └── [slug]/
|   |   ├── proxy/
│   │   └── video/
│   │       └── [slug]/
│   ├── contact/                  # Formulaire de contact et coordonnées
│   ├── historical/               # Histoire du Sénat
│   │   ├── history/
│   │   └── [slug]/
│   ├── international/            # Groupes d'amitié & diplomatie parlementaire
│   │   ├── inter-parliamentary-friendship-group/
│   │   ├── presidents-activities/
│   │   └── senators-activities/
│   ├── parliamentary-proceedings/  # Travaux et démarches parlementaires
|   |   ├── [slug]/
│   │   └── legislative-proceedings/
│   │       ├── deliberation-and-agenda/
│   │       └── [slug]/
│   ├── press-area/               # Espace presse & actualités
│   │   └── news/
│   │       └── [slug]/
│   ├── search/                   # Moteur de recherche interne
│   ├── texts-and-laws/           # Textes législatifs et lois
|   |   └── [slug]/
│   ├── others/                   # Contenus annexes
|   |   └── [slug]/
│   ├── error.tsx                 # Gestionnaire d'erreurs global
│   ├── layout.tsx                # Structure principale du site
│   ├── loading.tsx               # Interface de chargement
│   ├── not-found.tsx             # Page 404
│   ├── page.tsx                  # Page d'accueil
│   ├── robot.ts                  # Fichier robots.txt dynamique
│   └── sitemap.ts                # Génération dynamique du sitemap SEO
├── components/                   # Composants UI modulaires
│   ├── contact/
│   ├── figma/
│   ├── history/
│   ├── home/
│   ├── international/
│   ├── lenis/                   # Défilement fluide (Smooth Scroll)
│   ├── navigations/             # En-têtes, pieds de page et menus
│   ├── others/
│   ├── parliamentary/
│   ├── press-area/
|   ├── shared/
│   ├── texts-and-laws/
│   └── ui/                      # Composants génériques Shadcn UI
├── constants/                    # Constantes globales
├── cypress/                      # Tests End-to-End avec Cypress
├── docs/                         # Documentation technique du projet
├── hooks/                        # Custom React Hooks
├── lib/                          # Bibliothèques et utilitaires
├── public/                       # Assets statiques (logos, images, favicons)
├── styles/                       # Styles globaux CSS
├── types/                        # Définitions TypeScript
├── utils/                        # Fonctions utilitaires transversales
├── .env.example                  # Exemple des variables d'environnement
├── components.json               # Configuration des composants Shadcn
├── cypress.config.ts             # Configuration de Cypress
├── eslint.config.mjs             # Configuration ESLint
├── next.config.ts                # Configuration Next.js (optimisation images, etc.)
├── LICENSE                       # LICENCE MIT
├── package.json                  # Scripts et dépendances du projet
├── playwright.config.ts          # Configuration de Playwright
├── pnpm-lock.yaml                # Dépéndances pnpm
├── pnpm-workspace.yaml           # workspace pnpm
├── postcss.config.mjs            # Configuration de postcss
└── tsconfig.json                 # Configuration TypeScript
```

## License

This project is proprietary software of the
Sénat de Madagascar / DSIC.

All rights reserved.

Access and modification are restricted to authorized
contributors.