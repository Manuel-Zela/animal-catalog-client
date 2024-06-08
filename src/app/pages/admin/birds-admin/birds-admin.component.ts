import { Component } from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {Birds} from "../../../models/birds";
import {BirdsService} from "../../../services/birds.service";
import {JsonPipe, NgForOf, NgIf} from "@angular/common";
import {ModalDismissReasons, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import { environment } from '../../../../environments/environments';

@Component({
  selector: 'app-birds-admin',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf,
    JsonPipe,
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './birds-admin.component.html',
  styleUrl: './birds-admin.component.css'
})
export class BirdsAdminComponent {
  protected readonly environment = environment;
  birds: Birds[];
  searchform! : FormGroup;
  closeResult: string = '';
  birdsToDelete: Birds | null = null;
  private birdId: BirdsService | undefined;
  emptyModel= {image: {link: null, file: null, name: null}, species:"", family: "" , habitat: "", place_of_found:"", diet: "" , description: "" , weight_kg: "", height_cm:""} as Birds ;
  model: Birds =this.emptyModel;


  constructor(
    private birdsService: BirdsService,
    private fb: FormBuilder,
    private modalService: NgbModal) {
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


  openCreateEdit(content: any, data: Birds) {
    this.model = data;
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  create() {
    const formData = new FormData();
    formData.append("id", this.model.id);
    if (this.model.image)
      formData.append("image", this.model.image);
    formData.append("description", this.model.description + "");
    formData.append("diet", this.model.diet + "");
    formData.append("place_of_found", this.model.place_of_found + "");
    formData.append("name", this.model.name || "");
    formData.append("family", this.model.family || "");
    formData.append("habitat", this.model.habitat || "");
    formData.append("height_cm", this.model.height_cm || "");
    formData.append("species", this.model.species || "");
    formData.append("weight_kg", this.model.weight_kg || "");

    this.birdsService.updateBirds(formData).subscribe(
      (result) => {
        console.log('Update result:', result);
        if (result?.success) {
          this.ngOnInit();
          this.modalService.dismissAll();
          alert("Birds " + (this.model.id ? "updated" : "created"));
        } else {
          alert(result?.messages?.join(","));
        }
      },
      (error) => {
        console.error('Error updating Bird:', error);
        alert('Error updating bird');
      }
    );
  }

  setImage($event: any, dto: Birds) {
    if ($event.target.files && $event.target.files[0]) {
      const reader = new FileReader();

      reader.onload = (_event: any) => {
        this.model.image = $event.srcElement.files[0]
      };
      reader.readAsDataURL($event.target.files[0]);
    } else {
      alert("No file selected!")
    }
  }


  onDelete(): void {
    if (this.birdsToDelete) {
      this.birdsService.deleteBirds(this.birdsToDelete.id)
        .subscribe(() => {
          this.initList();
          this.modalService.dismissAll();
          this.birdsToDelete = null;
        });
    }
  }

  openDelete(targetModal: any, birds: Birds) {
    this.birdsToDelete = birds;
    this.modalService.open(targetModal, {
      backdrop: 'static',
      size: 'lg'
    });
  }
}
