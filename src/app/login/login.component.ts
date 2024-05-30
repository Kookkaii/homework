import { Component } from '@angular/core';
import { UserForm } from '../models/user-form';
import { AuthService } from '../services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { StorageService } from '../services/storage.service';
import { ErrorDialogComponent } from '../error-dialog/error-dialog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  form: UserForm = new UserForm();
 
  constructor(private authService: AuthService, private dialog: MatDialog, private storageService: StorageService,private route:Router) {}

  onSubmit() {
    const { username, email, password } = this.form;

     //this.storageService.saveUser({ username, email });

    // console.log('Username:', username);
    // console.log('Email:', email);
    // console.log('Password:', password);

    this.authService.register(username, password).subscribe({
      next: (res) => {
        console.log(res);
        this.storageService.saveUserInfo(res.data);
        this.route.navigate(['questionnaire/question-list']);
      },
      error: (err) => {
        console.error(err);
        this.dialog.open(ErrorDialogComponent, {
          data: { message: err.error.message },
        });
      },
    });
  }

}
