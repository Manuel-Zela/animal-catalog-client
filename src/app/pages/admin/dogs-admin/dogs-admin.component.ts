import {Component, OnInit} from '@angular/core';
import {Dogs} from "../../../models/dogs";
import {DogsService} from "../../../services/dogs.service";
import {ModalDismissReasons, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {JsonPipe, NgForOf, NgIf} from "@angular/common";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import { environment } from '../../../../environments/environments';

@Component({
  selector: 'app-dogs-admin',
  standalone: true,
  imports: [
    NgForOf,
    FormsModule,
    ReactiveFormsModule,
    JsonPipe,
    NgIf,
  ],
  templateUrl: './dogs-admin.component.html',
  styleUrl: './dogs-admin.component.css'
})
export class DogsAdminComponent implements OnInit{
  protected readonly environment = environment;
  dogs: Dogs[];
  searchform! : FormGroup;
  closeResult: string = '';
  dogsToDelete: Dogs | null = null;
  private dogsId: DogsService | undefined;
  emptyModel= {image: {link: null, file: null, name: null}, description: "", origin: "",
    breed_group: "", colors: "", name: "", lifespan:"", temperament:"", size:""} as Dogs ;
   model: Dogs =this.emptyModel;


  constructor(
    private dogsService: DogsService,
    private fb: FormBuilder,
    private modalService: NgbModal) {
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
    this.dogsService.getAllDogs("").subscribe({
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


  openCreateEdit(content: any, data: Dogs) {
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
    formData.append("origin", this.model.origin + "");
    formData.append("temperament", this.model.temperament + "");
    formData.append("breed_group", this.model.breed_group || "");
    formData.append("name", this.model.name || "");
    formData.append("lifespan", this.model.lifespan || "");
    formData.append("size", this.model.size || "");
    formData.append("colors", this.model.colors || "");

    this.dogsService.updateDogs(formData).subscribe(
      (result) => {
        console.log('Update result:', result);
        if (result?.success) {
          this.ngOnInit();
          this.modalService.dismissAll();
          alert("Dogs " + (this.model.id ? "updated" : "created"));
        } else {
          alert(result?.messages?.join(","));
        }
      },
      (error) => {
        console.error('Error updating dog:', error);
        alert('Error updating dog');
      }
    );
  }

  setImage($event: any, dto: Dogs) {
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
    if (this.dogsToDelete) {
      this.dogsService.deleteDogs(this.dogsToDelete.id)
        .subscribe(() => {
          this.initList();
          this.modalService.dismissAll();
          this.dogsToDelete = null;
        });
    }
  }

  openDelete(targetModal: any, dogs: Dogs) {
    this.dogsToDelete = dogs;
    this.modalService.open(targetModal, {
      backdrop: 'static',
      size: 'lg'
    });
  }
}
