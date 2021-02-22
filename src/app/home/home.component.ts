import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from '@angular/router';
import { Route } from '@angular/compiler/src/core';
import { ApiService } from '../api.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public login: FormGroup;
  public loginActive = true;
  public response = {
    show: false,
    type: 'success',
    message: ''
  }

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private apiService: ApiService,
  ) { }

  ngOnInit() {
    this.login = this.fb.group({
      username: ['', [Validators.required]],
      pass: ['', [Validators.required]],
    });
  }

  public signin(){
    console.log(this.login.value);
    this.apiService.login(this.login.value)
      .subscribe((res: any) => {
        console.log(res);
        if(res.success == true){
          this.response = {
            show: true,
            type: 'success',
            message: res.message, 
          }
          this.router.navigate(['options']);
        }else if(res.error == undefined){
          this.response = {
            show: true,
            type: 'warning',
            message: res.message, 
          }
        }else{
          //this.helperService.toast('error', 'Error', undefined);
        }
        setTimeout(() => { 
          this.response.show = false;
         }, 2000);
      },(error) => {
        //this.helperService.toast('error', 'Error', undefined);
      });
    
  }

}
