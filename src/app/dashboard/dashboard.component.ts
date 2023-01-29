import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  spinner = false
  time = ''
  firstName = ''
  quantity = 1

  userData: any
  transfers: any

  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.userData = JSON.parse(localStorage.getItem('userdata')!)
    this.firstName = this.userData.fullname.split(" ")[0][0] + this.userData.fullname.split(" ")[0].substring(1).toLowerCase()
    this.getUserData()
    setInterval(() => {
      this.time = new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" })
    }, 1000)
  }

  async getUserData() {
    this.httpClient.post(environment.endpoint + '/get-user-data', { username: localStorage.getItem('username'), password: this.userData.password }).subscribe((res: any) => {
      if (!res.error) {
        localStorage.setItem('userdata', JSON.stringify(res.data))
        this.userData = res.data
        this.transfers = res.transfers
      } else {
        alert(res.message)
      }
    })
  }

  rechargeOC() {
    localStorage.setItem('quantity', this.quantity.toString())
    localStorage.setItem('event_pass', '')
  }

  registerEPass() {
    localStorage.setItem('event_pass', ' ')
  }

  logout() {
    localStorage.removeItem('username')
    localStorage.removeItem('userdata')
  }
}


