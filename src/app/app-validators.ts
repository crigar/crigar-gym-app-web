import { AbstractControl, FormControl } from '@angular/forms';

export class AppValidators {

  public static numericPattern: RegExp = /^[0-9]+$/;
  public static alphaPattern: RegExp = /^[a-zA-ZÀ-ÿu00f1u00d1]+(\s*[a-zA-ZÀ-ÿu00f1u00d1]*)+$/;
  public static alphanumPattern: RegExp = /^[a-zA-Z0-9 ]+$/;
  public static passwordPattern: RegExp = /^[a-zA-Z0-9 ]+$/;
  public static nitPattern: RegExp = /^([0-9]+)-[0-9]{1}$/;
  public static domainPattern: RegExp = /^(http(s)?:\/\/)?([0-9a-zA-Z][-.\w]*[0-9a-zA-Z]{2,6})*(:(0-9)*)*(\/?)( [a-zA-Z0-9\-\.\?\,\'\/\\\+&%\$#_]*)?$/;
  public static emailPattern: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  public static phonePattern: RegExp = /^(\+)?(\([0-9]{1,3}\))?([0-9 ]+)$/;
  public static semesterPattern: RegExp = /^[0-9]{4}-[1,2]{1}S$/
  public static pdfPattern: RegExp = /^.+\.(([pP][dD][fF]))$/;
  public static usernamePattern: RegExp = /^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-z0-9._]+(?<![_.])$/

  public static email(control: AbstractControl) {
    return !control.value ? null : (AppValidators.emailPattern.test(control.value) === false ? { email: true } : null);
  }

  public static username(control: AbstractControl) {
    return !control.value ? null : (AppValidators.usernamePattern.test(control.value) === false ? { username: true } : null);
  }

  public static nit(controlObj: Object) {
    const control = <FormControl>controlObj;
    return (AppValidators.nitPattern.test(control.value) === false && control.value != '') ? { nit: true } : null;
  }

  public static domain(controlObj: Object) {
    const control = <FormControl>controlObj;
    return !control.value ? null : (AppValidators.domainPattern.test(control.value) === false ? { domain: true } : null);
  }

  public static numeric(controlObj: Object) {
    const control = <FormControl>controlObj;
    return !control.value ? null : (AppValidators.numericPattern.test(control.value) === false ? { numeric: true } : null);
  }

  public static phone(controlObj: Object) {
    const control = <FormControl>controlObj;
    return !control.value ? null : (AppValidators.phonePattern.test(control.value) === false ? { phone: true } : null);
  }

  public static alpha(controlObj: Object) {
    const control = <FormControl>controlObj;
    return !control.value ? null : (AppValidators.alphaPattern.test(control.value) === false ? { alpha: true } : null);
  }

  public static alphanum(controlObj: Object) {
    const control = <FormControl>controlObj;
    return !control.value ? null : (AppValidators.alphaPattern.test(control.value) === false ? { alphanum: true } : null);
  }

  public static password(controlObj: Object) {
    const control = <FormControl>controlObj;
    return !control.value ? null : (AppValidators.alphaPattern.test(control.value) === false ? { password: true } : null);
  }

  public static futureDate(controlObj: Object) {
    const control = <FormControl>controlObj;
    return !control.value ? null : (new Date(control.value) > new Date() ? null : { futureDate: true });
  }

  public static posteriorDate(field: any) {
    return (controlObj: Object) => {
      const control = <FormControl>controlObj;
      let matchControl = control.parent ? control.parent.controls[field.name] : null;

      if (matchControl === undefined) {
        throw new Error('Match field "' + field.name + '" not found.');
      }
      return matchControl ? (new Date(matchControl.value) < new Date(control.value) ? null : { posteriorDate: { matchLabel: field.label } }) : null;
    }
  }

  public static pastDate(field: any) {
    return (controlObj: Object) => {
      const control = <FormControl>controlObj;
      let matchControl = control.parent ? control.parent.controls[field.name] : null;

      if (matchControl === undefined) {
        throw new Error('Match field "' + field.name + '" not found.');
      }
      return matchControl ? (new Date(matchControl.value) > new Date(control.value) ? null : { pastDate: { matchLabel: field.label } }) : null;
    }
  }

  public static datesWithSemester(data: any) {
    return (control: AbstractControl) => {
      if(control.parent){
        let semester = control.parent.controls[data.semester];
        let startDate = control.parent.controls[data.startDate];
        let endDate = control.parent.controls[data.endDate];
        semester.setErrors(null);
        startDate.setErrors(null);
        endDate.setErrors(null);
        if( semester.value.split('-').length > 1 && startDate.value  != "" && endDate.value != ""){
            startDate = new Date(startDate.value);
            endDate = new Date(endDate.value);
            let year = semester.value.split('-')[0];
            let period = parseInt(semester.value.split('-')[1].substring(0,1),10);
            let period1 = [ 1, 2, 3, 4, 5, 6 ];
            let period2 = [ 7, 8, 9, 10, 11, 12 ];
            let testPeriod = ( period == 1 )? period1 : period2 ;
            if( year == startDate.getFullYear() && year == endDate.getFullYear() ){
              if( testPeriod.indexOf( startDate.getMonth() + 1 ) != -1 || testPeriod.indexOf( endDate.getMonth() + 1 ) != -1  ){
                return null;
              }else{
                return { datesWithSemester: true };
              }
            }else if( year == endDate.getFullYear() ){
              if( testPeriod.indexOf( endDate.getMonth() + 1 ) != -1 ){
                return null
              }else{
                return { datesWithSemester: true };
              }
            }else{
              return { datesWithSemester: true };
            }
        }else{
          return null;
        }
      }
    }
  }

  public static beforeDate(control: AbstractControl) {
    return !control.value ? null : (new Date(control.value) <= new Date() ? null : { beforeDate: true });
  }

  public static same(field: any) {
    return (controlObj: Object) => {
      const control = <FormControl>controlObj;
      let matchControl = control.parent ? control.parent.controls[field.name] : null;

      if (matchControl === undefined) {
        throw new Error('Match field "' + field.name + '" not found.');
      }

      return matchControl ? (matchControl.value !== control.value ? { same: { matchLabel: field.label } } : null) : null;
    }
  }

  public static requiredIfFieldEquals(field, value) {
    return (controlObj: Object) => {
      const control = <FormControl>controlObj;
      let matchControl = control.parent ? control.parent.controls[field] : null;

      if (matchControl === undefined) {
        throw new Error('Match field "' + field + '" not found.');
      }

      return matchControl.value === value ? (control.value === '' ? { required: true } : null) : null;
    }
  }
  public static semester(control: AbstractControl) {
    return AppValidators.semesterPattern.test(control.value) ? null: {semester: true } ;
  }

  public static pdfFile(control: AbstractControl) {
    return !control.value ? null : (AppValidators.pdfPattern.test(control.value) === false ? { file: true } : null);
  }
}
