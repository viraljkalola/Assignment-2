import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { CrudService } from '../crud.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  constructor(private service: CrudService,
    private route: ActivatedRoute) { }

  detailarr: any = [];

  //get id of user on click
  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get('id');
    this.getUser(id);
  }

  //get user as per id
  getUser(id: any) {
    this.service.getUser(id).subscribe((data) => {
      this.detailarr = data;
    });
  }

}
