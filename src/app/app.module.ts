import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { ValidationErrorComponent } from './validation-error/validation-error.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ErrorDialogComponent } from './error-dialog/error-dialog.component';
import { QuestionsComponent } from './questions/questions.component';
import { LayoutComponent } from './layout/layout.component';
import { QuestionsDetailComponent } from './questions-detail/questions-detail.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RegisterComponent,
    LoginComponent,
    ValidationErrorComponent,
    ErrorDialogComponent,
    QuestionsComponent,
    LayoutComponent,
    QuestionsDetailComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MatDialogModule,
    MatButtonModule,
    MatSnackBarModule,
    CommonModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }