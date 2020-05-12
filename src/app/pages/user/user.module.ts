import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';
import { UserRouting, USER_PAGES } from './user.routing';

@NgModule({
  declarations: [...USER_PAGES],
  imports: [SharedModule, UserRouting],
})
export class UserModule {}
