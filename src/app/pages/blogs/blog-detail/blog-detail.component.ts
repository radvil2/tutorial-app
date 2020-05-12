import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { environment as env } from '../../../../environments/environment';
import { Subscription } from 'rxjs';

import { BlogService, IBlog } from '../../../core';

@Component({
  selector: 'rad-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.scss'],
})
export class BlogDetailComponent implements OnInit, OnDestroy {
  param: string;
  blog: IBlog;
  featureImage: string;
  formatedDate: string;
  private subs: Subscription = new Subscription();

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private blogSrv: BlogService
  ) {
    // this.param = this.activatedRoute.snapshot.params.id;
    this.param = '5e9c3198001286106830eea8';
  }

  ngOnInit() {
    this.subs.add(this.loadBlogOnInit())
    console.log('[BLOG-DETAIL] [OnInit] Subscribe blog');
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
    console.log('[BLOG-DETAIL] [OnDestroy] Unsubscribe blog');
  }

  loadBlogOnInit() {
    this.blogSrv.getBlog(this.param).subscribe((res: any) => {
      this.blog = res['doc'];
      this.formatedDate = this.blog.createdAt;
      this.featureImage = env.imageUrl + 'blogs/' + this.blog.featureImage;
      console.log(this.blog);
    });
  }

  seeAuthorProfile() {
     // this should be a public profile later with url '/username';
    this.router.navigate([`/profile`]);
  }
}
