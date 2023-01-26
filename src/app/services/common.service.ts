import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  quantity = 1
  event_pass = true
  octopay =  true

  userData = {
    fullname: '',
    event_pass: '',
    balance: '',
    dev: '',
    transfers: []
  }
  constructor(private httpClient: HttpClient) { }

  getUserData(callback: Function) {
    this.httpClient.post(environment.endpoint + '/get-user-data', { username: localStorage.getItem('username'), password: localStorage.getItem('password') }).subscribe((res: any) => {
      if (res.error == false) {
        this.userData.fullname = res.data.fullname
        this.userData.balance = res.data.balance
        this.userData.event_pass = res.data.epass
        this.userData.dev = res.data.dev
        this.userData.transfers = res.data.transfers
        callback(true)
      } else {
        callback(false)
      }
    })
  }
}
