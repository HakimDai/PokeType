import {Injectable} from '@angular/core';
import {Type, types} from 'src/app/shared/models/typeEffectiveness.model';
import {BehaviorSubject, forkJoin, Observable} from 'rxjs';
import {RequestPokemonService} from 'src/app/selectType/services/request-pokemon.service';
import {Router} from '@angular/router';
import {PokemonShortDetail} from '../../shared/models/pokemonShortDetail.model';

@Injectable({
  providedIn: 'root',
})
export class ResearchTypeService {
  result: BehaviorSubject<{ type: string; enType: string }[]> = new BehaviorSubject<{ type: string; enType: string }[]>(undefined);
  pokemonsListBytypes: PokemonShortDetail[] = [];

  constructor(
    public requestPokemonService: RequestPokemonService,
    public router: Router
  ) {}

  searchType(selectedTypes: Set<Type>) {
    let bestDamageTypes: { type: string; enType: string }[] = [];
    let filteredBestDamageTypes: { type; value; enType }[] = [];
    switch (selectedTypes.size) {
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
        this.getPokemonsOfTheseTypes(res);
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
    for (let i = 0; i < types.length; i++) {
      pokemonsOfTheseTypes.push(
        this.requestPokemonService.getPokemonsOfThisType(types[i].enType)
      );
    }
    return forkJoin(pokemonsOfTheseTypes);
  }

  getRandomPokemonsOfTheseTypes(pokemonList) {
    let pokemonsToGet = [];
    pokemonList.forEach((pokemonsOfOneType) => {
      let random: number = Math.floor(Math.random() * 50);
      pokemonsToGet.push(pokemonsOfOneType[random].pokemon.name);
    });
    return pokemonsToGet;
  }

  requestForPokemon(pokemons) {
    let pokemonsGetter: Observable<any>[] = [];
    for (let pokemon of pokemons) {
      pokemonsGetter.push(this.requestPokemonService.getPokemons(pokemon));
    }
    return forkJoin(pokemonsGetter);
  }
}
