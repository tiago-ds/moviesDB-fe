import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Movie } from '../../../models/Movie';
import { MovieService } from '../../services/movie.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {

  public movies: Movie[] | undefined;

  constructor(private movieService: MovieService) { }

  ngOnInit(): void {
    this.getMovies();
  }

  
  public getMovies(): void {
    this.movieService.getMovies().subscribe(
      (response: Movie[]) => {
        this.movies = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public getFavoriteMovies(): void {
    this.movieService.getFavoriteMovies().subscribe(
      (response: Movie[]) => {
        console.log(response);
        this.movies = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public setMovieFavorite(movieID: number): void {
    this.movieService.toggleMovieFavorite(movieID).subscribe(
      (response: Movie) => {
        let updatedMovie = this.movies?.find(movie => movie.movieID == movieID)!;
        updatedMovie.favorite = !updatedMovie?.favorite;
        if(!updatedMovie.favorite) {
          this.getFavoriteMovies();
        }
        console.log(response);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

}
