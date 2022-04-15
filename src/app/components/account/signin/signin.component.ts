import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CommonService } from 'src/app/shared/services/common/common.service';
import { UserService } from 'src/app/shared/services/user/user.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
})
export class SigninComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private commonService: CommonService
  ) {}

  userServiceSub!: Subscription;

  ngOnInit(): void {}

  loginForm = this.fb.group({
    Email: ['', [Validators.required, Validators.email]],
    Password: ['', [Validators.required]],
  });

  onSubmit() {
    this.userServiceSub = this.userService
      .authenticateUser(this.loginForm.value)
      .subscribe({
        next: (response: any) => {
          localStorage.setItem('auth_token', response.token);
          localStorage.setItem('userId', response.userId);
          this.router.navigate(['/']);
          this.userService.isLoggedIn.next(true);
        },
        error: (errors) => {
          this.commonService.openSnackBar(
            errors.statusText + ' : ' + errors.status,
            'failure-snackbar'
          );
        },
      });
  }

  formFieldHasError(key: string) {
    return (
      this.loginForm.controls[key].touched &&
      this.loginForm.controls[key].invalid
    );
  }
}
