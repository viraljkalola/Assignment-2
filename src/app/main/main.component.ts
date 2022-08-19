import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CrudService } from '../crud.service';
import { Users } from '../users.interface';
import { Table } from 'primeng/table';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  constructor(private service: CrudService,
    private route: Router) { }
  users : any[]=[];
  selectedUsers: any;
  loading: boolean = true;
  statuses: any;
  role:any;
  @ViewChild('dt') dt: any;
  show = false;
  autohide = true;
  //call showUsers method
  ngOnInit(): void {
    this.showUsers();
  }

  //get all available users' detail and assign detail to array
  showUsers() {
    this.service.getUsers()
      .subscribe((userdata) => {
        console.log(userdata);
        
        this.users = userdata.results;
      });
  }

  //delete user of id
  removeUser(user: any, index: any) {
    if (window.confirm('Are you sure?')) {
      this.service.deleteUser(user.id).subscribe((data) => {
        // this.users.splice(index, 1);
        this.showUsers();
      });
    }
  }

  applyFilterGlobal($event:any, stringVal:any) {
    this.dt.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
  }

  applyFilter($event:any,fieldVal:any, stringVal:any) {
    this.dt.filter(($event.target as HTMLInputElement).value,fieldVal,stringVal);
  }

//   onActivityChange(event) {
//     const value = event.target.value;
//     if (value && value.trim().length) {
//         const activity = parseInt(value);

//         if (!isNaN(activity)) {
//             this.table.filter(activity, 'activity', 'gte');
//         }
//     }
// }

}
