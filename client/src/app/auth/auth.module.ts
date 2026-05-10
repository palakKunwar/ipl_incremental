import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { ReactiveFormsModule } from "@angular/forms";

import { AuthRoutingModule } from "./auth-routing.module";
import { AuthInterceptor } from "../auth.interceptors";

import { AuthComponent } from "./auth.component";
import { LoginComponent } from "./components/login/login.component";
import { LogoutComponent } from "./components/logout/logout.component";
import { RegistrationComponent } from "./components/registration/registration.component";

@NgModule({
  declarations: [
    AuthComponent,
    LoginComponent,
    LogoutComponent,
    RegistrationComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  exports: [
    AuthComponent,
    LoginComponent,
    LogoutComponent,
    RegistrationComponent
  ]
})
export class AuthModule {}