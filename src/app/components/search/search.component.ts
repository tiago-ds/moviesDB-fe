import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Movie } from '../../../models/Movie';
import { MovieService } from '../../services/movie.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  searchString: string = "";

  @Output() searchState: EventEmitter<boolean> = new EventEmitter();

  constructor(private movieService: MovieService, private router: Router) { }

  ngOnInit(): void {
  }

  public searchMovies(name: string): void {
    this.searchState.emit(true);
    this.movieService.searchMovies(name).subscribe(
      (response: Movie[]) => {
        this.searchState.emit(false);
        if(response.length == 0) {
          alert("Não foi possível encontrar filmes com esse nome!");
        }
        this.router.navigate(['movies']);
      },
      (error: HttpErrorResponse) => {
        this.searchState.emit(false);
        alert(error.message);
      }
    )
  }

}
