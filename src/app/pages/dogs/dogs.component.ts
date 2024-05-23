import {Component, OnInit} from '@angular/core';
import {Dogs} from "../../models/dogs";
import {AnimalService} from "../../services/animal.service";
import {NgFor} from "@angular/common";
import {FormBuilder, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {ModalModule} from "ngx-bootstrap/modal";

@Component({
  selector: 'app-dogs',
  standalone: true,
  imports: [
    NgFor,
    ReactiveFormsModule
  ],
  templateUrl: './dogs.component.html',
  styleUrl: './dogs.component.css'
})
export class DogsComponent implements OnInit{
  dogs: Dogs[];
  searchform! : FormGroup;
  selectedDog: any;

  constructor(
    private animalService: AnimalService,
    private fb: FormBuilder
  ) {
    this.dogs = [];
    this.selectedDog = null;
  }

  selectDog(dog: any) {
    this.selectedDog = dog;
  }

  ngOnInit() {
    this.initList();
    this.searchform=this.fb.group({
      name:[null]
    })
  }

  initList() {
    this.getDogs();
  }

  getDogs() {
    this.animalService.getDogs().subscribe({
      next: response => {
        this.dogs = response;
      },
      error: err => {
        alert("Error reading list");
      }
    });
  }


  searchDogs(): void {
    const name = this.searchform.get('name')?.value;
    if (name) {
      this.animalService.searchDogsName(name)
        .subscribe(
          dogs => {
            console.log('Search Results:', dogs);
            this.dogs = dogs;
          },
          error => {
            console.error('Error during search:', error);
            alert('Error occurred during search');
          }
        );
    } else {
      this.getDogs();
    }
  }

}
