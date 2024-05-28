import { Component } from '@angular/core';
import {DogsAdminComponent} from "./dogs-admin/dogs-admin.component";
import {CatsAdminComponent} from "./cats-admin/cats-admin.component";
import {BirdsAdminComponent} from "./birds-admin/birds-admin.component";
import {RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    DogsAdminComponent,
    CatsAdminComponent,
    BirdsAdminComponent
  ],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {
  selectedContent: string = 'app-dogs-admin';

  selectContent(content: string) {
    this.selectedContent = content;
  }
}
