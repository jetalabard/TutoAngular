import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { of } from 'rxjs/observable/of';

import {
   debounceTime, distinctUntilChanged, switchMap
 } from 'rxjs/operators';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: [ './hero-search.component.css' ]
})
export class HeroSearchComponent implements OnInit {
  heroes$: Observable<Hero[]>;
  private searchTerms = new Subject<string>();

  constructor(private heroService: HeroService) {}

  // Push a search term into the observable stream.
  // à chaque next on fait la requete http pour le récupérer --> on pousse les données de l'input pour filtrer
  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    // on observe le searchTerms
    // toutes les 300 ms on fait la requete pour ne pas saturer le serveur
    // on ne s'abonne pas à la valeur de l'input mais aux résultats d'où l'utiliter de faire le switch
    // c'est à dire que l'observable courant contient l'input à observer donc on doit rendre un observable sur le nouveau résultat
    // heroes$ $ convention
    this.heroes$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      // renvoit un nouvel observable
      // operator
      switchMap((term: string) => this.heroService.searchHeroes(term)),
    );
  }
}
