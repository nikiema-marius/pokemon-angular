import { Component, effect, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { PokemonService } from '../../pokemon.service';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { getPokemonColor, maxTypesValidator, POKEMON_RULES } from '../../pokemon.model';
import { toSignal } from '@angular/core/rxjs-interop';
// import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-pokemon-edit',
  imports: [RouterLink,ReactiveFormsModule], //JsonPipe pour afficher les données en JSON
  templateUrl: './pokemon-edit.component.html',
  styles: ``
})
export class PokemonEditComponent {
  readonly route = inject(ActivatedRoute);//inject ActivatedRoute
  readonly router = inject(Router);
  readonly pokemonService = inject(PokemonService);//inject PokemonService
  readonly pokemonId = signal(
    Number(this.route.snapshot.paramMap.get('id'))
  ).asReadonly();
  
   readonly pokemon = toSignal(//signal qui retourne le pokemon par son ID
     this.pokemonService.getPokemonById(this.pokemonId())
   );




  /** pokemon */
//   readonly pokemonResponse = toSignal(//signal qui retourne le pokemon par son ID
//     this.pokemonService.getPokemonById(this.pokemonId()).pipe(
//       map((pokemon) => ({value: pokemon, error: undefined}))//map qui retourne le pokemon ou l'erreur
//     )
//   );

//  readonly loading = computed(( () => this.pokemonResponse() == undefined )) 
//    readonly error = computed( () => this.pokemonResponse()?.error ) // le shining operator permet de verifier si l'erreur est different de undefined
   
//    readonly pokemon = computed(() => this.pokemonResponse()?.value); // sa permet de retourner le pokemon qui est dans le signal pokemonResponse valider par le shining operator
   

  /** pokemon */



  readonly POKEMON_RULES = POKEMON_RULES;

  readonly form = new FormGroup({//il s'agit d'un FormGroup qui permet de modifier les informations d'un pokemon
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(POKEMON_RULES.MIN_NAME),
      Validators.maxLength(POKEMON_RULES.MAX_NAME),
      Validators.pattern(POKEMON_RULES.NAME_PATTERN),

    ]), // FRANCAIS : nom du pokemon
    life: new FormControl(), // FRANCAIS : vie du pokemon
    damage: new FormControl(), // FRANCAIS : dégat du pokemon

    type: new FormArray(// 
      [],// FRANCAIS : type du pokemon 
      [Validators.required,maxTypesValidator(POKEMON_RULES.MAX_TYPES )]// IL s'agit de la validation du type du pokemon les types ne doivent pas dépasser 3
  ) 
  });

  constructor(){// ce constructeur permet de modifier les informations du pokemon avec le useEffet qui lui permet de modifier les informations du pokemon
    effect(() => {
      const pokemon = this.pokemon();
      if(pokemon){// si le pokemon existe on modifie les informations du pokemon en utilisant le patchValue qui est une fonction qui permet de modifier les informations du pokemon
        this.form.patchValue({
          name: pokemon.name,
          life: pokemon.life,
          damage: pokemon.damage,
        });
  
        pokemon.types.forEach((type) => {// on modifie les types du pokemon en utilisant la fonction forEach qui permet de parcourir les types du pokemon
          this.pokemeTypeListe.push(new FormControl(type));
        });
      }
    })
  }
  

  get pokemeTypeListe(): FormArray {// il s'agit 
    return this.form.get('type') as FormArray;
  }

  get pokemonName(): FormControl {// il s'agit de la fonction qui permet de modifier le nom du pokemon
    return this.form.get('name') as FormControl;  
  }


  get pokemonLife(): FormControl {// il s'agit de la fonction qui permet de modifier la vie du pokemon
    return this.form.get('life') as FormControl;  
  }

    /** dommage*/
  get pokemonDamage(): FormControl {// il s'agit de la fonction qui permet de modifier les dégats du pokemon
    return this.form.get('damage') as FormControl;  
  }

  incrementDomage(): void {// il s'agit de la fonction qui permet d'incrémenter la vie du pokemon
    this.pokemonDamage.setValue(this.pokemonDamage.value + 1);  
  }

  decrementDomage(): void {// il s'agit de la fonction qui permet d'incrémenter la vie du pokemon
    this.pokemonDamage.setValue(this.pokemonDamage.value - 1);  
  }
  /** dommage*/

  incrementLife(): void {// il s'agit de la fonction qui permet d'incrémenter la vie du pokemon
    this.pokemonLife.setValue(this.pokemonLife.value + 1);  
  }

  decrementLife(): void {// il s'agit de la fonction qui permet d'incrémenter la vie du pokemon
    this.pokemonLife.setValue(this.pokemonLife.value - 1);  
  }
  // savoir si un type donné est selectionné ou non

  isPokemonTypeSelected(type: string): boolean { // savoir si un type donné est selectionné ou non
    return !!this.pokemeTypeListe.controls.find(// !! pour convertir en boolean
      (control) => control.value === type);
  }

  // ajouter un type ou retirer un type
  onPokemonTypeChange(type: string, isChecked:boolean): void {// ajouter un type ou retirer un type
    if(isChecked){
      const control = new FormControl(type);
      this.pokemeTypeListe.push(control);
    }else {
      const index = this.pokemeTypeListe.controls.map((control) => control.value).indexOf(type);
      this.pokemeTypeListe.removeAt(index);
    }
  }


  getPokemonColor(type: string): string {// retourne la couleur du pokemon
    return getPokemonColor(type);
  }

  getChipTextColor(type: string): 'black' | 'white' {// savoir si le type est electrik
   return type === 'Electrik' ? 'black' : 'white';
  }

  onSubmit(): void {
   //console.log(this.form.value);
   const isFormalid = this.form.valid; // savoir si le formulaire est valide
   const pokemon = this.pokemon(); // le pokemon avant la modification au chargement de la page
    if(isFormalid && pokemon){// si le formulaire est valide et le pokemon existe
      const updatedPokemon = {
        ...pokemon, // ... est un opérateur de décomposition qui permet de copier les propriétés d'un objet
        name: this.pokemonName.value,
        life: this.pokemonLife.value,
        damage: this.pokemonDamage.value,
        types: this.pokemeTypeListe.value
      };
     this.pokemonService.updatePokemon(updatedPokemon).subscribe(() => {
      this.router.navigate(['/pokemon', pokemon.id]);
      //console.log("le pokemon modifier est : ", updatedPokemon);
     })
    }
  }


  
}
