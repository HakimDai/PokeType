import { Description } from './description.model';
import { PokemonShortDetail } from './pokemonShortDetail.model';

export interface TypeDetails {
  damage_relations: {
    double_damage_from: Description[];
    double_damage_to: Description[];
    half_damage_from: Description[];
    half_damage_to: Description[];
    no_damage_from: Description[];
    no_damage_to: Description[];
  };
  name: string;
  pokemon: PokemonShortDetail[];
}
