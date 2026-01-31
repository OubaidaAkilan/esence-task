import { CommonModule, TitleCasePipe } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from 'src/app/core/models/task';

@Component({
  selector: 'app-task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.scss'],
  standalone:true,
  imports: [CommonModule, TitleCasePipe],
})
export class TaskCardComponent {
  @Input({ required: true }) task!: Task;
  @Output() edit = new EventEmitter<Task>();
  @Output() delete = new EventEmitter<Task>();


  onEditTask() {
    this.edit.emit(this.task);
  }

  onDeleteTask() {
    this.delete.emit(this.task);
  }

}
