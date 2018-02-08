import { Component, OnInit } from '@angular/core';
import { Todo } from '../todo';
import { TodoService } from '../todo.service';
import {MessageService} from '../message.service';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.css']
})
export class TodoFormComponent implements OnInit {
  constructor(
    private todoService: TodoService,
    private messageService: MessageService,
    public snackBar: MatSnackBar
  ) {}
  public todo: Todo = new Todo();

  openSnackBar(todo: Todo) {
    if (todo != null && this.messageService.lastString != null) {
      this.snackBar.open(todo.action, this.messageService.lastString, {
        duration: 2000
      });
    }
  }

  submitTodo() {
    const tmpTodo = Object.assign({}, this.todo);
    tmpTodo.dueDate = new Date(tmpTodo.dueDate).getDate();
    this.todo = new Todo();
    this.todoService
      .addTodos(tmpTodo)
      .subscribe(_ => this.messageService.AddToBusSring('refresh'));
  }

  ngOnInit() {
    this.messageService.busTodo$.subscribe(todo => {
      this.todo = todo;
    });
  }
}
