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
export class ResultsResolver implements Resolve<any> {
  pokemonsToDisplay;

  constructor(private researchTypeService: ResearchTypeService) {
    this.researchTypeService.result.subscribe((results) => {
      console.log(results);
      this.pokemonsToDisplay = results;
    });
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    console.log(
      this.researchTypeService.getPokemonsOfTheseTypes(this.pokemonsToDisplay)
    );
    return this.researchTypeService.getPokemonsOfTheseTypes(
      this.pokemonsToDisplay
    );
  }
}
