import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MoviesComponent } from './routes/movies/movies.component';
import { HomeComponent } from './routes/home/home.component';

const routes: Routes = [
  { path: '',
  redirectTo: '/home',
  pathMatch: 'full'
  },
  {path: "home", component: HomeComponent},
  {path: "movies", component: MoviesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
