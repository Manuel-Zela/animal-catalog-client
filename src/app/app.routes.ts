import { Routes } from '@angular/router';
import {HomePageComponent} from "./pages/home-page/home-page.component";
import {DogsComponent} from "./pages/dogs/dogs.component";
import {CatsComponent} from "./pages/cats/cats.component";
import {BirdsComponent} from "./pages/birds/birds.component";
import {AdminComponent} from "./pages/admin/admin.component";


export const routes: Routes = [
  {path:"" , component:HomePageComponent },
  {path:"dogs" , component:DogsComponent},
  {path:"cats" , component:CatsComponent},
  {path:"birds", component:BirdsComponent},
  {path:"admin" , component:AdminComponent},
];
