import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MoviesComponent } from './routes/movies/movies.component';
import { SearchComponent } from './components/search/search.component';

const routes: Routes = [
  {path: "movies", component: MoviesComponent},
  {path: "search", component: SearchComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
