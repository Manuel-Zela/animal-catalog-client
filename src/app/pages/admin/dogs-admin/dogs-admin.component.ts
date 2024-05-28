import { Component } from '@angular/core';
import {Dogs} from "../../../models/dogs";
import {DogsService} from "../../../services/dogs.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {NgForOf} from "@angular/common";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AnimalService} from "../../../services/animal.service";

@Component({
  selector: 'app-dogs-admin',
  standalone: true,
  imports: [
    NgForOf,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './dogs-admin.component.html',
  styleUrl: './dogs-admin.component.css'
})
export class DogsAdminComponent {
  dogs: Dogs[];
  searchform! : FormGroup;
  closeResult: string = '';
  dogsToDelete: Dogs | null = null;
  private dogsId: DogsService | undefined;

  constructor(
    private dogsService: DogsService,
    private fb: FormBuilder) {
    this.dogs = [];
  }

  ngOnInit() {
    this.initList();
  }

  initList() {
    this.getAllDogs();
    this.searchform=this.fb.group({
      name:[null]
    })
  }

  getAllDogs() {
    this.dogsService.getAllDogs().subscribe({
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
      this.dogsService.searchDogsName(name)
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
      this.getAllDogs();
    }

  }
}
