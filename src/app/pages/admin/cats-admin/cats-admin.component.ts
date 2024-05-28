import { Component } from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CatsService} from "../../../services/cats.service";
import {Cats} from "../../../models/cats";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-cats-admin',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf,
    ReactiveFormsModule
  ],
  templateUrl: './cats-admin.component.html',
  styleUrl: './cats-admin.component.css'
})
export class CatsAdminComponent {
  cats: Cats[];
  searchform! : FormGroup;
  closeResult: string = '';
  dogsToDelete: Cats | null = null;
  private catsId: CatsService | undefined;

  constructor(
    private catsService: CatsService,
    private fb: FormBuilder) {
    this.cats = [];
  }

  ngOnInit() {
    this.initList();
  }

  initList() {
    this.getAllCats();
    this.searchform=this.fb.group({
      name:[null]
    })
  }

  getAllCats() {
    this.catsService.getAllCats().subscribe({
      next: response => {
        this.cats = response;
      },
      error: err => {
        alert("Error reading list");
      }
    });
  }

  searchCats(): void {
    const name = this.searchform.get('name')?.value;
    if (name) {
      this.catsService.searchCatsName(name)
        .subscribe(
          cats => {
            console.log('Search Results:', cats);
            this.cats = cats;
          },
          error => {
            console.error('Error during search:', error);
            alert('Error occurred during search');
          }
        );
    } else {
      this.getAllCats();
    }

  }
}

