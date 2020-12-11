import { Injectable } from '@angular/core';
import { Type, types } from 'src/app/shared/models/typeEffectiveness.model';
import { BehaviorSubject, forkJoin, Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { RequestPokemonService } from 'src/app/selectType/services/request-pokemon.service';
import { TypeDetails } from 'src/app/shared/models/typeDetails.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ResearchTypeService {
  thePokemons: BehaviorSubject<
    {
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
    }[]
  > = new BehaviorSubject<
    {
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
    }[]
  >([]);
  result: BehaviorSubject<
    { type: string; enType: string }[]
  > = new BehaviorSubject<{ type: string; enType: string }[]>(undefined);
  pokemonsListBytypes: {
    pokemon: {
      name: string;
      url: string;
    };
    slot: number;
  }[] = [];

  constructor(
    public requestPokemonService: RequestPokemonService,
    public router: Router
  ) {}

  searchType(selectedTypes: Set<Type>) {
    let bestDamageTypes: { type: string; enType: string }[] = [];
    let filteredBestDamageTypes: { type; value; enType }[] = [];
    switch (selectedTypes.size) {
      case 0:
        return alert('error');
      case 1:
        bestDamageTypes = this.findBestDamageTypes(selectedTypes);
        this.router.navigate(['results']);
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
        this.router.navigate(['results']);
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
    let pokemonsOfTheseTypes = [];
    this.pokemonsListBytypes = [];
    for (let i = 0; i < types.length; i++) {
      pokemonsOfTheseTypes.push(
        this.requestPokemonService.getPokemonsOfThisType(types[i].enType)
      );
    }
    forkJoin(pokemonsOfTheseTypes).subscribe((pokemons) => {
      pokemons.forEach((pokies: TypeDetails) => {
        this.pokemonsListBytypes.push(pokies.pokemon);
      });
      return this.getRandomPokemonsOfTheseTypes(this.pokemonsListBytypes);
    });
  }

  getRandomPokemonsOfTheseTypes(pokemonList) {
    let pokemonsToGet: Observable<any>[] = [];
    pokemonList.forEach((pokemonsOfOneType) => {
      let random: number = Math.floor(Math.random() * 50);
      pokemonsToGet.push(pokemonsOfOneType[random].pokemon.name);
    });
    return this.requestForPokemon(pokemonsToGet);
  }

  requestForPokemon(pokemons) {
    let pokemonsGetter: Observable<any>[] = [];
    let pokemonsGot = [];
    for (let pokemon of pokemons) {
      pokemonsGetter.push(this.requestPokemonService.getPokemons(pokemon));
    }
    forkJoin(pokemonsGetter).subscribe((results) => {
      results.forEach((pokemonGot) => {
        pokemonsGot.push({
          name: pokemonGot.name,
          image: pokemonGot.sprites.other,
        });
      });
      this.thePokemons.next(pokemonsGot);
    });
    return pokemonsGot;
  }
}
