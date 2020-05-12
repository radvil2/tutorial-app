import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';
import { BlogsRouting, BLOGS_PAGES } from './blogs.routing';

@NgModule({
  declarations: [...BLOGS_PAGES],
  imports: [SharedModule, BlogsRouting],
})

export class BlogsModule {}