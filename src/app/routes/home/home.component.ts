import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  isSearching: boolean = false;

  constructor(private router : Router) { }

  ngOnInit(): void {
  }

  public goToFavorites() {
    this.router.navigateByUrl('/movies', {state:{currentFilter:"favorites"}})
  }

  public updateSearchState(event : boolean) {
    this.isSearching = event;
  }

}
