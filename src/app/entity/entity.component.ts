import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ApiService } from '../api.service';
import { HelperService } from '../helper.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AppValidators } from '../app-validators';

@Component({
  selector: 'app-entity',
  templateUrl: './entity.component.html',
  styleUrls: ['./entity.component.css']
})
export class EntityComponent implements OnInit {
  public city: FormGroup;
  public sede: FormGroup;
  public client: FormGroup;
  public entities = [];
  public cities = [];
  public clients = [];
  public sedes = [];
  public cityId;
  public response = {
    show: true,
    type: 'success',
    message: '',
  }
  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private helperService: HelperService,
  ) { }

  newCity(){
    this.apiService.newCity(this.city.value)
      .subscribe((res: any) => {
        console.log(res);
        if(res.success == true){
          this.response.show = true
          this.response.type = 'success'
          this.response.message = res.message
          this.getCities();
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

  newSede(){
    this.apiService.newSede(this.sede.value)
      .subscribe((res: any) => {
        console.log(res);
        if(res.success == true){
          this.response.show = true
          this.response.type = 'success'
          this.response.message = res.message
          this.getCities();
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

  getEntities(){
    this.apiService.getEntities()
      .subscribe((res: any) => {
        this.entities = res;
        console.log(res);
      });
  }
  getCities(){
    this.apiService.getCities()
      .subscribe((res: any) => {
        this.cities = res;
        console.log(res);
      });
  }

  changeCity(){
    console.log(this.client)
    this.cityId = this.client.controls.city.value;
    this.getSedes();
  }

  getClients(){
    this.apiService.getClients()
      .subscribe((res: any) => {
        this.clients = res;
        console.log(res);
      });
  }

  agregarCliente(){
    this.apiService.agregarCliente(this.client.value)
      .subscribe((res: any) => {
        if(res.success == true){
          this.response.show = true
          this.response.type = 'success'
          this.response.message = res.message
          this.getCities();
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
 
  getSedes(){
    this.apiService.getSedes(this.cityId)
      .subscribe((res: any) => {
        this.sedes = res;
        console.log(res);
      });
  }

  ngOnInit() {
    this.getCities();
    this.getClients();
    this.city = this.fb.group({
      name: ['', [Validators.required]],
    });
    this.sede = this.fb.group({
      name: ['', [Validators.required]],
      address: ['', [Validators.required]],
      city: ['', [Validators.required]],
    });

    this.client = this.fb.group({
      city: ['', [Validators.required]],
      client: ['', [Validators.required]],
      sede: ['', [Validators.required]],
    });
  }

}
