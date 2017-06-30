import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MaterializeModule } from 'angular2-materialize';
import { Angular2TokenService } from 'angular2-token';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpModule } from '@angular/http';
import { HomeComponent } from './home/home.component';
import { UsersComponent } from './users/users.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { AuthDialogComponent } from './auth-dialog/auth-dialog.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { RegisterFormComponent } from './register-form/register-form.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from "./services/auth.service";
import { DragulaModule } from 'ng2-dragula/ng2-dragula';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UsersComponent,
    ToolbarComponent,
    AuthDialogComponent,
    LoginFormComponent,
    RegisterFormComponent
  ],
  imports: [
    BrowserModule,
    DragulaModule,
    HttpModule,
    FormsModule,
    AppRoutingModule,
    NgbModule.forRoot(),
    MaterializeModule
  ],
  providers: [Angular2TokenService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
