import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'rad-user_info',
  templateUrl: './user_info.component.html',
  styleUrls: ['./user_info.component.scss'],
})
export class UserInfoComponent implements OnInit, OnDestroy {
  constructor() {}

  ngOnInit() {
    console.log('[USER_INFO] [OnInit] __');
  }

  ngOnDestroy() {
    console.log('[USER_INFO] [OnDestroy] __');
  }
}
