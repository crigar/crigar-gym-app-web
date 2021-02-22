import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private url = environment.apiUrl;

  constructor(
    private http: HttpClient
  ) { }

  public login( data ){
    let url = this.url + 'login'
    return this.http.post(url,data);
  }

  public newUser( data ){
    let url = this.url + 'user/sign-up'
    return this.http.post(url, data);
  }

  public newClient( data ){
    let url = this.url + 'client/create'
    return this.http.post(url, data);
  }

  public newEntity( data ){
    let url = this.url + 'entity/create'
    return this.http.post(url, data);
  }

  public getEntities(  ){
    let url = this.url + 'entity/all-entities'
    return this.http.get(url);
  }

  public getCities(  ){
    let url = this.url + 'city/index'
    return this.http.get(url);
  }

  public getSedes( cityId ){
    let url = this.url + 'sede/get-sedes/' + cityId
    return this.http.get(url);
  }

  public getClients(  ){
    let url = this.url + 'user/get-clientes'
    return this.http.get(url);
  }

  public agregarCliente( data ){
    let url = this.url + 'user/set-sede'
    return this.http.post(url, data);
  }

  public getUserByParam( param ){
    let url = this.url + 'user/search?sede=' + param;
    return this.http.get(url);
  }

  public updateUser( data, userId ){
    let url = this.url + 'client/'+userId+'/update';
    return this.http.put(url, data);
  }

  public newCard( data, userId ){
    let url = this.url + 'client/'+userId+'/new-card';
    return this.http.post(url, data);
  }
  
  public newCity( data ){
    let url = this.url + 'city/create';
    return this.http.post(url, data);
  } 

  public newSede( data ){
    let url = this.url + 'sede/create';
    return this.http.post(url, data);
  }
}
