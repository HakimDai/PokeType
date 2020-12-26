import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TypeDetails } from 'src/app/shared/models/typeDetails.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RequestPokemonService {
  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getPokemonsOfThisType(type): Observable<TypeDetails> {
    return this.http.get<TypeDetails>(`${this.apiUrl}/type/${type}`);
  }

  getPokemons(pokemon: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/pokemon/${pokemon}`);
  }
}
