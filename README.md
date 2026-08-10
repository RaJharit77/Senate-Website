# 🇲🇬 Sénat de Madagascar - Portail Web Officiel (`senat-web-site`)

Ce projet constitue l'interface front-end du portail officiel du Sénat de Madagascar. Conçu pour assurer la modernisation structurelle de l'institution sur le web, il est optimisé pour les performances de rendu, l'accessibilité citoyenne et le référencement (SEO). L'application gère de multiples domaines allant des travaux parlementaires à l'agenda officiel, en passant par les actualités et les textes de loi.

---

## 🚀 Technologies et Écosystème

Le projet repose sur une stack moderne orientée composants, alliant un rendu hybride performant et des animations fluides.

### Cœur du Projet
![Next.js](https://img.shields.io/badge/Next.js-16.2.12-000000?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19.2.7-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-6.0.3-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![pnpm](https://img.shields.io/badge/pnpm-11.20.0-F69220?style=for-the-badge&logo=pnpm&logoColor=white)

### Interface & Styles (UI/UX)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.3.3-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Radix UI](https://img.shields.io/badge/Radix_UI-1.6.7-161618?style=for-the-badge&logo=radix-ui&logoColor=white)
![Material UI](https://img.shields.io/badge/Material_UI-9.2.0-007FFF?style=for-the-badge&logo=mui&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-12.43.0-0055FF?style=for-the-badge&logo=framer&logoColor=white)
![GSAP](https://img.shields.io/badge/GSAP-3.15.0-88CE02?style=for-the-badge&logo=greensock&logoColor=white)

### Tests & Assurance Qualité
![Cypress](https://img.shields.io/badge/Cypress-15.20.0-17202C?style=for-the-badge&logo=cypress&logoColor=white)
![Playwright](https://img.shields.io/badge/Playwright-1.62.1-2EAD33?style=for-the-badge&logo=playwright&logoColor=white)
![ESLint](https://img.shields.io/badge/ESLint-10.8.0-4B32C3?style=for-the-badge&logo=eslint&logoColor=white)

---

## 📂 Structure de l'Application (App Router)

L'architecture suit l'organisation standard du *App Router* de Next.js, avec une séparation claire par domaine métier de l'institution.

```text
senat-web-site/
├── app/
│   ├── about/                          # Présentation de l'institution
│   │   ├── missions-and-responsibilities/
│   │   ├── president-message/
│   │   ├── reference-texts/
│   │   └── structures/
│   ├── agenda/                         # Événements et calendrier
│   │   └── [slug]/
│   ├── api/                            # Routes d'API (Backend for Frontend)
│   │   ├── chat/
│   │   ├── release/
│   │   └── search/
│   ├── contact/                        # Formulaires et coordonnées
│   ├── historical/                     # Historique du Sénat
│   │   ├── history/
│   │   └── [slug]/
│   ├── international/                  # Diplomatie et relations extérieures
│   │   ├── inter-parliamentary-friendship-group/
│   │   ├── presidents-activities/
│   │   └── senators-activities/
│   ├── parliamentary-proceedings/      # Travaux parlementaires
│   │   └── legislative-proceedings/
│   │       ├── deliberation-and-agenda/
│   │       └── [slug]/
│   ├── press-area/                     # Espace presse
│   │   └── news/
│   │       └── [slug]/
│   ├── search/                         # Interface de recherche globale
│   ├── texts-and-laws/                 # Projets et propositions de loi
│   ├── others/                         # Pages annexes
│   │
│   ├── layout.tsx                      # Architecture visuelle racine
│   ├── page.tsx                        # Page d'accueil du portail
│   ├── loading.tsx                     # UI de chargement global
│   ├── error.tsx                       # UI de gestion d'erreurs
│   ├── not-found.tsx                   # Page 404 personnalisée
│   ├── sitemap.ts                      # Génération dynamique du Sitemap SEO
│   └── robot.ts                        # Instructions d'indexation
