import { Component } from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CatsService} from "../../../services/cats.service";
import {Cats} from "../../../models/cats";
import {JsonPipe, NgForOf, NgIf} from "@angular/common";
import {ModalDismissReasons, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import { environment } from '../../../../environments/environments';

@Component({
  selector: 'app-cats-admin',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf,
    JsonPipe,
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './cats-admin.component.html',
  styleUrl: './cats-admin.component.css'
})
export class CatsAdminComponent {
  protected readonly environment = environment;
  cats: Cats[];
  searchform! : FormGroup;
  closeResult: string = '';
  catsToDelete: Cats | null = null;
  private catsId: CatsService | undefined;
  emptyModel= {image: {link: null, file: null, name: null}, description: "" ,colors: "", name: "",  temperament:"" , origin:""} as Cats ;
  model: Cats =this.emptyModel;


  constructor(
    private catsService: CatsService,
    private fb: FormBuilder,
    private modalService: NgbModal) {
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
      this.getAllCats();
    }
  }


  openCreateEdit(content: any, data: Cats) {
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
    formData.append("name", this.model.name || "");
    formData.append("colors", this.model.colors || "");

    this.catsService.updateCats(formData).subscribe(
      (result) => {
        console.log('Update result:', result);
        if (result?.success) {
          this.ngOnInit();
          this.modalService.dismissAll();
          alert("Cats " + (this.model.id ? "updated" : "created"));
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

  setImage($event: any, dto: Cats) {
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
    if (this.catsToDelete) {
      this.catsService.deleteCats(this.catsToDelete.id)
        .subscribe(() => {
          this.initList();
          this.modalService.dismissAll();
          this.catsToDelete = null;
        });
    }
  }

  openDelete(targetModal: any, cats: Cats) {
    this.catsToDelete = cats;
    this.modalService.open(targetModal, {
      backdrop: 'static',
      size: 'lg'
    });
  }
}
