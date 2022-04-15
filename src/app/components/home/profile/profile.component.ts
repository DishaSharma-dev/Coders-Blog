import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { City, Country, State } from 'src/app/shared/models/address.model';
import UserModel from 'src/app/shared/models/user.model';
import { AddressService } from 'src/app/shared/services/address/address.service';
import { CommonService } from 'src/app/shared/services/common/common.service';
import { UserService } from 'src/app/shared/services/user/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private addressService: AddressService,
    private userService: UserService,
    private commonService : CommonService
  ) {}

  @ViewChild('uploadImage') uploadImage!: ElementRef;

  auth_token!: string;
  countries: Country[] = [];
  states: State[] = [];
  cities: City[] = [];
  profileImage: String = '../../../assets/svg/profile_pic.svg';
  userDetails!: UserModel;

  ngOnInit(): void {
    this.getAccessToken();
    this.getUserDetails();
  }

  profileForm = this.fb.group({
    Name: [null, [Validators.required]],
    Email: [null, [Validators.required, Validators.email]],
    Gender: [null, [Validators.required]],
    DOB: [null, [Validators.required]],
    MobileNumber: [null, [Validators.required]],
    Street: [null, [Validators.required]],
    Country: [null, [Validators.required]],
    State: [null, [Validators.required]],
    City: [null, [Validators.required]],
    Image: [null],
    ZipCode: [null],
    Website: [null],
    LinkedIn: [null],
  });

  private getAccessToken() {
    this.addressService.getAccessToken().subscribe({
      next: (data: any) => {
        this.auth_token = data.auth_token;
        this.getCountries(this.auth_token);
      },
      error: (errors) => {
        this.commonService.openSnackBar(
          errors.statusText + ' : ' + errors.status,
          'failure-snackbar'
        );
      },
    });
  }

  private getCountries(authToken: string) {
    this.addressService.getCountries(authToken).subscribe({
      next: (data) => {
        this.countries = data;
        this.getStates(this.profileForm.controls['Country'].value);
      },
      error: (errors) => {
        this.commonService.openSnackBar(
          errors.statusText + ' : ' + errors.status,
          'failure-snackbar'
        );
      },
    });
  }

  private getStates(country_name: string) {
    this.addressService.getStates(this.auth_token, country_name).subscribe({
      next: (data) => {
        this.states = data;
        this.getCities(this.profileForm.controls['State'].value);
      },
      error: (errors) => {
        this.commonService.openSnackBar(
          errors.statusText + ' : ' + errors.status,
          'failure-snackbar'
        );
      },
    });
  }

  private getCities(state_name: string) {
    this.addressService.getCities(this.auth_token, state_name).subscribe({
      next: (data) => {
        this.cities = data;
      },
      error: (errors) => {
        this.commonService.openSnackBar(
          errors.statusText + ' : ' + errors.status,
          'failure-snackbar'
        );
      },
    });
  }

  countryChanged() {
    this.getStates(this.profileForm.controls['Country'].value);
  }

  stateChanged() {
    this.getCities(this.profileForm.controls['State'].value);
  }

  openFileChooser() {
    this.uploadImage.nativeElement.click();
  }

  handleImage(event: any) {
    let file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e: any) => {
      const image = new Image();
      image.src = e.target.result;
      image.onload = (rs) => {
        this.profileImage = e.target.result;
        this.profileForm.controls['Image'].setValue(this.profileImage);
      };
    };

    reader.readAsDataURL(event.target.files[0]);
  }

  onSubmit() {
    this.userService.updateUser(this.profileForm.value).subscribe({
      next: (response) => {

        this.commonService.openSnackBar(
          "Profile updated successfully",
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

  getUserDetails() {
    this.userService.getUser(localStorage.getItem('userId') || '').subscribe({
      next: (data) => {
        this.profileForm.patchValue({
          Name : data.Name,
          Email : data.Email,
          DOB : data.DOB,
          Gender : data.Gender,
          MobileNumber : data.MobileNumber,
          Street : data.Street,
          Country : data.Country,
          City : data.City,
          ZipCode : data.ZipCode,
          State : data.State,
          Website : data.Website,
          LinkedIn : data.LinkedIn
        });
        this.profileImage = data.Image;
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
      this.profileForm.controls[key].touched &&
      this.profileForm.controls[key].invalid
    );
  }
}
