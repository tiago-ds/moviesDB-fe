import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Movie } from '../../../models/Movie';
import { MovieService } from '../../services/movie.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {

  public movies: Movie[] | undefined;
  public currentFilter: MovieFilterSelection = "all";

  constructor(private movieService: MovieService, private router: Router, private activatedRoute: ActivatedRoute) {
    if (this.router?.getCurrentNavigation()?.extras?.state?.['currentFilter']) {
      this.currentFilter = this.router?.getCurrentNavigation()?.extras?.state?.['currentFilter'];
    }
  }

  ngOnInit(): void {
    this.updateCurrentList(this.currentFilter);
  }

  public getMovies(): void {
    this.movieService.getMovies().subscribe(
      (response: Movie[]) => {
        this.movies = response;
      },
      (error: HttpErrorResponse) => {
        alert(`(${error.status}) ${error.error}`);
      }
    );
  }

  public getFavoriteMovies(): void {
    this.movieService.getFavoriteMovies().subscribe(
      (response: Movie[]) => {
        this.movies = response;
      },
      (error: HttpErrorResponse) => {
        alert(`(${error.status}) ${error.error}`);
      }
    );
  }

  public updateCurrentList(currentFilter : MovieFilterSelection): void {
    
    this.currentFilter = currentFilter;
    if(currentFilter == "all") {
      this.getMovies();
    }else if(currentFilter == "favorites") {
      this.getFavoriteMovies();
    }
  }
  
  public onFavoriteUpdate() {
    if(this.currentFilter == "all") {
      return;
    }
    this.updateCurrentList(this.currentFilter);
  }
  
}


export type MovieFilterSelection = "all" | "favorites";