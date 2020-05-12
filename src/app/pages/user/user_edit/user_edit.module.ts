import { NgModule } from '@angular/core';

import { SharedModule } from '../../../shared';
import { UserEditRouting, USER_EDIT_PAGES } from './user_edit.routing';

@NgModule({
  declarations: [...USER_EDIT_PAGES],
  imports: [SharedModule, UserEditRouting],
})
export class UserEditModule {}
