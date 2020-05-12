import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { environment as env } from '../../../../environments/environment';
import { Subscription } from 'rxjs';

import { UserService, IUser } from '../../../core';

@Component({
  selector: 'rad-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit, OnDestroy {
  param: string;
  user: IUser;
  userAvatar: string;
  userCoverPhoto: string;
  private subs: Subscription = new Subscription();

  navLinks = [
    { path: 'timeline', label: 'Timeline' },
    { path: 'blogs', label: 'Blogs' },
    { path: 'info', label: 'About' },
    { path: 'albums', label: 'Albums' },
  ];

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private userSrv: UserService
  ) {
    // this.param = this.activatedRoute.snapshot.params.id;
    this.param = '5e9c43c3715b1f19f4e9eeeb'; // Nina Vic.
  }

  ngOnInit() {
    this.subs.add(this.loadUser());
    console.log('[PROFILE] [OnInit] Subscribe user___');
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
    console.log('[PROFILE] [OnDestroy] UnSubsribe user___');
  }

  loadUser() {
    this.userSrv.getUser(this.param).subscribe((res: any) => {
      this.user = res['doc'];
      this.userAvatar = env.imageUrl + 'users/' + this.user?.avatar;
      this.userCoverPhoto = env.imageUrl + 'covers/' + this.user?.coverPhoto;
      console.log(this.user);
    });
  }

  editProfile() {
    this.router.navigate([`profile/edit/${this.user?._id}`]);
  }
}
