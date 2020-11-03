import {Action, createReducer, on} from '@ngrx/store';
import * as TypesDisplayActions from 'src/app/home/store/types-display.actions';

export interface State {
  types: [{name: string; url: string}];
}

export const initialState: State = {
  types: undefined
};

const TypesDisplayReducer = createReducer(
  initialState,
  on(TypesDisplayActions.loadTypesSuccess, ((state, action) => ({
      ...state, types: action.types.filter((type) => type.name !== 'unknown' && type.name !== 'shadow')
    }))
  ));

export function reducer(state: State | undefined, action: Action) {
  return TypesDisplayReducer(state, action);
}

export const typesDisplayFeatureKey = 'types';
