import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskCardComponent } from '../../components/task/task-card/task-card.component';
import { combineLatest, map, Observable, startWith } from 'rxjs';
import { Task } from 'src/app/core/models/task';
import { FormControl } from '@angular/forms';
import { TaskService } from 'src/app/core/services/task.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  standalone: true,
  imports: [CommonModule, TaskCardComponent]
})
export class DashboardComponent implements OnInit {
  tasks$!: Observable<Task[]>;
  searchControl = new FormControl('');

  isModalOpen = false;
  modalTitle = '';
  editingTask?: Task;
  isDeleteModalOpen = false;
  taskToDelete?: Task;

  constructor(private taskService: TaskService) { }

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
    this.modalTitle = 'Add New Task';
    this.editingTask = undefined; // Ensure simple undefined check works in template or child
    this.isModalOpen = true;
  }

  openEditTask(task: Task): void {
    this.modalTitle = 'Edit Task';
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
