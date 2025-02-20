import { Injectable } from '@angular/core';
import { Pokemon, PokemonList } from './pokemon.model';
import { POKEMON_LIST } from './pokemon-liste.fake';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  getPokemonList(): PokemonList{

    return POKEMON_LIST;
  }

  getPokemonById(id: number): Pokemon {

    const pokemon  = POKEMON_LIST.find(pokemon => pokemon.id == id);

    if(!pokemon){
      throw new Error(`pas de pokemon trouve avec ce ID ${id} `)
    }
    return pokemon;
  }

  getPokemonTyListe(): string[]{
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
