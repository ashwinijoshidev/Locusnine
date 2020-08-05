import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/user.service';
import { User } from 'src/app/shared/user.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  constructor(public service : UserService,
    public toastr : ToastrService) {}

  ngOnInit(): void {
    this.service.getUser();
  }

  populateForm(user : User){
    this.service.formData=Object.assign({},user);
  }

  onDelete(id : number){
    if (confirm('Are you sure to delete this record?')) {
    this.service.deleteUser(id).subscribe(res =>{
      this.service.refreshList();
      this.toastr.warning('Record Deleted Successfully','User.Delete')
    }
      )
  }
}

}
