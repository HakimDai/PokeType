import { createAction, props } from '@ngrx/store';
import { TypeFetchResult } from '../models/typeFetchResult';

export const loadTypes = createAction('[Types Display] Load Types');

export const loadTypesSuccess = createAction(
  '[Types Display Effect] Load Types Success',
  props<{ types: TypeFetchResult['results'] }>()
);

export const loadTypesFailure = createAction(
  '[Types Display Effect] Load Types Failure',
  props<{ error: any }>()
);
