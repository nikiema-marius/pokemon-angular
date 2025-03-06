import { Injectable, signal } from "@angular/core";
import { delay, Observable, of } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class AuthService{
    readonly #isLoggedIn = signal(false); // cette autorisation est accessible que ici
    readonly isLoggedIn = this.#isLoggedIn.asReadonly(); // parcontre celle ci sera accessible partout mais en lecture seule

    login (name:string, password:string): Observable<boolean> {
       const isLoggedIn = name === 'admin' && password === 'admin';
       this.#isLoggedIn.set(isLoggedIn);
       return of(isLoggedIn).pipe(delay(1000)); //retourne un observable qui emet la valeur de isLoggedIn après 1 seconde
    }
}