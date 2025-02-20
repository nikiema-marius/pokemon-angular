import { Directive, ElementRef, HostListener, input } from '@angular/core';

//ElementRef: reference sur le element sur lequel on applique notre directive
//nativeElement recupere l'element de dom sans les abstractions 
@Directive({ 
  selector: '[appPokemonBorder]'
})
export class PokemonBorderDirective {
  private initialColor: string; // qui va stocker la couler de bordure initiale
  pokemonType = input.required<string>(); // un signal qui va retourner les types des pokemons 


  constructor(private el: ElementRef) {
    this.initialColor = this.el.nativeElement.style.borderColor;
    this.el.nativeElement.style.borderWidth = '2px'; // on definir une bordur qui fait 2px

   }
   
   @HostListener('mouseenter') onMouseEnter(){ //HostListener permet d'ecouter les evenemenent qur l'element sur laquelle on applique notre directive
    const color = this.getBorderColor();
    this.setBorder(color);
   }

   @HostListener('mouseleave') onMouseLeave(){
    const color = this.initialColor;
    this.setBorder(color);
   }

   private setBorder(color: string){ // methode qui prendre une couleur en parametre et la definie directement sur l'element en question
    this.el.nativeElement.style.borderColor = color;
   }

   private getBorderColor() {
    switch (this.pokemonType()) {
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
}
