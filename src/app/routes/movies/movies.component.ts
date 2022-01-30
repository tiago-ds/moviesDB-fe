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
  
  offset: number = 0;
  offsetConst: number = 10;
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
      this.movieService.getMoviesByPage(this.offset).subscribe(
        (response: Movie[]) => {
          this.movies = response;
          this.offset += this.offsetConst;
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
    const filters: Record<MovieFilterSelection, (movie: Movie) => boolean> = {
      "all": (() => true),
      "favorites": (movie => movie.favorite),
      "before00s": (movie => movie.launchYear < 2000),
      "00s": (movie => movie.launchYear >= 2000 && movie.launchYear < 2010),
      "10s": (movie => movie.launchYear >= 2010 && movie.launchYear < 2020),
      "20s": (movie => movie.launchYear >= 2020 && movie.launchYear < 2030),
      "topImdb" : (movie => movie.imbdRate >= 7.5),
    }
    this.currentFilter = currentFilter;
    this.currentShownMovies = this.movies?.filter(filters[currentFilter]);

  }
  
  public onFavoriteUpdate() {
    if(this.currentFilter != "favorites") {
      return;
    }
    this.updateCurrentList(this.currentFilter);
  }

  public onScroll() {
    this.isRequesting = true;
    this.movieService.getMoviesByPage(this.offset).subscribe(
      (response: Movie[]) => {
        this.movies?.push(...response);
        this.offset += this.offsetConst;
        this.isRequesting = false;
        this.updateCurrentList(this.currentFilter);
      },
      (error: HttpErrorResponse) => {
        this.isRequesting = false;
        if(error instanceof Error) {
          alert("Request Timeout");
        }
        alert(`(${error.status}) ${error.error}`);
      }
    );
  }
  
}


export type MovieFilterSelection = "all" | "favorites" | "before00s" | "00s" | "10s" | "20s" | "topImdb";