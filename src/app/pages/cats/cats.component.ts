import {Component, OnInit} from '@angular/core';
import {NgForOf} from "@angular/common";
import {Cats} from "../../models/cats";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {environment} from "../../../environments/environments";
import {CatsService} from "../../services/cats.service";

@Component({
  selector: 'app-cats',
  standalone: true,
  imports: [
    NgForOf,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './cats.component.html',
  styleUrl: './cats.component.css'
})
export class CatsComponent implements OnInit{
  cats: Cats[];
  searchform! : FormGroup;
  selectedCat: any;

  constructor(
    private catsService: CatsService,
    private fb: FormBuilder
  ) {
    this.cats = [];
    this.selectedCat = null;
  }

  selectCat(cat: any) {
    this.selectedCat = cat;
  }

  ngOnInit() {
    this.initList();
    this.searchform=this.fb.group({
      name:[null]
    })
  }

  initList() {
    this.getCats();
  }


  getCats() {
    this.catsService.getAllCats("").subscribe({
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
      this.getCats();
    }
  }

    protected readonly environment = environment;
}
