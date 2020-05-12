import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserComponent } from './container/user.component';
import { UserInfoComponent } from './user_info/user_info.component';

const routes: Routes = [
  {
    path: '',
    component: UserComponent,
    children: [
      {
        path: '',
        redirectTo: 'info'
      },
      {
        path: 'info',
        component: UserInfoComponent,
        data: {title: 'User info'}
      }
    ]
  },
  {
    path: 'edit/:userId',
    loadChildren: () =>
      import('./user_edit/user_edit.module').then((m) => m.UserEditModule),
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRouting {}

export const USER_PAGES = [UserComponent, UserInfoComponent];
