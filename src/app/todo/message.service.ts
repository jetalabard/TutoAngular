import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Todo } from './todo';

@Injectable()
export class MessageService {
  constructor() {}

  // Observable string sources
  private busString = new Subject<string>();
  public lastString;
  private busTodo = new Subject<Todo>();

  // Observable string streams
  bus$ = this.busString.asObservable();
  busTodo$ = this.busTodo.asObservable();

  // Service message commands
  AddToBusSring(todoSubmit: string) {
    this.lastString = todoSubmit;
    this.busString.next(todoSubmit);
  }

  // Service message commands
  AddToBusTodo(todoSubmit: Todo) {
    this.busTodo.next(todoSubmit);
  }
}
