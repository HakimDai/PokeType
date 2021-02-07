import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, of, Subscription} from 'rxjs';
import {TypesService} from 'src/app/selectType/services/types.service';
import {ResearchTypeService} from 'src/app/selectType/services/research-type.service';
import {Type} from 'src/app/shared/models/typeEffectiveness.model';
import {Pokemon} from '../../models/pokemon.model';
import {mergeMap} from 'rxjs/operators';
import {TypeDetails} from '../../../shared/models/typeDetails.model';
import {PokemonShortDetail} from '../../../shared/models/pokemonShortDetail.model';

@Component({
  selector: 'app-results-page',
  templateUrl: './results-page.component.html',
  styleUrls: ['./results-page.component.scss'],
})
export class ResultsPageComponent implements OnInit, OnDestroy {
  pokemonsToDisplay;
  pokemons: Pokemon[] = [];
  pokemonsListBytypes: PokemonShortDetail[][] = [];
  resultSubscription: Subscription;

  constructor(
    private typeService: TypesService,
    private researchTypeService: ResearchTypeService,
  ) {}

  ngOnInit(): void {
    this.resultSubscription = this.researchTypeService.result.subscribe(
      (results) => {
        this.pokemonsToDisplay = results;
      }
    );
    this.getPokemonResult().subscribe((results) => {
      results.forEach((pokemon, index) => {
        this.pokemons.push({
          name: pokemon.name,
          types: pokemon.types,
          sprites: pokemon.sprites.front_default,
          mainType: pokemon.types.filter(
            (type) => type.type.name === this.pokemonsToDisplay[index].enType
          ),
        });
      });
    });
  }

  ngOnDestroy() {
    this.typeService.selectedTypes.forEach((type) => (type.isSelected = false));
    this.typeService.selectedTypes$.next(
      (this.typeService.selectedTypes = new Set<Type>())
    );
    this.pokemons = [];
    this.researchTypeService.result.next([]);
    this.resultSubscription.unsubscribe();
  }

  getPokemonResult() {
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
                mergeMap((pokemons) => {
                  return this.researchTypeService.requestForPokemon(pokemons);
                })
              )
            )
        )
      );
  }
}
