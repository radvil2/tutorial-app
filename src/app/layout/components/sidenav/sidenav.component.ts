import { Component, OnInit } from '@angular/core';
import { sideMenu, sideMenu2 } from '../../menu-items';

@Component({
  selector: 'rad-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['sidenav.component.scss'],
})
export class SidenavComponent implements OnInit {
  menuItems = sideMenu;
  menuItems2 = sideMenu2;

  constructor() {}

  ngOnInit() {}
}
