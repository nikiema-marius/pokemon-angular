import { Injectable } from '@angular/core';
import { Pokemon, PokemonList } from './pokemon.model';
import { POKEMON_LIST } from './pokemon-liste.fake';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  getPokemonList(): PokemonList{//fonction qui retourne la liste des pokemons

    return POKEMON_LIST;
  }

  getPokemonById(id: number): Pokemon {//fonction qui retourne un pokemon par son ID

    const pokemon  = POKEMON_LIST.find(pokemon => pokemon.id == id);

    if(!pokemon){
      throw new Error(`pas de pokemon trouve avec ce ID ${id} `)
    }
    return pokemon;
  }

  getPokemonTyListe(): string[]{//fonction qui retourne la liste des types de pokemons
    return [
      'Plante',
      'Feu',
      'Eau',
      'Insecte',
      'Normal',
      'Electrik',
      'Poison',
      'Fée',
      'Vol'
    ]
  }
}
