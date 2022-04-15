import { Component, OnInit } from '@angular/core';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  Router,
} from '@angular/router';
import { Subscription } from 'rxjs';
import BlogModel from 'src/app/shared/models/blog.model';
import { BlogService } from 'src/app/shared/services/blog/blog.service';
import { CommonService } from 'src/app/shared/services/common/common.service';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.css'],
})
export class BlogsComponent implements OnInit {
  constructor(
    private blogService: BlogService,
    private route: ActivatedRoute,
    private commonService: CommonService
  ) {}

  blogs: BlogModel[] = [];

  routeSub!: Subscription;

  ngOnInit(): void {
    this.routeSub = this.route.data.subscribe((data) => {
      if (data['MyBlogs']) {
        this.getUserBlogs();
      } else {
        this.getALLBlogs();
      }
    });

    this.blogService.isDelete.subscribe(value => {
      this.blogs = this.blogs.filter(item => item._id !== value);
    });

  }

  getALLBlogs() {
    this.blogService.getAllBlogs().subscribe({
      next: (data) => {
        this.blogs = data;
      },
      error: (errors) => {
        this.commonService.openSnackBar(
          errors.statusText + ' : ' + errors.status,
          'failure-snackbar'
        );
      },
    });
  }

  getUserBlogs() {
    this.blogService.getUsersBlog().subscribe({
      next: (data) => {
        this.blogs = data;
      },
      error: (errors) => {
        this.commonService.openSnackBar(
          errors.statusText + ' : ' + errors.status,
          'failure-snackbar'
        );
      },
    });
  }
}
