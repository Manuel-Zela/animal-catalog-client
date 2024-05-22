import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {HeaderComponent} from "./shared/header/header.component";
import {FooterComponent} from "./shared/footer/footer.component";
import {HomePageComponent} from "./pages/home-page/home-page.component";
import {HttpClientModule} from "@angular/common/http";
import {AnimalsComponent} from "./pages/home-page/animals/animals.component";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet , HeaderComponent , FooterComponent,HomePageComponent,
    HttpClientModule,AnimalsComponent,FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'animal-catalog-client';
}
