import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Student } from 'src/app/shared/models/student.model';

@Component({
  selector: 'app-student-detail',
  templateUrl: './student-detail.component.html',
  styleUrls: ['./student-detail.component.css']
})
export class StudentDetailComponent implements OnInit {

  @Input() student?: Student;
  @Input() disabledInput!: boolean;

  @Output() saveEvent = new EventEmitter<string>();

  constructor() { }
  
  ngOnInit(): void {
  }

  save(): void {    
    this.saveEvent.emit('Foi salvo!');
  }

}
