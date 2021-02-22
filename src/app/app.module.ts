import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HeroesComponent } from './heroes/heroes.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { HomeComponent } from './home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserFormComponent } from './user-form/user-form.component';
import { HttpClientModule} from "@angular/common/http";
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JwtModule } from '@auth0/angular-jwt';
import { OptionsComponent } from './options/options.component';
import { CreditCardFormComponent } from './credit-card-form/credit-card-form.component';
import { EntityComponent } from './entity/entity.component';
import { SearchComponent } from './search/search.component';
import { ControlMessagesComponent } from './control-messages/control-messages.component';

export function tokenGetter() {
  return localStorage.getItem('token');
}

@NgModule({
  declarations: [
    AppComponent,
    HeroesComponent,
    DashboardComponent,
    HomeComponent,
    UserFormComponent,
    OptionsComponent,
    CreditCardFormComponent,
    EntityComponent,
    SearchComponent,
    ControlMessagesComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({
      timeOut: 6000,
      extendedTimeOut: 4000,
      easeTime: 500,
      closeButton: true,
      progressBar: true,
      progressAnimation: 'decreasing',
      positionClass: 'toast-top-right',
      enableHtml: true,
      maxOpened: 3,
      autoDismiss: true
    }),
    HttpClientModule,
    BrowserAnimationsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ['localhost:1337'],
        headerName: 'authorization',
      }
    }),
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
