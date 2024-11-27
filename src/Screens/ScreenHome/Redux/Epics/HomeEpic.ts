import {switchMap, catchError} from 'rxjs/operators';
import {from, of} from 'rxjs';
import axios from 'axios';
import {
  fetchDataFailure,
  fetchDataRequest,
  fetchDataSuccess,
  HomeActions,
} from '../Slices/HomeSlice';
import {Observable} from 'rxjs';
import {ofType} from 'redux-observable';

const API_URL = 'https://74453a5be21f4f0ca12748ff2e709ebc.api.mockbin.io/';

export const homeEpic = (action$: Observable<HomeActions>) =>
  action$.pipe(
    ofType(fetchDataRequest.type),
    switchMap(() =>
      from(axios.get(API_URL)).pipe(
        switchMap(response => of(fetchDataSuccess(response.data.data))),
        catchError(error => of(fetchDataFailure(error.message))),
      ),
    ),
  );
