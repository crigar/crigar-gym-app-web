import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ApiService } from '../api.service';
import { HelperService } from '../helper.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AppValidators } from '../app-validators';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {
  @Input('type') type: any = {};
  @Input('user') user;

  public data: FormGroup;
  public response = {
    show: false,
    type: 'success',
    message: ''
  }

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private helperService: HelperService,
    private router: Router,
  ) { }

  send(){
    if ( this.user == undefined ) {
      this.apiService.newUser(this.data.value)
      .subscribe((res: any) => {
        console.log(res);
        if(res.success == true){
          this.response.show = true
          this.response.type = 'success'
          this.response.message = res.message
 
        }else if(res.error == undefined){
          
        }else{
          //this.helperService.toast('error', 'Error', undefined);
        }
        setTimeout(() => { 
          this.response.show = false;
         }, 2000);
      },(error) => {
        //this.helperService.toast('error', 'Error', undefined);
      });
    }else{
      this.apiService.updateUser(this.data.value, this.user.id)
      .subscribe((res: any) => {
        console.log(res);
        if(res.success == true){
          this.response.show = true
          this.response.type = 'success'
          this.response.message = res.message
 
        }else if(res.error == undefined){
          
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

  public addClient( event ){
    this.data.controls.creditCardsInfo.setValue( [ event.data ] );
    console.log('asdfsaf',this.data.value);
    this.apiService.newClient(this.data.value)
      .subscribe((res: any) => {
        console.log(res);
        if(res.success == true){
          this.response.show = true
          this.response.type = 'success'
          this.response.message = res.message
        }else if(res.error == undefined){
          //this.helperService.toast('warning', '¡Atención!', res.message);
        }else{
          this.response.show = true
          this.response.type = 'danger'
          this.response.message = res.message
        }
        setTimeout(() => { 
          this.response.show = false;
         }, 2000);
      },(error) => {
        //this.helperService.toast('error', 'Error', undefined);
      });
  }

  ngOnInit() {
    this.data = this.fb.group({
      username: [( this.user != undefined ? this.user.username: '' ), [Validators.required, AppValidators.username]],
      pass: ['', [Validators.required]],
      passAgain: ['', [Validators.required, AppValidators.same({ name: 'pass', label: 'Contraseña' })]],
      document: [( this.user != undefined ? this.user.document: '' ), [Validators.required]],
      name: [( this.user != undefined ? this.user.name: '' ), [Validators.required]],
      email: [( this.user != undefined ? this.user.email: '' ), [Validators.required, AppValidators.email]],
      phone: [( this.user != undefined ? this.user.phone: '' ), [Validators.required]],
      userRoles: [[ ( ( this.type == 'user' )?1:2 ) ], [Validators.required]],
    //creditCardsInfo: ['', [Validators.required]],
    });
    //if (this.type == 'user') this.data.removeControl('creditCardsInfo');
    if (this.user != undefined) {
      this.data.removeControl('pass');
      this.data.removeControl('passAgain');
    }
    console.log(this.type);
    
  }

  
}
