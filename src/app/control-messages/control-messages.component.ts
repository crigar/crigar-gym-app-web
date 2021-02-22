import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'control-messages',
  templateUrl: './control-messages.component.html',
  styleUrls: ['./control-messages.component.css']
})

export class ControlMessagesComponent implements OnInit {

  @Input('control') control: FormControl;

  constructor() { }

  ngOnInit() {
  }

  public getErrorMessage() {
    if (this.control.dirty && this.control.errors) {
      let errorMessage = '';

      if (this.control.errors.required) {
        errorMessage = 'Este campo es requerido.';
      } else if (this.control.errors.email) {
        errorMessage = 'Este campo debe contener un email válido.';
      } else if (this.control.errors.nit) {
        errorMessage = 'Formato de NIT inválido.';
      } else if (this.control.errors.phone) {
        errorMessage = 'Formato de teléfono inválido.';
      } else if (this.control.errors.minlength) {
        errorMessage = 'El campo debe contener mínimo ' + this.control.errors.minlength.requiredLength + ' caracteres. (Actual: ' + this.control.errors.minlength.actualLength + ' caracteres)';
      } else if (this.control.errors.maxlength) {
        errorMessage = 'El campo debe contener máximo ' + this.control.errors.maxlength.requiredLength + ' caracteres. (Actual: ' + this.control.errors.maxlength.actualLength + ' caracteres)';
      } else if (this.control.errors.domain) {
        errorMessage = 'Formato de URL inválido.';
      } else if (this.control.errors.numeric) {
        errorMessage = 'Este campo solo debe contener números.';
      } else if (this.control.errors.alpha) {
        errorMessage = 'Este campo solo debe contener caracteres alfabéticos.';
      } else if (this.control.errors.same) {
        errorMessage = 'Este campo no coincide con el campo "' + this.control.errors.same.matchLabel + '".';
      } else if (this.control.errors.futureDate) {
        errorMessage = 'La fecha debe ser posterior a hoy.';
      } else if(this.control.errors.beforeDate){
        errorMessage = 'Le fecha debe ser anterior a la fecha de hoy';
      } else if (this.control.errors.posteriorDate) {
        errorMessage = 'La fecha no puede ser anterior a la del campo "' + this.control.errors.posteriorDate.matchLabel +'".';
      } else if (this.control.errors.pastDate) {
        errorMessage = 'La fecha no puede ser posterior a la del campo "' + this.control.errors.pastDate.matchLabel +'".';
      } else if (this.control.errors.semester){
        errorMessage = 'El semestre no tiene un formato valido, ejemplo: ' + (new Date()).getFullYear() + '-1S o ' + (new Date()).getFullYear() + '-2S' ;
      } else if(this.control.errors.startEndDates){
        errorMessage = 'La fecha de inicio no puede ser mayor a la fecha de fin';
      } else if(this.control.errors.datesWithSemester){
        errorMessage = 'El semestre no esta dentro de la fecha de inicio y fecha de fin';
      } else if(this.control.errors.file){
        errorMessage = 'El archivo no tiene un formato valido';
      } else if(this.control.errors.size){
        errorMessage = 'El tamaño del archivo no puede exceder los 5M';
      } else if(this.control.errors.username){
        errorMessage = 'El nombre de usuario no tiene un formato adecuado';
      }

      return errorMessage;
    }
  }
}
