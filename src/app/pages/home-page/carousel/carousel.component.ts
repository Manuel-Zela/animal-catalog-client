import {Component, OnInit, ViewChild} from '@angular/core';
import { AnimalService } from "../../../services/animal.service";
import { Dogs } from "../../../models/dogs";
import { FormBuilder, FormGroup } from "@angular/forms";
import {NgForOf} from "@angular/common";
import { environment } from '../../../../environments/environments';
import {TabsetComponent, TabsModule} from "ngx-bootstrap/tabs";
import {Cats} from "../../../models/cats";
import {Birds} from "../../../models/birds";
import {CarouselModule} from "ngx-bootstrap/carousel";


@Component({
  selector: 'app-animals',
  standalone: true,
  imports: [
    NgForOf,
    TabsModule,
    CarouselModule,
  ],

  templateUrl:'./carousel.component.html',
  styleUrl: './carousel.component.css'
})

export class CarouselComponent implements OnInit {
  dogs: Dogs[];
  cats:Cats[];
  birds:Birds[];
  searchform!: FormGroup;
  @ViewChild('staticTabs', { static: false }) staticTabs?: TabsetComponent;

  constructor(
    private animalService: AnimalService,
    private fb: FormBuilder,

  ) {
    this.dogs = [];
    this.cats=[];
    this.birds=[];
  }



  ngOnInit() {
    this.initList();
  }

  initList() {
    this.get1Dogs();
    this.get1Cats();
    this.get1Birds();
  }

  get1Dogs() {
    this.animalService.get1Dogs().subscribe({
      next: response => {
        this.dogs = response;
      },
      error: err => {
        alert("Error reading dogs");
        }
    });
  }

  get1Cats() {
    this.animalService.get1Cats().subscribe({
      next: response => {
        this.cats = response;
      },
      error: err => {
        alert("Error reading list");
      }
    });
  }


  get1Birds() {
    this.animalService.get1Birds().subscribe({
      next: response => {
        this.birds = response;
      },
      error: err => {
        alert("Error reading list");
      }
    });
  }


  protected readonly environment = environment;
}
