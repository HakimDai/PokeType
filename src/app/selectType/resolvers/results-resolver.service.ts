import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot,} from '@angular/router';
import {ResearchTypeService} from 'src/app/selectType/services/research-type.service';
import {mergeMap} from 'rxjs/operators';
import {TypeDetails} from 'src/app/shared/models/typeDetails.model';
import {Observable, of} from 'rxjs';
import {PokemonShortDetail} from '../../shared/models/pokemonShortDetail.model';

@Injectable({
  providedIn: 'root',
})
export class ResultsResolver implements Resolve<any> {
  pokemonsToDisplay;
  pokemonsListBytypes: PokemonShortDetail[][] = [];

  constructor(private researchTypeService: ResearchTypeService) {
    this.researchTypeService.result.subscribe((results) => {
      this.pokemonsToDisplay = results;
    });
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.researchTypeService
      .getPokemonsOfTheseTypes(this.pokemonsToDisplay)
      .pipe(
        mergeMap(
          (pokemons): Observable<any> =>
            of(
              pokemons.forEach((pokies: TypeDetails) => {
                return this.pokemonsListBytypes.push(pokies.pokemon);
              })
            ).pipe(() =>
              of(
                this.researchTypeService.getRandomPokemonsOfTheseTypes(
                  this.pokemonsListBytypes
                )
              ).pipe(
                mergeMap((pokemons) =>
                  this.researchTypeService.requestForPokemon(pokemons)
                )
              )
            )
        )
      );
  }
}
