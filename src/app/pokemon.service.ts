import { Pokemon, PokemonList } from './pokemon.model';
//import { POKEMON_LIST } from './pokemon-liste.fake';
//import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';



export abstract class PokemonService {//classe abstraite qui va me permettre de définir des méthodes abstraites qui seront implémentées dans les classes filles
   /* pour l'environement de prod */
  abstract getPokemonList(): Observable<PokemonList>;//fonction qui retourne la liste des pokemons provenant de l'api
  abstract getPokemonById(id: number): Observable<Pokemon>;//fonction qui retourne un pokemon par son ID 
  abstract updatePokemon(pokemon: Pokemon): Observable<Pokemon>;//fonction qui met à jour un pokemon
  abstract deletePokemn(pokemondId: number): Observable<void>;//ffonction qui supprime un pokemon
  abstract addPokemon(pokemon: Omit<Pokemon, 'id'>): Observable<Pokemon>;//fonction qui ajoute un pokemon, le Omit permet de ne pas prendre en compte l'id
  abstract getPokemonTyListe(): string[];//fonction qui retourne la liste des types de pokemons

  // j'utilise la classe abstract qui va me permettre de définir des méthodes abstraites qui seront implémentées dans les classes filles

   /* pour l'environement de prod */
  /* pour l'environement de dev */

  // readonly #POKEMON_API_URL = 'http://localhost:3000/pokemons';//url de l'api qui contient les pokemons provenant de la base de données
  // readonly #http = inject(HttpClient); //injection de la classe HttpClient qui permet de faire des requetes http sur l'api

 
  // getPokemonList(): Observable<PokemonList>{//fonction qui retourne la liste des pokemons provenant de l'api

  //   return this.#http.get<PokemonList>(this.#POKEMON_API_URL);
  // }


  // //
  // getPokemonById(id: number): Observable<Pokemon>  {//fonction qui retourne un pokemon par son ID
  //   const url = this.#POKEMON_API_URL+ '/' +id; //url de l'api qui contient le pokemon avec l'id
  //   return this.#http.get<Pokemon>(url) //retourne le pokemon avec l'id
  // }


  
  // updatePokemon(pokemon :Pokemon): Observable<Pokemon>  {//fonction qui met à jour un pokemon
  //   const url = this.#POKEMON_API_URL+ '/' +pokemon.id;
  //   return this.#http.put<Pokemon>(url, pokemon);
  // }
 

  // deletePokemn(id: number): Observable <void>  {//ffonction qui supprime un pokemon
  //   const url = this.#POKEMON_API_URL+ '/' +id; 
  //   return this.#http.delete<void>(url);
  // }

  // addPokemon(pokemon: Omit<Pokemon, 'id'> ): Observable<Pokemon> {//fonction qui ajoute un pokemon, le Omit permet de ne pas prendre en compte l'id

  //  return this.#http.post<Pokemon>(this.#POKEMON_API_URL, pokemon);
  // }


  // //

  // getPokemonTyListe(): string[]{//fonction qui retourne la liste des types de pokemons
  //   return [
  //     'Plante',
  //     'Feu',
  //     'Eau',
  //     'Insecte',
  //     'Normal',
  //     'Electrik',
  //     'Poison',
  //     'Fée',
  //     'Vol'
  //   ]
  // }

   /* pour l'environement de dev */

}
