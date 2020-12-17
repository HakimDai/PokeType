import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { TypesService } from 'src/app/selectType/services/types.service';
import { ResearchTypeService } from 'src/app/selectType/services/research-type.service';
import { Type } from 'src/app/shared/models/typeEffectiveness.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-results-page',
  templateUrl: './results-page.component.html',
  styleUrls: ['./results-page.component.scss'],
})
export class ResultsPageComponent implements OnInit, OnDestroy {
  pokemonsToDisplay;
  numberOfColumnsToDisplay: number;
  heightOfColumnsToDisplay: string;
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
    types: [
      {
        slot: number;
        type: {
          name: string;
          url: string;
        };
      }
    ];
  }[] = [];
  resultSubscription: Subscription;
  thePokemonsSubscription: Subscription;

  constructor(
    private typeService: TypesService,
    private researchTypeService: ResearchTypeService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe((data: { results: [] }) => {
      console.log(data);
      this.pokemonsToDisplay = data.results;
      data.results.forEach((pokemon) => {
        this.pokemons.push({
          name: pokemon.name,
          image: {
            dream_world: {
              front_default: pokemon.sprites.other.dream_world.front_default,
              front_female: pokemon.sprites.other.dream_world.front_female,
            },
            'official-artwork': {
              front_default:
                pokemon.sprites.other['official-artwork'].front_default,
            },
          },
          types: pokemon.types,
        });
      });
    });
  }

  ngOnDestroy() {
    this.typeService.selectedTypes.forEach((type) => (type.isSelected = false));
    this.typeService.selectedTypes$.next(
      (this.typeService.selectedTypes = new Set<Type>())
    );
    this.pokemonsToDisplay = [];
    this.pokemons = [];
    this.researchTypeService.result.next([]);
    this.resultSubscription.unsubscribe();
    this.thePokemonsSubscription.unsubscribe();
  }

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
