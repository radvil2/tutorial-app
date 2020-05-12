import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { UserService, IUser } from '../../../core';

@Component({
  selector: 'rad-user_edit',
  templateUrl: 'user_edit.component.html',
  styleUrls: ['user_edit.component.scss'],
})
export class UserEditComponent implements OnInit, OnDestroy {
  idParam: string;
  user: IUser;
  private subs: Subscription = new Subscription();

  constructor(
    private activatedRoute: ActivatedRoute,
    private userSrv: UserService
  ) {
    this.idParam = this.activatedRoute.snapshot.params.userId;
  }

  ngOnInit() {
    this.subs.add(this.loadUserOnInit());
    console.log('[EDIT-PROFILE] [OnInit] Subscribe user___');
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
    console.log('[EDIT-PROFILE] [OnDestroy] UnSubsribe user___');
  }

  loadUserOnInit() {
    this.userSrv.getUser(this.idParam).subscribe((res) => {
      this.user = res['doc'];
    });
  }
}
