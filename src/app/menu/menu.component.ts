import { Component, OnInit } from '@angular/core';
import { MatIconRegistry} from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(
    iconregistry: MatIconRegistry,
    sanitizer: DomSanitizer

  ) {
    iconregistry.addSvgIcon('app', sanitizer.bypassSecurityTrustResourceUrl('../../assets/ic_today_48px.svg'));
    iconregistry.addSvgIcon('menu', sanitizer.bypassSecurityTrustResourceUrl('../../assets/ic_menu_48px.svg'));

  }

  ngOnInit() {
  }

}
