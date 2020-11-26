import { Injectable } from '@angular/core';
import { Type, types } from 'src/app/shared/models/typeEffectiveness.model';
import { BehaviorSubject, forkJoin } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { DisplayBestTypesDialogComponent } from 'src/app/research-type/components/display-best-types-dialog/display-best-types-dialog.component';
import { RequestPokemonService } from 'src/app/research-type/services/request-pokemon.service';

@Injectable({
  providedIn: 'root',
})
export class ResearchTypeService {
  thePokemons: BehaviorSubject<
    { name: string; image: string }[]
  > = new BehaviorSubject<{ name: string; image: string }[]>([]);
  result: BehaviorSubject<
    { type: string; enType: string }[]
  > = new BehaviorSubject<{ type: string; enType: string }[]>(undefined);
  pokemonsListBytypes = [];

  constructor(
    public bestTypeDialog: MatDialog,
    public requestPokemonService: RequestPokemonService
  ) {}

  searchType(selectedTypes: Set<Type>) {
    let bestDamageTypes: { type: string; enType: string }[] = [];
    let filteredBestDamageTypes: { type; value; enType }[] = [];
    switch (selectedTypes.size) {
      case 0:
        return alert('error');
      case 1:
        bestDamageTypes = this.findBestDamageTypes(selectedTypes);
        this.bestTypeDialog.open(DisplayBestTypesDialogComponent);
        return this.result.next(bestDamageTypes);
      case 2:
        bestDamageTypes = this.findBestDamageTypes(selectedTypes);
        bestDamageTypes.forEach((result) => {
          filteredBestDamageTypes.push({
            type: result,
            value: bestDamageTypes.reduce(
              (a, res) => (res === result ? a + 1 : a),
              0
            ),
            enType: result,
          });
        });
        const res: {
          type: string;
          enType: string;
        }[] = filteredBestDamageTypes
          .sort((a, b) => b.value - a.value)
          .map((result) => Object.values(result)[0]);
        this.bestTypeDialog.open(DisplayBestTypesDialogComponent);
        return this.result.next(res);
    }
  }

  findBestDamageTypes(selectedTypes) {
    let bestDamageTypes: { type: string; enType: string }[] = [];
    for (let type of types) {
      if (selectedTypes.has(type)) {
        let index = type.damageTaken.indexOf(2);
        while (index != -1) {
          bestDamageTypes.push({
            type: types[index].type,
            enType: types[index].enType,
          });
          index = type.damageTaken.indexOf(2, index + 1);
        }
      }
    }
    return bestDamageTypes;
  }

  getPokemonsOfTheseTypes(types: { type: string; enType: string }[]) {
    for (let i = 0; i < types.length; i++) {
      this.requestPokemonService
        .getPokemonsOfThisType(types[i].enType)
        .subscribe((result) => this.pokemonsListBytypes.push(result[0]));
    }
    this.makeDelay(this.pokemonsListBytypes, types);
    this.pokemonsListBytypes = this.getRandomPokemonsOfTheseTypes(
      this.pokemonsListBytypes
    );
    console.log(this.pokemonsListBytypes);
    return this.requestForPokemon(this.pokemonsListBytypes);
  }

  getRandomPokemonsOfTheseTypes(pokemonList) {
    let pokemonsOfTheseTypes = [];
    for (let i = 0; i < pokemonList.length; i++) {
      const randomNumber = Math.floor(Math.random() * 50);
      pokemonsOfTheseTypes.push(pokemonList[i][randomNumber]);
    }
    return pokemonsOfTheseTypes;
  }

  makeDelay(list, secondlist) {
    while (list.length !== secondlist.length) {
      this.makeDelay(list, secondlist);
    }
  }

  requestForPokemon(pokemons) {
    let thePokemons = [];
    for (let pokemon of pokemons) {
      this.requestPokemonService
        .getPokemons(pokemon.pokemon.name)
        .subscribe((pokemon) => {
          thePokemons.push({
            name: pokemon.name,
            image: pokemon.sprites.other,
          });
        });
    }
    this.makeDelay(thePokemons, pokemons);
    this.thePokemons.next(thePokemons);
  }
}
