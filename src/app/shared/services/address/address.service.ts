import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Country, State, City } from '../../models/address.model';

@Injectable({
  providedIn: 'root'
})
export class AddressService {
  constructor(private http: HttpClient) {}

  API_URL = 'https://www.universal-tutorial.com/api/';

  getAccessToken() {
    return this.http.get(this.API_URL + 'getaccesstoken', {
      headers: {
        'Accept': 'application/json',
        'api-token' : 'vSP2F6ytkQtmJm_e_tDWwpYzkkOl5_XQE_EDzslxHg4_EoW2zvbR5ozjgNSKAoQICEE',
        'user-email': 'techshji@gmail.com'
      },
    });
  }

  getCountries(auth_token: string) : Observable<Country[]> {
    return this.http.get<Country[]>(this.API_URL + 'countries', {
      headers: {
        'Authorization': `Bearer ${auth_token}`
      },
    });
  }

  getStates(auth_token: string, country: string) : Observable<State[]> {
    return this.http.get<State[]>(this.API_URL + 'states/' + country, {
      headers: {
        'Authorization': `Bearer ${auth_token}`
      },
    });
  }

  getCities(auth_token: string, state: string) : Observable<City[]> {
    return this.http.get<City[]>(this.API_URL + 'cities/' + state, {
      headers: {
        'Authorization': `Bearer ${auth_token}`
      },
    });
  }
}
