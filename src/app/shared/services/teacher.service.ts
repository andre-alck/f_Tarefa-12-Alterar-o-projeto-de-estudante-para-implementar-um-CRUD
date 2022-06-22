import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from './../../../environments/environment';
import { Teacher } from './../models/teacher.model';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {

  teacherUrl = environment.baseUrl + '/teachers';

  constructor(private httpClient: HttpClient) { }

  getTeachers(): Observable<Teacher[]> {
    return this.httpClient.get<Teacher[]>(this.teacherUrl);
  }

  getTeacherById(id: number): Observable<Teacher> {
    return this.httpClient.get<Teacher>(this.teacherUrl + `/${id}`);
  }

  put(teacher: Teacher): Observable<any> {
    return this.httpClient.put(this.teacherUrl + `/${teacher.id}`, teacher);
  }

  delete(teacherId: number): Observable<any> {
    return this.httpClient.delete(this.teacherUrl + `/${teacherId}`);
  }

}
