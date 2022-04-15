import { Component, Input, OnInit } from '@angular/core';
import BlogModel from '../../models/blog.model';
import UserModel from '../../models/user.model';
import { BlogService } from '../../services/blog/blog.service';
import { CommonService } from '../../services/common/common.service';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-blog-card',
  templateUrl: './blog-card.component.html',
  styleUrls: ['./blog-card.component.css'],
})
export class BlogCardComponent implements OnInit {
  constructor(
    private userService: UserService,
    private commonService: CommonService,
    private blogService: BlogService
  ) {}
  @Input() blog!: BlogModel;
  userId: String = localStorage.getItem('userId') || '';
  blogUser!: UserModel;
  ngOnInit(): void {
    this.userService.getUser(this.blog.UserId).subscribe({
      next: (data) => (this.blogUser = data),
      error: (errors) => {
        this.commonService.openSnackBar(
          errors.statusText + ' : ' + errors.status,
          'failure-snackbar'
        );
      },
    });
  }

  deleteBlog(id : String) {
    this.blogService.deleteBlog(id).subscribe({
      next: () => {
        this.blogService.isDelete.next(id);
        this.commonService.openSnackBar(
          'Blog deleted successfully',
          'success-snackbar'
        );
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
