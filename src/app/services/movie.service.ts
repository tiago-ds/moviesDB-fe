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
    return this.http.get<Movie[]>(`${this.apiServerURL}/movie/?sorted=true`);
  }

  public searchMovies(name: string): Observable<Movie[]> {
    return this.http.get<Movie[]>(`${this.apiServerURL}/movie/search/${name}`);
  }

  public getFavoriteMovies(): Observable<Movie[]> {
    return this.http.get<Movie[]>(`${this.apiServerURL}/movie/favorites`);
  }

  public toggleMovieFavorite(movieId: number): Observable<Movie> {
    const res = this.http.put<Movie>(`${this.apiServerURL}/movie/toggle-favorite/${movieId}`, {});
    return res;
  }
}
