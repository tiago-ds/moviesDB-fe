import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Movie } from '../../models/Movie';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private apiServerURL = environment.apiBaseURL;
  constructor(private http: HttpClient) { }

  public getMovies(): Observable<Movie[]> {
    return this.http.get<Movie[]>(`${this.apiServerURL}/movie/all/sorted`);
  }

  public searchMovies(name: string): Observable<Movie[]> {
    return this.http.get<Movie[]>(`${this.apiServerURL}/movie/search/${name}`);
  }

  public getFavoriteMovies(): Observable<Movie[]> {
    return this.http.get<Movie[]>(`${this.apiServerURL}/movie/favorites`);
  }

  public toggleMovieFavorite(movieID: number): Observable<Movie> {
    console.log(`${this.apiServerURL}/movie/update/toggle-favorite/${movieID}`);
    return this.http.put<Movie>(`${this.apiServerURL}/movie/update/toggle-favorite/${movieID}`, {});
  }
}
