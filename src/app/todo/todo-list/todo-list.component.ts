import { Component, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Todo } from '../todo';
import { TodoService } from '../todo.service';
import { MatPaginator, MatSort, MatTableDataSource, MatIconRegistry } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { MessageService } from '../message.service';

import { switchMap, merge } from 'rxjs/operators';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
  displayedColumns = ['id', 'action', 'dueDate', 'done', 'actions'];
  dataSource = new MatTableDataSource();
  public todoUpdate: Todo = null;
  public dateCurrentTodo: Date;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  applyFilter(filterValue:   string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

 /**
   * Set the paginator after the view init since this component will
   * be able to query its view for the initialized paginator.
   */
  // tslint:disable-next-line:use-life-cycle-interface
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  constructor(
    private todoService: TodoService,
    private messageService: MessageService,
    iconregistry: MatIconRegistry,
    sanitizer: DomSanitizer

  ) {
    iconregistry.addSvgIcon('delete', sanitizer.bypassSecurityTrustResourceUrl('../../../assets/ic_delete_48px.svg'));
    iconregistry.addSvgIcon('validate', sanitizer.bypassSecurityTrustResourceUrl('../../../assets/ic_done_48px.svg'));
    iconregistry.addSvgIcon('update', sanitizer.bypassSecurityTrustResourceUrl('../../../assets/ic_update_48px.svg'));
    iconregistry.addSvgIcon('updateV2', sanitizer.bypassSecurityTrustResourceUrl('../../../assets/ic_create_48px.svg'));

  }

  ngOnInit() {

    const obs1 = this.todoService.getTodos();
    const obs2 = this.messageService.bus$;

    // obs =  résultat de la fusion des deux flux si l'un n'est pas activé l'autre à les résultats quand meme
    // si les deux veulent les résultat, on ne fait la requete qu'une fois
    const  obs = obs1.pipe(merge(obs2));
    obs.pipe(switchMap(result => {
      if (typeof result === 'string') {
        // message venant du service de message
        console.log(result);
      }
      // dans les deux cas on retourne la liste
      return this.todoService.getTodos();
    }))
    .subscribe(todos => this.dataSource.data = todos);
  }


  /*supprime un todo de la liste */
  delete(todo: Todo) {
    this.todoService
      .deleteTodos(todo)
      .pipe(switchMap(_ => this.todoService.getTodos()))
      .subscribe(todos => (this.dataSource.data = todos));
  }

  /*supprime un todo de la liste */
  updateDone(todo: Todo) {
    todo.done = !todo.done;
    this.updateGeneric(todo);
  }

  selectedToUpdate(todo: Todo) {
    this.todoUpdate = todo;
    this.dateCurrentTodo = new Date(todo.dueDate * 1000);
  }

  /*valide la modification d'un todo de la liste */
  update(todo: Todo) {
    this.todoUpdate = null;
    todo.dueDate = this.dateCurrentTodo.getTime() / 1000;
    this.updateGeneric(todo);
  }

  UpdateWithForm(todo: Todo) {
    // copier toutes les propriétes = clone
    const tmpTodo = Object.assign({}, todo);
    this.messageService.AddToBusTodo(tmpTodo);
  }

/*update le todo et renvoit le resultat */
private updateGeneric(todo: Todo) {
  this.todoService
  .updateTodo(todo)
  .pipe(switchMap(_ => this.todoService.getTodos()))
  .subscribe(todos => (this.dataSource.data = todos));
}


}
