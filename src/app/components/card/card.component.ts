import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Movie } from 'src/models/Movie';
import { MovieService } from 'src/app/services/movie.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  
  @Input()
  movie!: Movie;

  @Output() favoriteUpdated: EventEmitter<boolean> = new EventEmitter();

  constructor(private movieService: MovieService, private matSnackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  
  public setMovieFavorite(): void {
    this.movieService.toggleMovieFavorite(this.movie.movieId).subscribe(
      (response: Movie) => {
        this.movie.favorite = !this.movie.favorite;
        this.matSnackBar.open("Sucesso.", "", { duration : 500 } );
        if(!this.movie.favorite) {
          this.favoriteUpdated.emit(this.movie.favorite);
        }

      },
      (error: HttpErrorResponse) => {
        alert(`(${error.status}) ${error.error}`);
      }
    );
  }

}
