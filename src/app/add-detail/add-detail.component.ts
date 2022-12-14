import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CrudService } from '../crud.service';

@Component({
  selector: 'app-add-detail',
  templateUrl: './add-detail.component.html',
  styleUrls: ['./add-detail.component.scss']
})
export class AddDetailComponent implements OnInit {

  userForm: FormGroup;

  //form creation
  constructor(public fb: FormBuilder,
    private router: Router,
    private service: CrudService) {
    this.userForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: [
        '',
        [
          Validators.required,
          Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$'),
        ],
      ],
      role: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.pattern('(?=.*[A-Za-z])(?=.*[0-9])(?=.*[$@$!#^~%*?&,.<>"\'\\;:\{\\\}\\\[\\\]\\\|\\\+\\\-\\\=\\\_\\\)\\\(\\\)\\\`\\\/\\\\\\]])[A-Za-z0-9\d$@].{7,}')]],
    });
  }

  ngOnInit(): void {
  }

  //get form control for validation
  get myForm() {
    return this.userForm.controls;
  }

  //form submission
  onSubmit() {
    if (!this.userForm.valid) {
      return false;
    } else {
      return this.service.createUser(this.userForm.value).subscribe(
        (res: any) => {
          console.log(res);
          this.router.navigateByUrl('/');
        });
    }
  }
}
