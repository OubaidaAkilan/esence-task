import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Task } from '../models/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private tasksSubject = new BehaviorSubject<Task[]>([
    {
      id: '1',
      title: 'جميع الوزارات',
      description: 'الوزارات المراد تعديلها',
    },
    {
      id: '2',
      title: 'وزارات الهيئات',
      description: 'الوزارات المراد تعديلها',
    },
    {
      id: '3',
      title: 'جميع الامانات',
      description: 'الامانات المراد تعديلها',
    }
  ]);

  tasks$ = this.tasksSubject.asObservable();

  constructor() { }

  getTasks(): Observable<Task[]> {
    return this.tasks$;
  }

  addTask(task: Task): void {
    const currentTasks = this.tasksSubject.value;
    this.tasksSubject.next([...currentTasks, task]);
  }

  updateTask(updatedTask: Task): void {
    const currentTasks = this.tasksSubject.value;
    const index = currentTasks.findIndex(t => t.id === updatedTask.id);
    if (index !== -1) {
      const updatedTasks = [...currentTasks];
      updatedTasks[index] = updatedTask;
      this.tasksSubject.next(updatedTasks);
    }
  }

  deleteTask(taskId: string): void {
    const currentTasks = this.tasksSubject.value;
    this.tasksSubject.next(currentTasks.filter(t => t.id !== taskId));
  }
}
