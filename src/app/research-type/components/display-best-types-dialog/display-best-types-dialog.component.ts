import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { TypesService } from 'src/app/selectType/services/types.service';
import { Type } from 'src/app/shared/models/typeEffectiveness.model';
import { RequestPokemonService } from 'src/app/research-type/services/request-pokemon.service';
import { Observable } from 'rxjs';
import { ResearchTypeService } from 'src/app/research-type/services/research-type.service';

@Component({
  selector: 'app-display-best-types-dialog',
  templateUrl: './display-best-types-dialog.component.html',
  styleUrls: ['./display-best-types-dialog.component.scss'],
})
export class DisplayBestTypesDialogComponent implements OnInit, OnDestroy {
  bestTypes;
  pokemonsList;
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

  constructor(
    private typeService: TypesService,
    private researchTypeService: ResearchTypeService
  ) {}

  ngOnInit(): void {
    this.researchTypeService.result.subscribe(
      (types) => (this.bestTypes = types)
    );
    this.pokemonsList = this.researchTypeService.getPokemonsOfTheseTypes(
      this.bestTypes
    );
    this.researchTypeService.thePokemons.subscribe(
      (result) => (this.pokemonsToDisplay = result)
    );
  }

  ngOnDestroy() {
    this.typeService.selectedTypes.forEach((type) => (type.isSelected = false));
    this.typeService.selectedTypes$.next(
      (this.typeService.selectedTypes = new Set<Type>())
    );
  }
}
