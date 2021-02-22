import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ApiService } from '../api.service';
import { HelperService } from '../helper.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AppValidators } from '../app-validators';
@Component({
  selector: 'app-credit-card-form',
  templateUrl: './credit-card-form.component.html',
  styleUrls: ['./credit-card-form.component.css']
})
export class CreditCardFormComponent implements OnInit {
  @Output('add') add = new EventEmitter<any>();
  @Input('type') type: any = {};
  @Input('userId') userId;
  public data: FormGroup;
  public entities = [];
  public response = {
    show: false,
    type: 'success',
    message: '',
  }
  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private helperService: HelperService,
  ) { }

  send(){
    if (this.userId == undefined) {
      console.log('entrooooo',this.data.value);
      
      this.add.emit({
        data: this.data.value
      });
    }else{
      console.log(this.data.value);
      
      this.apiService.newCard(this.data.value, this.userId)
      .subscribe((res: any) => {
        console.log(res);
        if(res.success == true){
          this.response.show = true
          this.response.type = 'success'
          this.response.message = res.message
 
        }else if(res.error == undefined){
          this.response.show = true
          this.response.type = 'danger'
          this.response.message = res.message
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
  }

  getEntities(){
    this.apiService.getEntities()
      .subscribe((res: any) => {
        this.entities = res;
        console.log(res);
      });
  }

  ngOnInit() {
    this.getEntities();
    this.data = this.fb.group({
      entity: ['', []],
      pan: ['', [Validators.required]],
      expirationDate: ['', [Validators.required, AppValidators.futureDate]],
      cvv: ['', [Validators.required]],
      brand: ['', [Validators.required]],
    });
  }

}
