import { Component, Input, OnInit } from '@angular/core';
import CommentModel from '../../models/comment.model';
import { CommonService } from '../../services/common/common.service';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {

  @Input() commentDetails! : CommentModel;
  userName! : String;
  userImage : String = "../../../../assets/svg/profile_pic.svg";
  constructor(private userService : UserService, private commonService : CommonService) { }

  ngOnInit(): void {
    this.getCommentUser(this.commentDetails.UserId)
  }

  getCommentUser(id: String) {
    this.userService.getUser(id).subscribe({
      next: (data) => {
        if(data.Image) this.userImage = data.Image;
        if(data.Name) this.userName = data.Name;

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
