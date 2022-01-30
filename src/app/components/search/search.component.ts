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
    if(name.trim().length == 0) {
      alert("Busca vazia.");
      return;
    }
    this.searchState.emit(true);
    this.movieService.searchMovies(name).subscribe(
      (response: Movie[]) => {
        this.searchState.emit(false);
        if(response.length == 0) {
          alert("Não foi possível encontrar novos filmes com esse nome!");
        }
        this.router.navigate(['movies']);
      },
      (error: HttpErrorResponse) => {
        this.searchState.emit(false);
        if(error instanceof Error) {
          alert("Request Timeout");
        }
        // Custom exception, Angular managed to reach DB
        else if(error.error.timestamp != undefined){
          alert(`${error.error.httpStatus}: ${error.error.message}`);
        }
        else {
          alert("Não foi possível conectar ao BD");
        }
      }
    )
  }

}
