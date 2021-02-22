import { Injectable, TemplateRef  } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
@Injectable({
  providedIn: 'root'
})
export class HelperService {
  toasts: any[] = [];
  constructor(
    private toastr: ToastrService,
  ) { }

  public showToast(textOrTpl: string | TemplateRef<any>, options: any = {}) {
    this.toasts.push({ textOrTpl, ...options });
  }

}
