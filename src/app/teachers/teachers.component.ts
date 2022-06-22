import { debounceTime } from 'rxjs';
import { MessageService } from './../shared/services/message.service';
import { NgbAlert } from '@ng-bootstrap/ng-bootstrap';
import { Alerta } from './../shared/models/alerta.model';
import { DetailsComponent } from './../details/details.component';
import { Component, OnInit, ViewChild } from '@angular/core';

import { Teacher } from './../shared/models/teacher.model';
import { TeacherService } from './../shared/services/teacher.service';

@Component({
  selector: 'app-teachers',
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.css']
})
export class TeachersComponent implements OnInit {

  @ViewChild('studentDetail') details!: DetailsComponent;
  selectedTeacher!: Teacher;
  teachers: Teacher[] = [];

  @ViewChild('selfClosingAlert', { static: false }) selfClosingAlert!: NgbAlert;
  alerta: Alerta = {} as Alerta;

  constructor(
    private teacherService: TeacherService,
    private messageService: MessageService) { }

  ngOnInit(): void {
    this.getTeachers();

    this.messageService._success.subscribe(alerta => this.alerta = alerta);
    this.messageService._success.pipe(debounceTime(5000)).subscribe(() => {
      if (this.selfClosingAlert) {
        this.selfClosingAlert.close();
      }
    });
  }

  getTeachers(): void {
    this.teacherService.getTeachers().subscribe({
      next: (teachers: Teacher[]) => this.teachers = teachers
    });
  }

  removeTeacher(teacher: Teacher): void {
    for (let i = 0; i <= this.teachers.length; i++) {
      if (this.teachers[i]?.id == teacher.id) this.teachers.splice(i, 1);
    }
    this.messageService.changeSuccessMessage(`${teacher.nome} removido(a)!`, 'danger');
  }

}
