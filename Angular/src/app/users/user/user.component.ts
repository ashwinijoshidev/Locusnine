import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/user.service';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  constructor(public service : UserService,
     public toastr : ToastrService) { }

  ngOnInit(): void {
    this.resetForm()
  }

  resetForm(form? : NgForm){
    if(form != null)
    form.resetForm();
    this.service.formData = {
      UserID : null,
      Name :"",
      Email : "",
      RoleType : "",
      Status : ""
    }
  
  }
  
  onSubmit(form : NgForm) {
    debugger;
    if(form.value.UserID == null)
    this.insertRecord(form);
    else
    this.updateRecord(form);
  
  }
  
  insertRecord(form : NgForm) {
   this.service.postUser(form.value).subscribe(res =>{
     this.toastr.success('Record Inserted Successfully','User.Insert')
     this.resetForm(form)
     this.service.refreshList();
   });
   }

   updateRecord(form : NgForm) {
    this.service.putUser(form.value).subscribe(res =>{
      this.toastr.info('Record Updated Successfully','User.Update')
      this.resetForm(form)
      this.service.refreshList();
    });
    }
}



