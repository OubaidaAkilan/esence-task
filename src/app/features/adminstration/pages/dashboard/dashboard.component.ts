import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskCardComponent } from '../../components/task/task-card/task-card.component';
import { combineLatest, map, Observable, startWith } from 'rxjs';
import { Task } from 'src/app/core/models/task';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { TaskService } from 'src/app/core/services/task.service';
import { ModalComponent } from 'src/app/shared/components/modal/modal.component';
import { DeleteConfirmationComponent } from 'src/app/shared/components/delete-confirmation/delete-confirmation.component';
import { TaskFormComponent } from '../../components/task/task-form/task-form.component';
import { EmptyStateComponent } from 'src/app/shared/components/empty-state/empty-state.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TaskCardComponent, ModalComponent, DeleteConfirmationComponent, TaskFormComponent, EmptyStateComponent]
})
export class DashboardComponent implements OnInit {
  tasks$!: Observable<Task[]>;
  searchControl = new FormControl('');

  isModalOpen = false;
  modalTitle = '';
  editingTask?: Task;
  isDeleteModalOpen = false;
  taskToDelete?: Task;

  constructor(private readonly taskService: TaskService) { }

  ngOnInit() {
    const allTasks$ = this.taskService.getTasks();
    const search$ = this.searchControl.valueChanges.pipe(startWith(''));

    this.tasks$ = combineLatest([allTasks$, search$]).pipe(
      map(([tasks, searchQuery]) => {
        const query = (searchQuery as string || '').toLowerCase();
        return tasks.filter(task => task.title.toLowerCase().includes(query));
      })
    );
  }

  openAddTask(): void {
    this.modalTitle = 'اضافه الاسم'; 
    this.editingTask = undefined; // Ensure simple undefined check works in template or child
    this.isModalOpen = true;
  }

  openEditTask(task: Task): void {
    this.modalTitle = 'تعديل الاسم';
    // Clone task to avoid mutation issues before save
    this.editingTask = { ...task };
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
    this.editingTask = undefined;
  }

  onSaveTask(taskData: Omit<Task, 'id'>): void {
    if (this.editingTask) {
      // Update
      const updatedTask: Task = { ...taskData, id: this.editingTask.id };
      this.taskService.updateTask(updatedTask);
    } else {
      // Create
      const newTask: Task = { ...taskData, id: crypto.randomUUID() };
      this.taskService.addTask(newTask);
    }
    this.closeModal();
  }


  deleteTask(task: Task): void {
    this.taskToDelete = task;
    this.isDeleteModalOpen = true;
  }

  confirmDelete(): void {
    if (this.taskToDelete) {
      this.taskService.deleteTask(this.taskToDelete.id);
    }
    this.closeDeleteModal();
  }

  closeDeleteModal(): void {
    this.isDeleteModalOpen = false;
    this.taskToDelete = undefined;
  }

  trackByTaskId(_index: number, task: Task): string {
    return task.id;
  }
}
