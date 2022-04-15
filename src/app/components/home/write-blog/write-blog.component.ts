import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import 'quill-emoji/dist/quill-emoji.js';
import { Subscription } from 'rxjs';
import { BlogService } from 'src/app/shared/services/blog/blog.service';
import { CommonService } from 'src/app/shared/services/common/common.service';

@Component({
  selector: 'app-write-blog',
  templateUrl: './write-blog.component.html',
  styleUrls: ['./write-blog.component.css'],
})
export class WriteBlogComponent implements OnInit {
  @Input() content!: FormControl;
  blogServiceSub!: Subscription;
  categories: any = [
    'Trends',
    'Artificial Intelligence',
    'Product Reviews',
    'Tutorials',
    'Programming Languages',
    'Conferences',
    'News',
    'Startup World',
  ];

  modules = {};

  blogImage: String = '../../../../assets/svg/profile_pic.svg';

  constructor(
    private fb: FormBuilder,
    private blogService: BlogService,
    private commonService: CommonService
  ) {
    this.modules = {
      'emoji-shortname': true,
      'emoji-textarea': true,
      'emoji-toolbar': true,
      toolbar: [
        ['bold', 'italic', 'underline', 'strike'], // toggled buttons
        ['blockquote', 'code-block'],

        [{ header: 1 }, { header: 2 }], // custom button values
        [{ list: 'ordered' }, { list: 'bullet' }],
        [{ script: 'sub' }, { script: 'super' }], // superscript/subscript
        [{ indent: '-1' }, { indent: '+1' }], // outdent/indent
        [{ direction: 'rtl' }], // text direction

        [{ size: ['small', false, 'large', 'huge'] }], // custom dropdown
        [{ header: [1, 2, 3, 4, 5, 6, false] }],

        [{ color: [] }, { background: [] }], // dropdown with defaults from theme
        [{ font: [] }],
        [{ align: [] }],
        // remove formatting button

        ['link', 'image', 'video'], // link and image, video
        ['emoji'],
      ],
    };
  }

  @ViewChild('uploadImage') uploadImage!: ElementRef;

  ngOnInit(): void {
    this.content = this.content ?? new FormControl();
  }

  blogForm = this.fb.group({
    Title: [''],
    Category: [''],
    Description: [''],
    Body: [''],
    Image: [''],
  });

  onSubmit() {
    this.blogForm.controls['Body'].setValue(this.content.value);
    this.blogServiceSub = this.blogService
      .addBlog(this.blogForm.value)
      .subscribe({
        next: () => {
          this.content.setValue('');
          this.blogForm.setValue({
            Title: '',
            Category: '',
            Description: '',
            Body: '',
            Image: '',
          });
          this.commonService.openSnackBar(
            "Blog created successfully",
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
        this.blogForm.controls['Image'].setValue(e.target.result);
        this.blogImage = e.target.result;
      };
    };

    reader.readAsDataURL(event.target.files[0]);
  } 
}
