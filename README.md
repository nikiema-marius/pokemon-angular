# AngularPokedexApp

AngularPokedexApp
Ce projet a été généré en utilisant Angular CLI version 19.0.4. Il s'agit d'une application Pokedex qui permet aux utilisateurs de consulter, rechercher, ajouter, mettre à jour et supprimer des Pokémon. L'application utilise des services pour gérer les données des Pokémon, soit en utilisant le stockage local (LocalStorage) soit en se connectant à un serveur JSON.


## Fonctionnalités

1. Liste des Pokémon : Affiche une liste de tous les Pokémon disponibles.
2. Recherche de Pokémon : Permet de rechercher des Pokémon par leur nom.
3. Détails du Pokémon : Affiche les détails d'un Pokémon spécifique.
4. Ajout de Pokémon : Permet d'ajouter un nouveau Pokémon.
5. Mise à jour de Pokémon : Permet de mettre à jour les informations d'un Pokémon existant.
6. Suppression de Pokémon : Permet de supprimer un Pokémon de la liste.

## Development server

Pour démarrer un serveur de développement local, exécutez :

```bash
ng serve
```

Une fois le serveur démarré, ouvrez votre navigateur et accédez à http://localhost:4200/. L'application se rechargera automatiquement chaque fois que vous modifierez l'un des fichiers source.


## Structure du projet

src/
├── app/
│   ├── pokemon/
│   │   ├── pokmon-list/
│   │   │   ├── pokmon-list.component.ts
│   │   │   ├── pokmon-list.component.html
│   │   │   ├── pokmon-list.component.css
│   │   ├── pokmon-profile/
│   │   │   ├── pokmon-profile.component.ts
│   │   │   ├── pokmon-profile.component.html
│   │   │   ├── pokmon-profile.component.css
│   │   ├── pokemon.service.ts
│   │   ├── pokemon-local-storage.service.ts
│   │   ├── pokemon-json-server.service.ts
│   │   ├── pokemon.model.ts
│   │   ├── pokemon-border.directive.ts
│   ├── app.component.ts
│   ├── app.module.ts
├── assets/
├── environments/
├── index.html
├── main.ts