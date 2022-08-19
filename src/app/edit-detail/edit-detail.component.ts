import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CrudService } from '../crud.service';

@Component({
  selector: 'app-edit-detail',
  templateUrl: './edit-detail.component.html',
  styleUrls: ['./edit-detail.component.scss']
})
export class EditDetailComponent implements OnInit {

  editForm!: FormGroup;

  constructor(public fb: FormBuilder,
    private router: Router,
    private actRoute: ActivatedRoute,
    private service: CrudService) { }

  //bind data of edited id
  ngOnInit(): void {
    let id = this.actRoute.snapshot.paramMap.get('id');

    this.getUser(id);
    this.editForm = this.fb.group({
      name: ['', [Validators.required]],
      email: [
        '',
        [
          Validators.required,
          Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$'),
        ],
      ],
    });
  }

  //update data of id
  onSubmit() {
    let id = this.actRoute.snapshot.paramMap.get('id');
    return this.service.updateUser(id, this.editForm.value).subscribe(
      (res: any) => {
        this.router.navigateByUrl('/');
      });
  }

  //get data of id
  getUser(id: any) {
    this.service.getUser(id).subscribe((data) => {
      this.editForm.setValue({
        name: data['name'],
        email: data['email']
      });
    });
  }
}
