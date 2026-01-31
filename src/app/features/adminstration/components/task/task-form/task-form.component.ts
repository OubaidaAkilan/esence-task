import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Task } from '../../../../../core/models/task';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss']
})
export class TaskFormComponent implements OnInit {
  @Input() task?: Task;
  @Output() save = new EventEmitter<Omit<Task, 'id'>>();
  @Output() cancel = new EventEmitter<void>();

  taskForm!: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.taskForm = this.fb.group({
      title: [this.task?.title || '', [Validators.required]],
      description: [this.task?.description || '', [Validators.required]],
    });
  }

  onSubmit(): void {
    if (this.taskForm.valid) {
      const formValue = this.taskForm.value;
      const taskData = {
        ...formValue,
      };
      this.save.emit(taskData);
    }
  }

  onCancel(): void {
    this.cancel.emit();
  }
}
