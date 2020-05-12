import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BlogListComponent } from './blog-list/blog-list.component';
import { BlogDetailComponent } from './blog-detail/blog-detail.component';

const blogsRoutes: Routes = [
  {
    path: '',
    redirectTo: 'detail',
    pathMatch: 'full'
  },
  {
    path: 'list',
    component: BlogListComponent,
    data: { title: 'Blogs List'}
  },
  {
    path: 'detail',
    component: BlogDetailComponent,
    data: { title: 'Blog Detail'}
  }
]

@NgModule({
  imports: [RouterModule.forChild(blogsRoutes)],
  exports: [RouterModule]
})

export class BlogsRouting {}

export const BLOGS_PAGES = [
  BlogListComponent,
  BlogDetailComponent
];