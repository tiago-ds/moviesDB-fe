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
  public currentShownMovies: Movie[] | undefined;
  public currentFilter: MovieFilterSelection = "all";
  
  isRequesting: boolean = false;

  constructor(private movieService: MovieService, private router: Router, private activatedRoute: ActivatedRoute) {
    if (this.router?.getCurrentNavigation()?.extras?.state?.['currentFilter']) {
      this.currentFilter = this.router?.getCurrentNavigation()?.extras?.state?.['currentFilter'];
    }
  }

  async ngOnInit(): Promise<void> {
    await this.getMovies();
    this.updateCurrentList(this.currentFilter);
  }

  public getMovies(): Promise<void> {
    this.isRequesting = true;
    return new Promise((resolve, reject) => {
      this.movieService.getMovies().subscribe(
        (response: Movie[]) => {
          this.movies = response;
          this.isRequesting = false;
          resolve();
        },
        (error: HttpErrorResponse) => {
          this.isRequesting = false;
          reject();
          alert(`(${error.status}) ${error.error}`);
        }
      );
    });
  }

  public updateCurrentList(currentFilter : MovieFilterSelection): void {
    this.currentFilter = currentFilter;
    if(currentFilter == "all") {
      this.currentShownMovies = this.movies;
    }else if(currentFilter == "favorites") {
      this.currentShownMovies = this.movies?.filter(movie => movie.favorite);
    }else if(currentFilter == "before00s") {
      this.currentShownMovies = this.movies?.filter(movie => movie.launchYear < 2000);
    }else if(currentFilter == "00s") {
      this.currentShownMovies = this.movies?.filter(movie => movie.launchYear >= 2000 && movie.launchYear < 2010);
    }else if(currentFilter == "10s") {
      this.currentShownMovies = this.movies?.filter(movie => movie.launchYear >= 2010 && movie.launchYear < 2020);
    }else if(currentFilter == "20s") {
      this.currentShownMovies = this.movies?.filter(movie => movie.launchYear >= 2020 && movie.launchYear < 2030);
    }else if(currentFilter == "topImdb") {
      this.currentShownMovies = this.movies?.filter(movie => movie.imbdRate >= 7.5);
    }
  }
  
  public onFavoriteUpdate() {
    if(this.currentFilter != "favorites") {
      return;
    }
    this.updateCurrentList(this.currentFilter);
  }
  
}


export type MovieFilterSelection = "all" | "favorites" | "before00s" | "00s" | "10s" | "20s" | "topImdb";