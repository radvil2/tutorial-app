import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'rad-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.scss']
})

export class BlogListComponent implements OnInit {

  constuctor() {}

  ngOnInit() {
    console.log(`BlogListComponent is fired ...`)
  }
}