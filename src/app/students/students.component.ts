import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbAlert } from '@ng-bootstrap/ng-bootstrap';
import { debounceTime } from 'rxjs';

import { Student } from '../shared/models/student.model';
import { StudentService } from '../shared/services/student.service';
import { DetailsComponent } from './../details/details.component';
import { Alerta } from './../shared/models/alerta.model';
import { MessageService } from './../shared/services/message.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {

  @ViewChild('studentDetail') details!: DetailsComponent;
  selectedStudent!: Student;
  students: Student[] = [];

  @ViewChild('selfClosingAlert', { static: false }) selfClosingAlert!: NgbAlert;
  alerta: Alerta = {} as Alerta;

  constructor(
    private studentService: StudentService,
    private messageService: MessageService) { }

  ngOnInit(): void {
    this.getStudents();

    this.messageService._success.subscribe(alerta => this.alerta = alerta);
    this.messageService._success.pipe(debounceTime(5000)).subscribe(() => {
      if (this.selfClosingAlert) {
        this.selfClosingAlert.close();
      }
    });
  }

  getStudents(): void {
    this.studentService.getStudents().subscribe({
      next: (students: Student[]) => this.students = students
    });
  }

  removeStudent(student: Student): void {
    for (let i = 0; i <= this.students.length; i++) {
      if (this.students[i]?.id == student.id) {
        this.students.splice(i, 1);
      }
    }
    this.messageService.changeSuccessMessage(`${student.nome} removido(a)!`, 'danger');
  }

}
