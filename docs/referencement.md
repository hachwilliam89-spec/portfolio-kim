# Référencement de wkhach.dev

## Après déploiement

1. Vérifier que `https://www.wkhach.dev/robots.txt` et `https://www.wkhach.dev/sitemap.xml` répondent sans erreur. Le sitemap doit contenir l’accueil et les sept pages projets, exclusivement sur `https://www.wkhach.dev`.
2. Terminer la validation dans [Google Search Console](https://search.google.com/search-console). Pour la méthode par fichier HTML, utiliser la propriété **Préfixe de l’URL** `https://www.wkhach.dev/`. Comparer le fichier demandé par Google avec `public/google364da593c153ae52.html` : il est lié au compte Google qui l’a généré. Vérifier son accès public, puis cliquer sur **Valider**. Conserver ce fichier après validation.
3. Si la propriété commencée est de type **Domaine** (`wkhach.dev`), terminer sa validation par l’enregistrement DNS fourni par Google : le fichier HTML ne valide pas ce type de propriété.
4. Dans **Sitemaps**, envoyer `https://www.wkhach.dev/sitemap.xml`. Retirer de la liste un éventuel ancien sitemap utilisant l’adresse Vercel.
5. Dans **Inspection de l’URL**, tester l’URL publiée de l’accueil, puis celles d’Équilibre, KCD Formes et XIP Telecom. Demander leur indexation si elles ne sont pas encore indexées.
6. Consulter ensuite les rapports **Indexation des pages** et **Performances** pour voir les pages retenues et les recherches qui apportent des impressions. Une soumission ne garantit ni l’indexation ni une position donnée.

## Organisation du projet

- `lib/seo.ts` centralise le domaine principal et l’identité du portfolio.
- `lib/projects.ts` alimente les cartes, les fenêtres de détail, les pages `/projets/[slug]` et le sitemap. Les anciennes versions restent consultables dans les fenêtres de détail, sans page supplémentaire.
- Chaque page projet possède son titre, sa description, son URL canonique et des données structurées. Son contenu français est présent dans le HTML généré à la compilation.
- Les cartes conservent l’ouverture en fenêtre au clic normal. Leurs liens permettent aussi l’ouverture d’une page complète dans un nouvel onglet.
- Le bouton anglais traduit l’interface à la même adresse. Il n’existe pas encore de version anglaise avec des URL distinctes : ne pas déclarer de `hreflang` vers des pages inexistantes.
- Les clés Mailjet restent nécessaires à la compilation actuelle. Pour une vérification locale sans envoi de message, des valeurs fictives peuvent être fournies uniquement à la commande de compilation ; ne pas les configurer en production.

## Références

- [Validation de propriété Google](https://support.google.com/webmasters/answer/9008080?hl=fr)
- [Création et envoi d’un sitemap](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap?hl=fr)
- [Liens explorables](https://developers.google.com/search/docs/crawling-indexing/links-crawlable?hl=fr)
