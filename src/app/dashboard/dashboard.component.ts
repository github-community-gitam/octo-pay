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

  userdata = JSON.parse(localStorage.getItem('userdata')!)
  transfers: any

  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.firstName = this.userdata.fullname.split(" ")[0][0] + this.userdata.fullname.split(" ")[0].substring(1).toLowerCase()
    this.getUserData()
    setInterval(() => {
      this.time = new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" })
    }, 1000)
  }

  async getUserData() {
    this.httpClient.post(environment.endpoint + '/get-user-data', { username: this.userdata.username, password: this.userdata.password }).subscribe({
      next: (res: any) => {
        localStorage.setItem('userdata', JSON.stringify(res.data))
        this.userdata = res.data
        this.transfers = res.transfers
      },
      error: (err: any) => {
        alert(err.error)
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