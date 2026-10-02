# CV — sources

Les CV téléchargeables du portfolio (`public/CV_William_Kim_HACH_*.pdf`) sont générés à partir de ces pages HTML,
dans la même direction artistique que le site (papier washi, encre, vermillon et or, Playfair Display + Inter, sceau 金恩).

- `cv-fr.html` → `public/CV_William_Kim_HACH_Developpeur_Fullstack.pdf` (avec photo)
- `cv-en.html` → `public/CV_William_Kim_HACH_Resume_US.pdf` (format US : sans photo ni état civil)
- Variante colonne latérale à gauche : ajouter la classe `side-left` sur `<div class="page">` (dans le CV français, la photo passe alors en haut de la colonne)
- `cv.css` : styles communs ; `fonts/`, `photo.jpg`, `seal.svg` : ressources locales (aucun accès réseau nécessaire)

## Modifier un CV

1. Éditer le texte dans `cv-fr.html` ou `cv-en.html` (aperçu direct en ouvrant le fichier dans le navigateur).
2. Régénérer le PDF, au choix :
   - **Sans installation** : ouvrir le fichier dans Chrome → Imprimer → « Enregistrer au format PDF »,
     format A4, marges « Aucune », « Graphiques d'arrière-plan » cochés, puis remplacer le PDF dans `public/`.
   - **En une commande** : `npm i -D playwright-core` (une seule fois), puis `node cv/build-cv.mjs`
     (utilise le Chrome installé ; le script prévient si le contenu dépasse une page A4).

Le CV doit tenir sur une page : si un ajout fait déborder, raccourcir une ligne plutôt que réduire encore la police.
