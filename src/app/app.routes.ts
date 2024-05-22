import { Routes } from '@angular/router';
import {HomePageComponent} from "./pages/home-page/home-page.component";
import {GalleryComponent} from "./pages/gallery/gallery.component";

export const routes: Routes = [
  {path:"" , component:HomePageComponent },
  {path:"gallery" , component:GalleryComponent}
];
