import {Component, OnInit} from '@angular/core';
import {NgForOf} from "@angular/common";
import {AnimalService} from "../../services/animal.service";
import {Birds} from "../../models/birds";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";

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

  constructor(
    private animalService: AnimalService,
    private fb: FormBuilder
  ) {
    this.birds = [];
  }

  ngOnInit() {
    this.initList();
    this.searchform=this.fb.group({
      name:[null]
    })
  }

  initList() {
    this.getBirds();
  }


  getBirds() {
    this.animalService.getBirds().subscribe({
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
      this.animalService.searchBirdsName(name)
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
      this.getBirds();
    }
  }

}
