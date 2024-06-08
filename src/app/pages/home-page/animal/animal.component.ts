import {Component, OnInit, ViewChild} from '@angular/core';
import { Dogs } from "../../../models/dogs";
import { FormBuilder, FormGroup } from "@angular/forms";
import {NgForOf} from "@angular/common";
import { environment } from '../../../../environments/environments';
import {TabsetComponent, TabsModule} from "ngx-bootstrap/tabs";
import {Cats} from "../../../models/cats";
import {Birds} from "../../../models/birds";
import {CarouselModule} from "ngx-bootstrap/carousel";
import {BirdsService} from "../../../services/birds.service";
import {CatsService} from "../../../services/cats.service";
import {DogsService} from "../../../services/dogs.service";


@Component({
  selector: 'app-animals',
  standalone: true,
  imports: [
    NgForOf,
    TabsModule,
    CarouselModule,
  ],

  templateUrl:'./animal.component.html',
  styleUrl: './animal.component.css'
})

export class AnimalComponent implements OnInit {
  dogs: Dogs[];
  cats:Cats[];
  birds:Birds[];
  searchform!: FormGroup;
  @ViewChild('staticTabs', { static: false }) staticTabs?: TabsetComponent;

  constructor(
    private birdsService:BirdsService,
    private catsService:CatsService,
    private dogsService:DogsService,
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
    this.getDogsLimit();
    this.getCatsLimit();
    this.getBirdsLimit();
  }

  getDogsLimit() {
    this.dogsService.getDogsLimit().subscribe({
      next: response => {
        this.dogs = response;
      },
      error: err => {
        alert("Error reading dogs");
        }
    });
  }

  getCatsLimit() {
    this.catsService.getCatsLimit().subscribe({
      next: response => {
        this.cats = response;
      },
      error: err => {
        alert("Error reading list");
      }
    });
  }


  getBirdsLimit() {
    this.birdsService.getBirdsLimit().subscribe({
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
