import {Component, OnInit} from '@angular/core';
import {NgForOf} from "@angular/common";
import {Birds} from "../../models/birds";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {environment} from "../../../environments/environments";
import {BirdsService} from "../../services/birds.service";

@Component({
  selector: 'app-birds',
  standalone: true,
    imports: [
        NgForOf,
        FormsModule,
        ReactiveFormsModule
    ],
  templateUrl: './birds.component.html',
  styleUrl: './birds.component.css'
})
export class BirdsComponent implements OnInit{
  birds: Birds[];
  searchform! : FormGroup;
  selectedBird: any;

  constructor(
    private birdsService: BirdsService,
    private fb: FormBuilder
  ) {
    this.birds = [];
    this.selectedBird=[];
  }

  selectBird(bird :any){
    this.selectedBird=bird ;
  }

  ngOnInit() {
    this.initList();
    this.searchform=this.fb.group({
      name:[null]
    })
  }

  initList() {
    this.getAllBirds();
  }


  getAllBirds() {
    this.birdsService.getAllBirds("").subscribe({
      next: response => {
        this.birds = response;
      },
      error: err => {
        alert("Error reading list");
      }
    });
  }


  searchBirds(): void {
    const name = this.searchform.get('name')?.value;
    if (name) {
      this.birdsService.searchBirdsName(name)
        .subscribe(
          birds => {
            console.log('Search Results:', birds);
            this.birds = birds;
          },
          error => {
            console.error('Error during search:', error);
            alert('Error occurred during search');
          }
        );
    } else {
      this.getAllBirds();
    }
  }

  protected readonly environment = environment;
}
