import { Injectable } from '@angular/core';
import { Observable, interval, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TimerService {
  private limitReached$ = new Subject<void>();

  startCountdown(limitInMinutes: number): Observable<string> {
    const limitInSeconds = limitInMinutes * 60; // แปลงนาทีเป็นวินาที
    return interval(1000).pipe(
      map(elapsedSeconds => {
        const remainingSeconds = limitInSeconds - elapsedSeconds;
        if (remainingSeconds <= 0) {
          this.limitReached$.next();
          this.limitReached$.complete();
        }
        return this.formatTime(remainingSeconds);
      }),
      takeUntil(this.limitReached$)
    );
  }

  onLimitReached(): Observable<void> {
    return this.limitReached$.asObservable();
  }

  private formatTime(seconds: number): string {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${this.pad(hours)}:${this.pad(minutes)}:${this.pad(secs)}`;
  }

  private pad(num: number): string {
    return num < 10 ? '0' + num : num.toString();
  }
}
