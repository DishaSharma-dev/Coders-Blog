import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import BlogModel from 'src/app/shared/models/blog.model';
import CommentModel from 'src/app/shared/models/comment.model';
import UserModel from 'src/app/shared/models/user.model';
import { BlogService } from 'src/app/shared/services/blog/blog.service';
import { CommonService } from 'src/app/shared/services/common/common.service';
import { UserService } from 'src/app/shared/services/user/user.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css'],
})
export class BlogComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private blogService: BlogService,
    private userService: UserService,
    private fb: FormBuilder,
    private commonService: CommonService
  ) {}

  @ViewChild('BGImage') BGImage!: ElementRef;
  @ViewChild('blogContentRef') blogContentRef!: ElementRef;
  blogId!: String;
  comment: CommentModel = {
    Body: '',
    Date: new Date(),
    UserId: localStorage.getItem('userId') || '',
  };
  blogDetails: BlogModel = {
    Likes: 0,
    _id: '0',
    UserId: '0',
    Title: '',
    Category: '',
    Description: '',
    Body: '',
    Comments: [],
    Image: '../../../../assets/svg/profile_pic.svg',
    IsVisible: true,
    Date: new Date(),
  };
  blogUser: UserModel = {
    _id: '',
    Name: '',
    Email: '',
    Password: '',
    MobileNumber: '',
    Image: '../../../../assets/svg/profile_pic.svg',
    DOB: '',
    Gender: '',
    Street: '',
    Country: '',
    State: '',
    City: '',
    ZipCode: 0,
    Website: '',
    LinkedIn: '',
  };

  styleObject = {
    backgroundImage: '',
  };

  commentForm = this.fb.group({
    body: ['', [Validators.required]],
  });
  isLoggedIn: boolean = localStorage.getItem('auth_token') != null;
  ngOnInit(): void {
    this.userService.isLoggedIn.subscribe((value) => (this.isLoggedIn = value));
    this.route.paramMap.subscribe((params) => {
      this.blogId = params.get('Id') || '';
      this.getBlogDetails(params.get('Id') || '');
    });
  }

  getBlogDetails(blogId: String) {
    this.blogService.getBlog(blogId).subscribe({
      next: (data: BlogModel) => {
        if (data.Image) this.blogDetails.Image = data.Image;
        if (data.Body) this.blogDetails.Body = data.Body;
        if (data.Likes) this.blogDetails.Likes = data.Likes;
        if (data.Comments) this.blogDetails.Comments = data.Comments;
        if (data.UserId) this.blogDetails.UserId = data.UserId;
        if (data.Title) this.blogDetails.Title = data.Title;
        if (data.Description) this.blogDetails.Description = data.Description;
        this.getBlogUser(this.blogDetails.UserId);
      },
      error: (errors) => {
        this.commonService.openSnackBar(
          errors.statusText + ' : ' + errors.status,
          'failure-snackbar'
        );
      },
    });
  }

  getBlogUser(id: String) {
    this.userService.getUser(id).subscribe({
      next: (data) => {
        if (data.Image) this.blogUser.Image = data.Image;
        if (data.Name) this.blogUser.Name = data.Name;
        if (data.Email) this.blogUser.Email = data.Email;
      },
      error: (errors) => {
        this.commonService.openSnackBar(
          errors.statusText + ' : ' + errors.status,
          'failure-snackbar'
        );
      },
    });
  }

  likeBlog() {
    this.blogDetails.Likes = +this.blogDetails.Likes + 1;
    this.blogService
      .likeBlog(this.blogId, +this.blogDetails.Likes)
      .subscribe({
        next: () => {
          this.commonService.openSnackBar(
            'Blog liked successfully',
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

  postComment() {
    this.comment.Body = this.commentForm.controls['body'].value;
    this.blogService.addComment(this.blogId, this.comment).subscribe({
      next: () => {
        this.commonService.openSnackBar(
          'Comment added successfully',
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
