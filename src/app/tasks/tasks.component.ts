import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Task } from '../models/task';
import { ProjectsService } from '../projects.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  listTasks: Task[] = [];
  nbTasks!: number;

  constructor(private router: Router, private pS: ProjectsService) {}

  ngOnInit(): void {
    this.pS.getTasks().subscribe({
      next: (data) => {
        this.listTasks = data as Task[];
        this.calculTasks();
      },
      error: (error) => {
        console.error('Error fetching tasks:', error);
        // Handle error appropriately
      }
    });
  }

  calculTasks() {
    this.nbTasks = this.listTasks.filter((t) => t.status === 'Done').length;
  }

  updateTask(task: Task) {
    // Navigate to the update task page with the task ID
    this.router.navigate(['/updateTask', task.id]);
  }

  deleteTask(task: Task) {
    this.pS.deleteTask(task.id).subscribe({
      next: () => {
        this.listTasks = this.listTasks.filter((t) => t.id !== task.id);
        this.calculTasks();
      },
      error: (error) => {
        console.error('Error deleting task:', error);
        // Handle error appropriately
      }
    });
  }
}
