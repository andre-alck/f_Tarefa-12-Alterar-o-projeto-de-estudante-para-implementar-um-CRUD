import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { NgbAlert } from '@ng-bootstrap/ng-bootstrap';
import { debounceTime } from 'rxjs';
import { Student } from 'src/app/shared/models/student.model';

import { Alerta } from './../shared/models/alerta.model';
import { Teacher } from './../shared/models/teacher.model';
import { MessageService } from './../shared/services/message.service';
import { StudentService } from './../shared/services/student.service';
import { TeacherService } from './../shared/services/teacher.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  student!: Student;
  teacher!: Teacher;
  disabledInput: boolean = true;

  profile: string = '';
  tipo: string = '';
  voltar: string = '';
  
  @Output() saveEvent = new EventEmitter<string>();
  @ViewChild('selfClosingAlert', { static: false }) selfClosingAlert!: NgbAlert;
  alerta: Alerta = {} as Alerta;

  constructor(
    private route: ActivatedRoute,
    private studentService: StudentService,
    private teacherService: TeacherService,
    private messageService: MessageService) { }

  ngOnInit(): void {
    this.route.params.subscribe({
      next: (params: Params) => {
        params['tipo'] === 'student' ? this.getStudentById(params['id']) : this.getTeacherById(params['id']);
        params['edit'] === 'true' ? this.disabledInput = false : this.disabledInput = true;
      }
    });

    this.messageService._success.subscribe(alerta => this.alerta = alerta);
    this.messageService._success.pipe(debounceTime(5000)).subscribe(() => {
      if (this.selfClosingAlert) {
        this.selfClosingAlert.close();
      }
    });
  }

  getStudentById(id: number): void {
    this.studentService.getStudentById(id).subscribe({
      next: (student: Student) => {
        this.student = student;
        this.profile = student.sexo;
        this.tipo = 'Student';
        this.voltar = '/students'
      }
    });
  }

  getTeacherById(id: number): void {
    this.teacherService.getTeacherById(id).subscribe({
      next: (teacher: Teacher) => {
        this.teacher = teacher;
        this.profile = teacher.sexo;
        this.tipo = 'Teacher';
        this.voltar = '/teachers';
      }
    });
  }

  save(tipo: string): void {
    if (tipo === 'student') {
      this.studentService.put(this.student).subscribe({
        next: response => console.log(response)
      });
    } else {
      this.teacherService.put(this.teacher).subscribe({
        next: response => console.log(response)
      });
    }
  }

  edit(): void {
    this.disabledInput = false;
  }

  remove(tipo: string): void {
    if (tipo === 'student') {
      this.studentService.delete(this.student.id).subscribe({
        next: response => console.log(response)
      });
    } else {
      this.teacherService.delete(this.teacher.id).subscribe({
        next: response => console.log(response)
      });
    }
  }

}
