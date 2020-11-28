import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { TypesService } from 'src/app/selectType/services/types.service';
import { Type } from 'src/app/shared/models/typeEffectiveness.model';
import { RequestPokemonService } from 'src/app/selectType/services/request-pokemon.service';
import { Observable, Subscription } from 'rxjs';
import { ResearchTypeService } from 'src/app/selectType/services/research-type.service';

@Component({
  selector: 'app-results-dialog',
  templateUrl: './results-dialog.component.html',
  styleUrls: ['./results-dialog.component.scss'],
})
export class ResultsDialogComponent implements OnInit, OnDestroy {
  pokemonsToDisplay;
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
  resultSubscription: Subscription;
  thePokemonsSubscription: Subscription;

  constructor(
    private typeService: TypesService,
    private researchTypeService: ResearchTypeService
  ) {}

  ngOnInit(): void {
    this.resultSubscription = this.researchTypeService.result.subscribe(
      (result) => {
        this.pokemonsToDisplay = result;
        this.researchTypeService.getPokemonsOfTheseTypes(
          this.pokemonsToDisplay
        );
        this.thePokemonsSubscription = this.researchTypeService.thePokemons.subscribe(
          (result) => (this.pokemons = result)
        );
      }
    );
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
}
