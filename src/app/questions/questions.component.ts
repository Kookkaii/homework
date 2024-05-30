import { Component } from '@angular/core';
import { QuestionService } from '../services/question.service';
import { StorageService } from '../services/storage.service';
import { Router } from '@angular/router';
import { questionCategories } from '../models/questionCategories';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrl: './questions.component.css'
})
export class QuestionsComponent {
  public questionCategories: questionCategories[] = [];
  constructor(private questionService: QuestionService,
    private storage: StorageService,
    private router: Router) {
  }

  ngOnInit(): void {
    this.questionService.getCategories().subscribe(rs => {
      if (rs !== null) {
        if (rs.data !== null) {
          this.questionCategories = rs.data;
        }
        else {
          console.log('Error');
        }
      }
    },
      error => {
        console.log('API call failed', error);
        this.router.navigate(['/login']); // เปลี่ยนเส้นทางไปยัง /login เมื่อเกิดข้อผิดพลาด
      });
  }
}
