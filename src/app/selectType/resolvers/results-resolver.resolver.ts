import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable, of, Subscription } from 'rxjs';
import { ResearchTypeService } from 'src/app/selectType/services/research-type.service';

@Injectable({
  providedIn: 'root',
})
export class ResultsResolverResolver implements Resolve<boolean> {
  pokemonsToDisplay;
  thePokemonsSubscription: Subscription;
  pokemons: {
    name: string;
    image: {
      dream_world: {
        front_default: string;
        front_female: string;
      };
      ['official-artwork']: {
        front_default: string;
      };
    };
  }[] = [];
  numberOfColumnsToDisplay: number;

  constructor(private researchTypeService: ResearchTypeService) {
    this.researchTypeService.result.subscribe((results) => {
      this.pokemonsToDisplay = results;
    });
  }

  // resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Subscription> {
  //   return of(this.researchTypeService.getPokemonsOfTheseTypes(this.pokemonsToDisplay);
  //       this.thePokemonsSubscription = this.researchTypeService.thePokemons.subscribe(
  //         (result) => {
  //           this.pokemons = result;
  //           this.defineNumberOfColumnsToDisplay();
  //         }
  //       );
  //     }
  //     )
  //   );
  // }

  defineNumberOfColumnsToDisplay() {
    if (this.pokemons.length === 1 || this.pokemons.length === 3) {
      this.numberOfColumnsToDisplay = 1;
      return this.numberOfColumnsToDisplay;
    } else if (
      this.pokemons.length === 2 ||
      (this.pokemons.length >= 4 && this.pokemons.length <= 6)
    ) {
      this.numberOfColumnsToDisplay = 2;
      return (this.numberOfColumnsToDisplay = 2);
    } else {
      this.numberOfColumnsToDisplay = 3;
      return (this.numberOfColumnsToDisplay = 3);
    }
  }
}
