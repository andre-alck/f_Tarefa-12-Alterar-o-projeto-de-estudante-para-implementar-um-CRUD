import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Alerta } from './../models/alerta.model';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  alerta: Alerta = {} as Alerta;
  public _success = new Subject<Alerta>();

  constructor() { }

  public changeSuccessMessage(message: string, type: any) {
    this.alerta.message = message;
    this.alerta.type = type;

    this._success.next(this.alerta);
  }

}
