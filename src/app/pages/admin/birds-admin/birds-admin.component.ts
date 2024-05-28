import { Component } from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {Birds} from "../../../models/birds";
import {BirdsService} from "../../../services/birds.service";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-birds-admin',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf,
    ReactiveFormsModule
  ],
  templateUrl: './birds-admin.component.html',
  styleUrl: './birds-admin.component.css'
})
export class BirdsAdminComponent {
  birds: Birds[];
  searchform! : FormGroup;
  closeResult: string = '';
  dogsToDelete: Birds | null = null;
  private birdsId: BirdsService | undefined;

  constructor(
    private birdsService: BirdsService,
    private fb: FormBuilder) {
    this.birds = [];
  }

  ngOnInit() {
    this.initList();
  }

  initList() {
    this.getAllBirds();
    this.searchform=this.fb.group({
      name:[null]
    })
  }

  getAllBirds() {
    this.birdsService.getAllBirds().subscribe({
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
}
