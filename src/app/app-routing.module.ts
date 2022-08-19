import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddDetailComponent } from './add-detail/add-detail.component';
import { DetailComponent } from './detail/detail.component';
import { EditDetailComponent } from './edit-detail/edit-detail.component';
import { MainComponent } from './main/main.component';

const routes: Routes = [
  {path:'',component:MainComponent},
  {path:'add',component:AddDetailComponent},
  {path:'edit/:id',component:EditDetailComponent},
  {path:'detail/:id',component:DetailComponent},
  { path: 'delete',   redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
