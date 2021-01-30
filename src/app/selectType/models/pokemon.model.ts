import { Description } from '../../shared/models/description.model';

export interface Pokemon {
  name: string;
  types: [slot: number, type: Description];
  sprites: {
    front: string;
  };
  mainType: string;
}
