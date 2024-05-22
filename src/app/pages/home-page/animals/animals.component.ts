import {Component, OnInit, ViewChild} from '@angular/core';
import { DogsService } from "../../../services/dogs.service";
import { Dogs } from "../../../models/dogs";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import {NgForOf} from "@angular/common";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import { environment } from '../../../../environments/environments';
import {TabsetComponent, TabsModule} from "ngx-bootstrap/tabs";
import {Cats} from "../../../models/cats";
import {Birds} from "../../../models/birds";

@Component({
  selector: 'app-animals',
  standalone: true,
  imports: [
    NgForOf,
    TabsModule
  ],
  templateUrl:'./animals.component.html',
  styleUrl: './animals.component.css'
})
export class AnimalsComponent implements OnInit {
  dogs: Dogs[];
  cats:Cats[];
  birds:Birds[];
  searchform!: FormGroup;
  @ViewChild('staticTabs', { static: false }) staticTabs?: TabsetComponent;

  constructor(
    private dogsService: DogsService,
    private fb: FormBuilder,
    private router: Router,
    private modalService: NgbModal,
  ) {
    this.dogs = [];
    this.cats=[];
    this.birds=[];
  }

  disableEnable() {
    if (this.staticTabs?.tabs[2]) {
      this.staticTabs.tabs[2].disabled = !this.staticTabs.tabs[2].disabled;
    }
  }



  ngOnInit() {
    this.initList();
    this.searchform = this.fb.group({
      name: [null]
    });
  }

  initList() {
    this.getDogs();
    this.getCats();
    this.getBirds();
  }

  getDogs() {
    this.dogsService.getDogs().subscribe({
      next: response => {
        this.dogs = response;
      },
      error: err => {
        alert("Error reading list");
      }
    });
  }

  getCats() {
    this.dogsService.getCats().subscribe({
      next: response => {
        this.cats = response;
      },
      error: err => {
        alert("Error reading list");
      }
    });
  }


  getBirds() {
    this.dogsService.getBirds().subscribe({
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
