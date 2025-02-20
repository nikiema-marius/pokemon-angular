import { Pokemon } from './pokemon.model';
import { Component, computed, signal } from '@angular/core';
import { POKEMON_LIST } from './pokemon-liste.fake';
import { PokemonBorderDirective } from './pokemon-border.directive';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [PokemonBorderDirective, DatePipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  PokemonList = signal(POKEMON_LIST);

  title = 'Hello, Word';
  count= signal(21);
  name = signal("Pikachu");

  taille(pokemon:Pokemon) {
    if(pokemon.life <= 15 ){
     return "Petit"
    }
    if(pokemon.life >=25 ){
      return "Grand"
    }
      return "Moyen"
  }

  imagesrc = signal('https://assets.pokemon.com/assets/cms2/img/pokedex/detail/025.png')
  
  

  doubleCount =computed(()=>this.count() * 2)
  increment(pokemon:Pokemon){
    pokemon.life = pokemon.life + 1
    
  }

  decrement(pokemon:Pokemon){
      pokemon.life = pokemon.life - 1
  }
  reset(){
    this.count.set(0);
  }

  


}
