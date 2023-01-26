import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from '../services/common.service';

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

  constructor(private commonService: CommonService) { }

  ngOnInit(): void {

    this.commonService.getUserData((bool: any) => {
      if (bool) {
        this.userData = this.commonService.userData
        this.firstName = this.userData.fullname.split(" ")[0][0] + this.userData.fullname.split(" ")[0].substring(1).toLowerCase()
      }
    })

    setInterval(() => {
      this.time = new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" })
    }, 1000)
  }

  rechargeOC() {
    this.commonService.quantity = this.quantity
    console.log(this.quantity)
    this.commonService.event_pass = false
  }

  registerEPass() {
    this.commonService.event_pass = true
  }

  logout() {
    localStorage.removeItem('username')
    localStorage.removeItem('password')
  }

}
