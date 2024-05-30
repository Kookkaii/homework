import { Component } from '@angular/core';
import { StorageService } from '../services/storage.service';
import { userInfo } from '../models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {
  fullName!: string;
  constructor(private storage: StorageService,private router: Router) { }

  ngOnInit(): void {
    this.fullName = this.storage.getFullName();
    //console.log('user',this.fullName);
  }
  logOut() {
    this.router.navigate(['/login']);
  }
}
