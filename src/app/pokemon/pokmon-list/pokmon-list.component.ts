import { Component, computed,inject,signal } from '@angular/core';
import { PokemonService } from '../../pokemon.service';
import { Pokemon } from '../../pokemon.model';
import { PokemonBorderDirective } from '../../pokemon-border.directive';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({ 
  selector: 'app-pokmon-list',
  imports: [PokemonBorderDirective, DatePipe,RouterLink],
  templateUrl: './pokmon-list.component.html',
  styles: `.pokemon-card{ cursor: pointer; }`,
})
export class PokmonListComponent {
  readonly #pokemonService = inject(PokemonService);//injection du service pokemon
  readonly PokemonList = toSignal(this.#pokemonService.getPokemonList(),{ //signal qui retourne la liste des pokemons provenant de l'api
    initialValue: []  //valeur initial de la liste des pokemons qui est un tableau vide si la liste est vide
  });// signal qui retourne la liste des pokemons
  
  // systeme de recherche
  readonly searchTerm = signal("");//signal qui retourne le terme de recherche
   
  readonly pokemonListeFilted = computed(() => {
    const searchTerm = this.searchTerm(); //recupere le terme de recherche
    const pokemonList = this.PokemonList();//recupere la liste des pokemons
    return pokemonList.filter((pokemon: Pokemon) => pokemon.name.toLowerCase().includes(searchTerm.trim().toLocaleLowerCase()));//retourne la liste des pokemons filtrer par le terme de recherche
  })

  //  readonly loading = computed(() => this.PokemonList().length===0) //signal qui retourne true si la liste des pokemons est vide sinon false

  readonly loading = computed(() => this.PokemonList().length === 0) //signal qui retourne true si la liste des pokemons est vide sinon false

  // systeme de tri
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
  
  // increment(pokemon:Pokemon){
  //   pokemon.life = pokemon.life + 1
    
  // }

  // decrement(pokemon:Pokemon){//fonction qui decremente la vie du pokemon
  //     pokemon.life = pokemon.life - 1
  // }
  reset(){//fonction qui remet le compteur a zero
    this.count.set(0);
  }
}
function injecte(PokemonService: any) {
  throw new Error('Function not implemented.');
}

