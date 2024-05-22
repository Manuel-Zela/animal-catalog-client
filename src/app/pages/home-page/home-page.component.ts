import { Component } from '@angular/core';
import {AnimalsComponent} from "./animals/animals.component";
import {HttpClientModule} from "@angular/common/http";
import {DogsService} from "../../services/dogs.service";

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    AnimalsComponent,HttpClientModule
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {

}
