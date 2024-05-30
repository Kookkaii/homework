import { Component } from '@angular/core';
import { QuestionService } from '../services/question.service';
import { ActivatedRoute, Router } from '@angular/router';
import { questionDetail } from '../models/questionDetail';
import { Subscription } from 'rxjs';
import { TimerService } from '../services/time.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from '../error-dialog/error-dialog.component';
import { answer, answerDetailList } from '../models/answer';

@Component({
  selector: 'app-questions-detail',
  templateUrl: './questions-detail.component.html',
  styleUrl: './questions-detail.component.css'
})
export class QuestionsDetailComponent {
  questionCategoryId!: string;
  public questionDetail!: questionDetail;
  time: string = '00:00';
  timerSubscription!: Subscription;
  multi: string[] = [];
  answer = {} as answer;
  isShowTimeup: boolean = false;
  totalScore: number | undefined;

  constructor(private questionService: QuestionService,
    private timerService: TimerService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    public dialog: MatDialog,
    private router: Router) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.questionCategoryId = params.get('id')!;
      this.loadItemDetails(this.questionCategoryId);
    });


  }


  loadItemDetails(id: string) {
    this.questionService.getCategoryDetail(id).subscribe(rs => {
      if (rs !== null) {
        if (rs.data !== null) {
          this.questionDetail = rs.data;
          this.getPaging(0);
          this.startTimer(this.questionDetail.timeLimitOfMinuteUnit);
          this.questionInfo = this.questionDetail.questionInfo[0]
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
  startTimer(limit: number) {
    this.timerSubscription = this.timerService.startCountdown(limit).subscribe(time => {
      this.time = time;
    });
    this.timerService.onLimitReached().subscribe(() => {
      this.showErrorPopup();
    });
  }

  showErrorPopup() {
    const dialogRef = this.dialog.open(ErrorDialogComponent, {
      data: { message: 'Time up!!!' },
    });

    dialogRef.afterClosed().subscribe(result => {
      this.submit();
    });

  }

  ngOnDestroy(): void {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
    this.resetTime(); // รีเซ็ตเวลาเมื่อออกจากหน้า
  }
  resetTime() {
    this.time = '00:00:00';
  }

  questionInfo: any = {};

  getPaging(n: number) {
    this.questionInfo = this.questionDetail.questionInfo[n]
    //this.startTimer(this.questionDetail.timeLimitOfMinuteUnit);
  }

  selectedItems: answerDetailList[] = [];
  lastQuestionId: string = "";
  req!: answer;
  onCheckboxChange(event: any, item: any) {
    const questionIndex = this.selectedItems.findIndex((q) => q.questionId === event.target.name);
    if (event.target.checked) {
      if (questionIndex === -1) {
        // ถ้า questionId ไม่อยู่ใน selectedItems ให้เพิ่มใหม่
        this.selectedItems.push({ questionId: event.target.name, answers: [{ questionAnswerId: item.questionAnswerId }] });
      } else {
        // ถ้า questionId อยู่แล้ว ให้เพิ่ม questionAnswerId ใน answers
        this.selectedItems[questionIndex].answers.push({ questionAnswerId: item.questionAnswerId });
        this.lastQuestionId = this.selectedItems[questionIndex].questionId;
      }


    } else {
      if (questionIndex > -1) {
        // ลบ questionAnswerId ออกจาก answers
        const answerIndex = this.selectedItems[questionIndex].answers.findIndex((a) => a.questionAnswerId === item.questionAnswerId);
        if (answerIndex > -1) {
          this.selectedItems[questionIndex].answers.splice(answerIndex, 1);
        }
        // ถ้า answers ว่างเปล่าให้ลบ questionId ออกจาก selectedItems
        if (this.selectedItems[questionIndex].answers.length === 0) {
          this.selectedItems.splice(questionIndex, 1);
        }
      }
    }


    console.log("request", this.req)
  }
  isChecked(questionAnswerId: string): boolean {
    const questionId = this.questionDetail.questionCategoryId;
    const questionIndex = this.selectedItems.findIndex((q) => q.questionId === questionId);
    if (questionIndex > -1) {
      return this.selectedItems[questionIndex].answers.some(a => a.questionAnswerId === questionAnswerId);
    }
    return false;
  }
  next(n: number) {
    this.questionInfo = this.questionDetail.questionInfo[n];
  }
  back(n: number) {
    // Logic to go to previous question
    const questionId = this.questionDetail.questionCategoryId;
    const questionIndex = this.selectedItems.findIndex((q) => q.questionId === questionId);
    if (n > 0) {
      this.questionInfo = this.questionDetail.questionInfo[(n - 1)];
      if (this.questionDetail.questionInfo && this.questionDetail.questionInfo.length > 0) {
        const currentQuestionId = this.questionDetail.questionInfo[n - 1].questionId;
        // ลบข้อมูลของคำถามปัจจุบัน
        this.selectedItems = this.selectedItems.filter(item => item.questionId !== currentQuestionId);
      }
    }
  }
  submit() {
    // console.log('req:', this.req);
    // ตรวจสอบข้อมูลก่อนส่ง
    const allQuestions = this.questionDetail.questionInfo;
    const preparedItems: answerDetailList[] = allQuestions.map(question => {
      const foundItem = this.selectedItems.find(item => item.questionId === question.questionId);
      return {
        questionId: question.questionId,
        answers: foundItem ? foundItem.answers : []
      };
    });

    this.req = {
      questionCategoryId: this.questionDetail.questionCategoryId,
      questions: preparedItems

    };

    this.questionService.submitAssignment(this.req).subscribe(
      rs => {
        if (rs !== null) {
          if (rs.data !== null) {
            this.totalScore = rs.data.score;
          } else {
            console.log('Error');
            this.router.navigate(['/login']); // เปลี่ยนเส้นทางไปยัง /login
          }
        } else {
          console.log('Error');
          this.router.navigate(['/login']); // เปลี่ยนเส้นทางไปยัง /login
        }
      },
      error => {
        console.log('API call failed', error);
        this.router.navigate(['/login']); // เปลี่ยนเส้นทางไปยัง /login เมื่อเกิดข้อผิดพลาด
      }
    );
    this.isShowTimeup = true;
  }
  hasAnswerSelected(n: number): boolean {
    const questionId = this.questionInfo.questionId;
    const questionIndex = this.selectedItems.findIndex((q) => q.questionId === questionId);
    return questionIndex > -1 && this.selectedItems[questionIndex].answers.length > 0;
  }
  ok() {
    this.router.navigate(['questionnaire/question-list']);
  }
}
