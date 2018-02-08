import { Injectable } from '@angular/core';
import { Todo } from './todo';
import { Observable } from 'rxjs/observable';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'my-auth-token'
  })
};

@Injectable()
export class TodoService {
  constructor(private http: HttpClient) {}

  // redirection de /api vers le serveur rest 192.168.99.100:2403
  // avec proxy.conf.json
  getTodos(): Observable<Todo[]> {
    const url = `${environment.url_todos}/todos`;
    return this.http.get<Todo[]>(url);
  }

  getTodo(id: number): Observable<Todo[]> {
    const url = `${environment.url_todos}/todos/${id}`;
    return this.http.get<Todo[]>(url);
  }

  addTodos(todo: Todo): Observable<Todo> {
    const url = `${environment.url_todos}/todos`;
    return this.http.post<Todo>(url, todo, httpOptions);
  }

  deleteTodos(todo: Todo): Observable<any> {
    const url = `${environment.url_todos}/todos/${todo.id}`;
    return this.http.delete(url);
  }

  updateTodo(todo: Todo): Observable<any> {
    const url = `${environment.url_todos}/todos/${todo.id}`;
    return this.http.put(url, todo, httpOptions);
  }
}
