import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  uiData = {
    balance: '',
    fullname: '',
    regnumber: '',
    firstname: '',
    spinner: false,
    eventpass: false,
    transfers: []
  }

  modalData = {
    oc: 1
  }

  constructor(private router: Router, private httpClient: HttpClient, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.checkoutSession()
  }

  getUserData() {
    this.httpClient.post(environment.endpoint + '/get-user-data', { username: localStorage.getItem('username'), password: localStorage.getItem('password') }).subscribe((res: any) => {
      if (res.error == false) {
        this.uiData.fullname = res.data.fullname
        this.uiData.firstname = res.data.fullname.split(" ")[0][0] + res.data.fullname.split(" ")[0].substring(1).toLowerCase()
        this.uiData.balance = res.data.balance
        this.uiData.transfers = res.data.transfers
        this.uiData.regnumber = localStorage.getItem('username') as string
        if (res.data.event_pass) this.uiData.eventpass = true
      }
      this.uiData.spinner = false
    })
  }

  goToScan() {
    this.router.navigate(['scan'])
  }

  createCheckout(bool: boolean, quantity: number) {
    const data = {
      username: localStorage.getItem('username'),
      password: localStorage.getItem('password'),
      event_pass: bool,
      quantity: quantity
    }
    this.httpClient.post(environment.endpoint + '/create-checkout-session', data).subscribe((res: any) => {
      if (res.error == false) window.location.href = res.url
      else alert(res.message)
    })
  }

  checkoutSession() {
    this.uiData.spinner = true
    this.activatedRoute.queryParams.subscribe((params: any) => {
      if (params.session_id) {
        this.httpClient.post(environment.endpoint + '/checkout-session', { session_id: params.session_id, p: params.p }).subscribe((res: any) => {
          if (res.error == false) {
            alert('Payment successful')
            this.router.navigate(['dashboard'])
          } else {
            this.router.navigate(['dashboard'])
          }
        })
      } else {
        this.getUserData()
      }
    })
  }

  logout() {
    localStorage.removeItem('username')
    localStorage.removeItem('password')
    this.router.navigate(['login'])
  }

}
