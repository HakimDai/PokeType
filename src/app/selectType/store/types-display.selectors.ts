import {createFeatureSelector, createSelector} from '@ngrx/store';
import {State, typesDisplayFeatureKey} from './types-display.reducer';

export const selectTypesState = createFeatureSelector<State>(typesDisplayFeatureKey);

export const selectTypes = createSelector(selectTypesState, (state: State) => state.types);
