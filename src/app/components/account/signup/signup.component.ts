import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CommonService } from 'src/app/shared/services/common/common.service';
import { UserService } from 'src/app/shared/services/user/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  userServiceSub!: Subscription;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private commonService: CommonService,
    private router: Router
  ) {
  }
  ngOnDestroy(): void {
    if (this.userServiceSub) this.userServiceSub.unsubscribe();
  }

  ngOnInit(): void {}

  signupForm = this.fb.group(
    {
      Name: ['', [Validators.required]],
      Email: ['', [Validators.required, Validators.email]],
      Password: ['', [Validators.required]],
      ConfirmPassword: ['', [Validators.required]],
    },
    {
      validator: this.ConfirmedValidator('Password', 'ConfirmPassword'),
    }
  );

  onSubmit() {
    this.userServiceSub = this.userService
      .addUser(this.signupForm.value)
      .subscribe({
        next: (response: any) => {
          this.commonService.openSnackBar(
            "Account created successfully",
            'success-snackbar'
          );
          this.router.navigate(['/SignIn']);
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
      this.signupForm.controls[key].touched &&
      this.signupForm.controls[key].invalid
    );
  }

  ConfirmedValidator(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
      if (
        matchingControl.errors &&
        !matchingControl.errors['confirmedValidator']
      ) {
        return;
      }
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ confirmedValidator: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }

}
