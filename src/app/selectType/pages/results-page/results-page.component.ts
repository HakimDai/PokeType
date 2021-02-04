import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {TypesService} from 'src/app/selectType/services/types.service';
import {ResearchTypeService} from 'src/app/selectType/services/research-type.service';
import {Type} from 'src/app/shared/models/typeEffectiveness.model';
import {ActivatedRoute} from '@angular/router';
import {Pokemon} from '../../models/pokemon.model';

@Component({
  selector: 'app-results-page',
  templateUrl: './results-page.component.html',
  styleUrls: ['./results-page.component.scss'],
})
export class ResultsPageComponent implements OnInit, OnDestroy {
  pokemonsToDisplay;
  numberOfColumnsToDisplay: number;
  pokemons: Pokemon[] = [];
  resultSubscription: Subscription;

  constructor(
    private typeService: TypesService,
    private researchTypeService: ResearchTypeService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.resultSubscription = this.researchTypeService.result.subscribe(
      (results) => {
        this.pokemonsToDisplay = results;
      }
    );
    this.activatedRoute.data.subscribe((data: { results: [] }) => {
      data.results.forEach((pokemon: any, index) => {
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

}
