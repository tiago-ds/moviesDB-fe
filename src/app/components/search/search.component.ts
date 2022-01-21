import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
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

  constructor(private movieService: MovieService, private router: Router) { }

  ngOnInit(): void {
  }

  public searchMovies(name: string): void {
    console.log(name);
    this.movieService.searchMovies(name).subscribe(
      (response: Movie[]) => {
        if(response.length == 0) {
          alert("Não foi possível encontrar filmes com esse nome!");
        }
        this.router.navigate(['movies']);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

}
