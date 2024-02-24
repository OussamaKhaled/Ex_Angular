import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Task } from './models/task';

@Injectable({
  providedIn: 'root',
})
export class ProjectsService {
  constructor(private http: HttpClient) {}

  getProjects() {
    return this.http.get('http://localhost:3000/projects');
  }

  getProjectByID(id: number) {
    return this.http.get('http://localhost:3000/projects/' + id);
  }

  getTasks() {
    return this.http.get('http://localhost:3000/tasks');
  }

  addTask(task: Task) {
    return this.http.post('http://localhost:3000/tasks', task);
  }

  getTaskByID(id: number) {
    return this.http.get('http://localhost:3000/tasks/' + id);
  }

  updateTask(task: Task) {
    return this.http.put('http://localhost:3000/tasks/' + task.id, task);
  }

  deleteTask(id: number) {
    return this.http.delete('http://localhost:3000/tasks/' + id);
  }
}
