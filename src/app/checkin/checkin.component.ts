import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { BarcodeFormat } from '@zxing/library';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-checkin',
  templateUrl: './checkin.component.html',
  styleUrls: ['./checkin.component.scss']
})
export class CheckinComponent implements OnInit {

  allowedFormats = [BarcodeFormat.QR_CODE]
  spinner = false
  checkin = true

  userdata: any

  constructor(private httpClient: HttpClient) { }

  ngOnInit() {
    this.userdata = JSON.parse(localStorage.getItem('userdata')!)
  }

  scanSuccessHandler(qr: string) {
    this.spinner = true
    this.httpClient.post(environment.endpoint + '/checkin', { qr: qr, username: localStorage.getItem('username'), password: this.userdata.password, checkin: this.checkin }).subscribe({
      next: (res: any) => {
        alert(res.message)
        this.spinner = false
      },
      error: (err) => {
        alert('Error has occured')
        this.spinner = false
      }
    })
  }

}
