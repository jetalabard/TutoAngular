import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoListComponent } from './todo-list/todo-list.component';
import { TodoFormComponent } from './todo-form/todo-form.component';
import { HttpClientModule } from '@angular/common/http';
import {TodoService} from './todo.service';
import {FormsModule} from '@angular/forms';
import {MessageService} from './message.service';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {MatButtonModule, MatCheckboxModule, MatTableModule, MatFormFieldModule,
   MatCardModule, MatInputModule, MatDatepickerModule, MatNativeDateModule, MatIconModule,
    MatSnackBarModule, MatTooltipModule, MatPaginatorModule} from '@angular/material';


@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    MatButtonModule, MatTableModule, MatCheckboxModule,
    MatFormFieldModule, MatCardModule, MatInputModule, MatDatepickerModule, MatIconModule, MatSnackBarModule,
    MatNativeDateModule, BrowserAnimationsModule, FormsModule, MatTooltipModule, MatPaginatorModule
  ],
  exports: [
    TodoListComponent, TodoFormComponent,
  ],
  declarations: [TodoListComponent, TodoFormComponent],
  providers: [TodoService, MessageService],
})
export class TodoModule { }
