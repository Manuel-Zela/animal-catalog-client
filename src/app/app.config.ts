import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import {provideHttpClient} from "@angular/common/http";
import {AlertConfig, AlertModule} from "ngx-bootstrap/alert";
import {NgbAlert} from "@ng-bootstrap/ng-bootstrap";
import {ButtonsModule} from "ngx-bootstrap/buttons";

export const appConfig: ApplicationConfig = {
  providers: [ButtonsModule, AlertModule, AlertConfig, NgbAlert , provideHttpClient() , provideRouter(routes)  ]
};
