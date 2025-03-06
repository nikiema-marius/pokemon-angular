import { AbstractControl, FormArray, ValidatorFn } from "@angular/forms";

export interface Pokemon {
    id:number;
    name:string;
    picture:string;
    life:number;
    damage:number;
    types: [string] | [string,string] | [string, string,string] ;
    created: Date;
}export type PokemonList = Pokemon[];

export const POKEMON_RULES = {
  NAME_PATTERN: /^[a-zA-Zéè]+$/, //il faut que le nom soit composé de lettres uniquement
  MAX_NAME: 20, //le nom doit contenir au maximum 20 caractères
  MIN_NAME: 3,//le nom doit contenir au minimum 3 caractères
  MAX_LIFE: 30,//la vie doit être au maximum de 30
  HIGH_LIFE: 25,//la vie doit être au minimum de 25
  LOW_LIFE: 15,//la vie doit être au minimum de 15
  MIN_LIFE: 10,//la vie doit être au minimum de 10
  MAX_DAMAGE: 10,// les dégâts doivent être au maximum de 10
  MIN_DAMAGE: 1,// les dégâts doivent être au minimum de 1
  MIN_TYPES: 1,//il faut au moins un type
  MAX_TYPES: 3,//il faut au maximum 3 types
} as const; //on utilise l'opérateur as const pour que les valeurs soient constantes

  export function maxTypesValidator(max: number): ValidatorFn {//cette fonction permet de valider le nombre de types d'un pokemon 
    return (control: AbstractControl) => {
      if (control instanceof FormArray && control.length > max) {
        return { maxTypes: { requiredLength: max, actualLength: control.length } };
      }
      return null;
    };
  }

export function getPokemonColor(type:string) : string {
    switch (type) {
        case 'Feu':
          return '#EF5350';
        case 'Eau':
          return '#42A5F5';
        case 'Plante':
          return '#66BB6A';
        case 'Insecte':
          return '#8d6e63';
        case 'Vol':
          return '#90CAF9';
        case 'Poison':
          return '#b388ff';
        case 'Fée':
          return '#f8bbd0';
        case 'Electrik':
          return '#f4ff81';
        default:
          return '#303030';
      }
}


