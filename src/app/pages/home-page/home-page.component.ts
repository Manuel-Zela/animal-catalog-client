import { Component } from '@angular/core';
import {AnimalComponent} from "./animal/animal.component";
import {HttpClientModule} from "@angular/common/http";
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    AnimalComponent,HttpClientModule
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {


}
