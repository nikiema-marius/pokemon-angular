import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter,Routes } from '@angular/router';
import { PokmonListComponent } from './pokemon/pokmon-list/pokmon-list.component';
import { PokmonProfileComponent } from './pokemon/pokmon-profile/pokmon-profile.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PokemonEditComponent } from './pokemon/pokemon-edit/pokemon-edit.component';
import { provideHttpClient } from '@angular/common/http';
import { AuthGuard } from './core/auth/auth.guard';
import { LoginComponent } from './login/login.component';
import { PokemonAddComponent } from './pokemon/pokemon-add/pokemon-add.component';
import { PokemonService } from './pokemon.service';
import { PokemonLocalStorageService } from './pokemon-local-storage.service';
import { environment } from '../environments/environment';
import { PokemonJSONServerService } from './pokemon-json-server.service';


export function pokemonServiceFactory(): PokemonService {//fonction qui retourne le service pokemon en fonction de l'environnement
  return environment.production
    ? new PokemonLocalStorageService()
    : new PokemonJSONServerService();
}

const routes:Routes = [  //routes de l'application

  {
    path:'login',
    component: LoginComponent,  
    title:'Connexion',
  },
  {
    path : 'pokemon',
    canActivateChild: [AuthGuard],//le gaurd est appliqué sur les enfants de la route toutes route pokemon
    children:[
      {
        path: 'add',
        component: PokemonAddComponent,
        title: 'Ajouter Pokemon', 
      },
      {
        path:':id',
        component: PokmonProfileComponent,
        title:'Pokmon Profile',
        
      },
      {
        path:'edit/:id',
        component: PokemonEditComponent,
        title:'Modifier pokemon',
       
      },
      
      {
        path:'',
        component: PokmonListComponent,
        title:'Pokedex List',
        
      },
     
    ]
  },
  
  {
    path:'',
    redirectTo:'/pokemon',
    pathMatch:'full',
    
  },
  {
    path:'**',
    component: PageNotFoundComponent
  },  

]
export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }),
  provideRouter(routes),
  provideHttpClient(),
  
    {
      provide: PokemonService,
      useFactory: pokemonServiceFactory,
    },
  ]
  
};
