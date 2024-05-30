import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StorageService } from './storage.service';
import { answer, scoreData } from '../models/answer';
import { IResponseMessage } from '../interface/response-message';

const API_PATH = "https://training-homework.calllab.net";

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private http: HttpClient, private storage: StorageService) { }

  getCategories(): Observable<any> {
    const token = this.storage.getToken();
    const headers = new HttpHeaders({ "Content-Type": "application/json", 'Authorization': 'Bearer ' + token });
    return this.http.get<any>(API_PATH + '/v1/questions/categories', { headers });
  }

  getCategoryDetail(id: string): Observable<any> {
    const token = this.storage.getToken();
    const headers = new HttpHeaders({ "Content-Type": "application/json", 'Authorization': 'Bearer ' + token });
    return this.http.get<any>(API_PATH + '/v1/questions/categories/' + id, { headers });
  }

  submitAssignment(rq: answer): Observable<IResponseMessage<any>> {
    const token = this.storage.getToken();
    const headers = new HttpHeaders({ "Content-Type": "application/json", 'Authorization': 'Bearer ' + token });
    return this.http.post<IResponseMessage<any>>(API_PATH + '/v1/questions/submit-assignment', rq, { headers });
  }
}
