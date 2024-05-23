import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {HeaderComponent} from "./shared/header/header.component";
import {FooterComponent} from "./shared/footer/footer.component";
import {HomePageComponent} from "./pages/home-page/home-page.component";
import {HttpClientModule} from "@angular/common/http";
import {CarouselComponent} from "./pages/home-page/carousel/carousel.component";
import {FormsModule} from "@angular/forms";
import {CarouselModule} from "ngx-bootstrap/carousel";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet , HeaderComponent , FooterComponent,HomePageComponent,
    HttpClientModule,CarouselComponent,FormsModule , CarouselModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'animal-catalog-client';
}
