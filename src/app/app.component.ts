import { Pokemon } from './pokemon.model';
import { Component, computed, inject, signal } from '@angular/core';
//import { POKEMON_LIST } from './pokemon-liste.fake';
import { PokemonBorderDirective } from './pokemon-border.directive';
import { DatePipe } from '@angular/common';
import { PokemonService } from './pokemon.service';

@Component({
  selector: 'app-root',
  imports: [PokemonBorderDirective, DatePipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
 // providers: [PokemonService]
})
export class AppComponent {
  readonly #pokemonService = inject(PokemonService);//injection du service pokemon
  PokemonList = signal(this.#pokemonService.getPokemonList());//signal qui retourne la liste des pokemons
  

  title = 'Hello, Word';
  count= signal(21);
  name = signal("Pikachu");

  taille(pokemon:Pokemon) {//fonction qui retourne la taille du pokemon
    if(pokemon.life <= 15 ){
     return "Petit"
    }
    if(pokemon.life >=25 ){
      return "Grand"
    }
      return "Moyen"
  }

  imagesrc = signal('https://assets.pokemon.com/assets/cms2/img/pokedex/detail/025.png')//signal qui retourne l'image du pokemon
  
  

  doubleCount =computed(()=>this.count() * 2)//fonction qui retourne le double du compteur
  increment(pokemon:Pokemon){
    pokemon.life = pokemon.life + 1
    
  }

  decrement(pokemon:Pokemon){//fonction qui decremente la vie du pokemon
      pokemon.life = pokemon.life - 1
  }
  reset(){//fonction qui remet le compteur a zero
    this.count.set(0);
  }

}
