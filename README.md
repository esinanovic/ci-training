CI Training – Projet Full-Stack orienté DevOps
==============================================

Présentation générale
---------------------

Ce dépôt contient un **projet full-stack orienté DevOps**, conçu comme un **projet vitrine technique** à destination des recruteurs et équipes techniques.

L’application elle-même est volontairement simple.L’objectif principal du projet est de démontrer la **maîtrise des fondamentaux DevOps** : automatisation, CI/CD, conteneurisation, tests, qualité, fiabilité et bonnes pratiques d’infrastructure.

Ce projet se rapproche d’un **environnement professionnel réel**, avec une attention particulière portée à la qualité du pipeline, à la reproductibilité et à la stabilité.

Objectifs du projet
-------------------

*   Mettre en place une **pipeline CI/CD complète** avec GitHub Actions
    
*   Utiliser **Docker et Docker Compose** dans un contexte réaliste
    
*   Implémenter des **tests unitaires et des tests d’intégration**
    
*   Optimiser les builds via **le cache (npm, Docker layers)**
    
*   Valider les services par **health checks**
    
*   Préparer le terrain pour le **monitoring et les architectures cloud-native**
    
*   Présenter un projet clair, structuré et maintenable
    

Stack technique
---------------

### Backend

*   **Node.js** v18.19.1
    
*   **Express**
    
*   **PostgreSQL** (conteneur Docker)
    
*   **Jest** (tests)
    
*   Endpoints de santé et de statut (/health, /api/status)
    

### Frontend

*   **React** 18.2.0
    
*   Build statique via npm run build
    
*   Serveur **Nginx** pour la production
    

### DevOps & Infrastructure

*   **Docker**
    
*   **Docker Compose**
    
*   **Multi-stage Docker builds**
    
*   **Docker Buildx**
    
*   **GitHub Actions (CI)**
    
*   **GitHub Actions Cache**
    
*   **Railway** (déploiement GitOps)
    
*   **Artifacts GitHub Actions** (images Docker temporaires)
    

Structure du projet
------------------

```bash
.
├── backend
│   ├── Dockerfile
│   ├── index.js
│   ├── math.js
│   ├── config/
│   ├── package.json
│   └── tests/
├── frontend
│   ├── Dockerfile
│   ├── package.json
│   └── src/
├── tests
│   └── integration/
│       └── docker-integration.test.js
├── docker-compose.yml
├── docker-compose.test.yml
├── scripts/
│   └── cleanup-docker.sh
└── .github/workflows/
    └── ci.yml
```

Pipeline CI/CD
--------------

La pipeline est déclenchée lors de :

*   **Push sur la branche main**
    
*   **Pull Requests vers main**
    

### Étapes principales

1.  **Installation des dépendances**
    
    *   Setup Node.js
        
    *   Cache npm activé
        
    *   Installation reproductible avec npm ci
        
2.  **Linting**
    
    *   Analyse du code backend via ESLint
        
    *   Réutilisation du cache entre les jobs
        
3.  **Tests unitaires**
    
    *   Tests Jest sur le backend
        
    *   Validation de la logique applicative
        
4.  **Build Docker**
    
    *   Build multi-stage
        
    *   Utilisation de Docker Buildx
        
    *   Cache des layers Docker via GitHub Actions
        
    *   Génération d’images optimisées
        
5.  **Artifacts**
    
    *   Export des images Docker
        
    *   Stockage temporaire en tant qu’artefacts GitHub Actions
        
6.  **Tests d’intégration**
    
    *   Lancement des services via docker-compose.test.yml
        
    *   Vérification :
        
        *   Backend accessible
            
        *   Frontend accessible
            
        *   Connexion à la base de données
            
        *   Communication inter-conteneurs
            
7.  **Validation post-déploiement**
    
    *   Vérification des endpoints /health et /api/status
        

Docker & Conteneurisation
-------------------------

### Backend

*   Image basée sur **Alpine**
    
*   Build multi-stage
    
*   Health check intégré
    
*   Variables d’environnement explicites
    
*   Exécution isolée dans un réseau Docker
    

### Frontend

*   Build React dans un premier stage
    
*   Image **Nginx Alpine** pour la production
    
*   Serveur statique léger et sécurisé
    

Lancement local
---------------

Pour lancer l’ensemble de l’application en local :

```bash
docker compose up --build

```

Docker Compose orchestre :

*   Le frontend
    
*   Le backend
    
*   La base de données PostgreSQL
    
*   Le réseau entre les services
    

Stratégie de tests
------------------

### Tests unitaires

*   Jest
    
*   Tests backend et frontend basiques
    
*   Validation du rendu et des réponses API
    

### Tests d’intégration

*   Tests Node.js personnalisés
    
*   Validation complète du stack Docker :
    
    *   Services disponibles
        
    *   Réseau fonctionnel
        
    *   Base de données accessible
        
    *   Frontend servi correctement
        

Déploiement
-----------

*   Déploiement automatisé sur **Railway**
    
*   Workflow de type **GitOps**
    
*   Le service cloud reconstruit les images à partir du dépôt Git
    
*   Les health checks garantissent la disponibilité après déploiement


Démonstration (environnement cloud)
-----------------------------------


L’application a été déployée sur Railway dans le cadre d’une démonstration.

Pour des raisons de coûts et de limitations des plans gratuits, l’environnement n’est pas maintenu en ligne en permanence.

> Ci-dessous, une capture d’écran illustrant :

![Capture d'écran Railway](./docs/screenshots/railway-frontend.PNG)

*   Le frontend React

*   L’état de santé du backend

*   La connexion à la base de données



Fonctionnalités à venir
-----------------------

Les évolutions suivantes sont volontairement prévues dans un projet distinct, afin de conserver ce dépôt comme une base stable et finalisée axée sur Docker, CI/CD et les fondamentaux DevOps.

> Les prochaines étapes porteront sur des sujets cloud-native et observabilité avancée :

*   Exposition d’un endpoint /metrics
    
*   Intégration de **Prometheus**
    
*   Dashboards **Grafana**
    
*   Monitoring applicatif et infrastructure
    
*   Déploiement **Kubernetes**
    
*   Infrastructure as Code avec **Terraform**
    
*   GitOps avancé (Argo CD)
    
*   Scans de sécurité et politiques d’images
