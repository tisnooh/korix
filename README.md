# KORIX

Site vitrine de KORIX, agence de création de sites internet sur mesure. La réalisation s’appuie sur Next.js App Router, React et TypeScript, avec rendu statique des pages publiques et une route serveur dédiée au formulaire de contact.

## Architecture

- `frontend/src/app` : pages, métadonnées, sitemap, robots et route de contact.
- `frontend/src/components` : sections du site et composants interactifs accessibles.
- `frontend/src/lib` : contenus structurés, validation, limitation de débit et transport e-mail.
- `frontend/public/assets` : visuels WebP optimisés.
- `frontend/tests` : scénarios Playwright desktop, mobile, navigation et formulaire.

Les quatre réalisations présentées sont explicitement identifiées comme des concepts de démonstration. Le site ne publie aucun chiffre client, avis, téléphone, adresse ou réseau social non confirmé.

## Installation

Node.js 20.9 ou supérieur est requis.

```bash
cd frontend
npm ci
Copy-Item .env.example .env.local
npm run dev
```

Le site est alors disponible sur `http://localhost:3000`.

## Configuration de production

Renseigner les variables décrites dans [`frontend/.env.example`](frontend/.env.example), en particulier :

- `NEXT_PUBLIC_SITE_URL` : domaine public, utilisé pour les URL canoniques, le sitemap et la validation d’origine ;
- `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL` : transport réel du formulaire ;
- `CONTACT_DELIVERY_MODE=resend` : obligatoire en production ;
- les coordonnées publiques, réseaux sociaux et mentions légales, uniquement après confirmation ;
- les clés PostHog si la mesure d’audience est souhaitée. PostHog n’est chargé qu’après consentement explicite et l’enregistrement de session est désactivé.

Le mode `CONTACT_DELIVERY_MODE=console` sert uniquement au développement et aux tests : il valide tout le parcours sans envoyer d’e-mail externe.

## Contrôles qualité

```bash
cd frontend
npm run lint
npm run test
npm run build
```

Pour les scénarios navigateur :

```bash
npx playwright install chromium
npm run test:e2e
```

`npm run check` exécute le lint, les tests unitaires et le build de production.

## Publication

1. Confirmer le domaine public et toutes les données légales.
2. Valider le domaine d’envoi dans Resend et ajouter les variables serveur.
3. Déployer le dossier `frontend` sur une plateforme compatible Next.js.
4. Envoyer une demande réelle depuis le domaine final et contrôler sa réception.
5. Vérifier les URL canoniques et le sitemap sur le domaine publié, puis soumettre ce dernier aux moteurs de recherche.
