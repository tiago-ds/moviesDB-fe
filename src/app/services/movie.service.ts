import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, timeout } from 'rxjs';
import { Movie } from '../../models/Movie';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private apiServerURL = environment.apiBaseURL;
  constructor(private http: HttpClient) { }

  public searchMovies(name: string): Observable<Movie[]> {
    return this.http.get<Movie[]>(`${this.apiServerURL}/movie/search/${name}`).pipe(
      timeout({
        each: 60000,
      })
    );
  }

  public toggleMovieFavorite(movieId: number): Observable<Movie> {
    return this.http.put<Movie>(`${this.apiServerURL}/movie/toggle-favorite/${movieId}`, {}).pipe(
      timeout({
        each: 60000,
      })
    );
  }

  public getMoviesByPage(offset: number): Observable<Movie[]> {
    return this.http.get<Movie[]>(`${this.apiServerURL}/movie/batch/${offset}`).pipe(
      timeout({
        each: 60000,
      })
    );
  }
}
