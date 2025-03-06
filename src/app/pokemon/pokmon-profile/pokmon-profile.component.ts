import { Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { PokemonService } from '../../pokemon.service';
import { DatePipe } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { catchError, map, of } from 'rxjs';

@Component({
  selector: 'app-pokmon-profile',
  imports: [RouterLink,DatePipe],
  templateUrl: './pokmon-profile.component.html',
  styles: ``
})
export class PokmonProfileComponent {
  readonly #route = inject(ActivatedRoute); // injection de la route
  readonly #pokemonService = inject(PokemonService); // injection du service pokemon
  readonly #pokemonId = Number(this.#route.snapshot.paramMap.get('id')); // signal qui retourne l'id du pokemon
  readonly #router = inject(Router); // injection du router
  readonly #pokemonResponse = toSignal(
    this.#pokemonService.getPokemonById(this.#pokemonId).pipe(
      map((pokemon) => ({ value: pokemon, error: undefined })),//map qui retourne le pokemon ou l'erreur
      catchError((errr) => of({ value: null, error: errr }))//catchError qui retourne l'erreur le of creer un flux qui emet de maniere synchrone un objet
    )
  ); // signal qui retourne le pokemon avec l'id ou null ou l'errreur http

  readonly loading = computed(( () => this.#pokemonResponse() == undefined )) 
  readonly error = computed( () => this.#pokemonResponse()?.error ) // le shining operator permet de verifier si l'erreur est different de undefined
  
  readonly pokemon = computed(() => this.#pokemonResponse()?.value); // sa permet de retourner le pokemon qui est dans le signal pokemonResponse valider par le shining operator
 
  deletePokemon() {
    this.#pokemonService.deletePokemn(this.#pokemonId).subscribe(() => {
     // une redidection vers la liste des pokemons
     this.#router.navigate(['/pokemon']);
    });
  }
}