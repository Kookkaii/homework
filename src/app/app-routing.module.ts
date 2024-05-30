import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { QuestionsComponent } from './questions/questions.component';
import { QuestionsDetailComponent } from './questions-detail/questions-detail.component';
import { LayoutComponent } from './layout/layout.component';

const routes: Routes = [
  { 
    path: 'questionnaire', 
    redirectTo: '/login', 
    pathMatch: 'full'
  },
  {
    path: 'questionnaire',
    component: LayoutComponent,
    children: [
      { path: 'question-list', component: QuestionsComponent },
      { path: 'questions-detail/:id', component: QuestionsDetailComponent },
    ]
  },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: 'login', pathMatch: 'full' }, //ถ้าไม่ใช้ path ที่กำหนดก่อนหน้าให้กลับไป Home

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
