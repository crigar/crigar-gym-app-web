import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from '@angular/router';
import { Route } from '@angular/compiler/src/core';
import { ApiService } from '../api.service';
import { HelperService } from '../helper.service';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  public data: FormGroup;
  public users = []
  public cities = []
  public clients = [];
  public sedes = [];
  public cityId;
  public userEditing;
  public userNewCard;
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

  ngOnInit() {
    this.getCities();
    this.data = this.fb.group({
      city: ['', [Validators.required]],
      sede: ['', [Validators.required]],
    });
  }

  edit( userId ){
    this.userEditing = userId;
    this.userNewCard = undefined;
  }

  newCard( userId ){
    this.userNewCard = userId;
    this.userEditing = undefined;
  }

  getCities(){
    this.apiService.getCities()
      .subscribe((res: any) => {
        this.cities = res;
        console.log(res);
      });
  }

  getSedes(){
    this.apiService.getSedes(this.cityId)
      .subscribe((res: any) => {
        this.sedes = res;
        console.log(res);
      });
  }


  changeCity(){
    this.cityId = this.data.controls.city.value;
    this.getSedes();
  }

  getClients(){
    this.apiService.getClients()
      .subscribe((res: any) => {
        this.clients = res;
        console.log(res);
      });
  }

  search(){
    this.apiService.getUserByParam(this.data.controls.sede.value)
      .subscribe((res: any) => {
        console.log(res);
        this.clients = res;
      });
  }

}
