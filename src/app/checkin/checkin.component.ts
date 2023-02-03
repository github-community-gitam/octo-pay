import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { BarcodeFormat } from '@zxing/library';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-checkin',
  templateUrl: './checkin.component.html',
  styleUrls: ['./checkin.component.scss']
})
export class CheckinComponent {

  allowedFormats = [BarcodeFormat.QR_CODE]
  spinner = false
  checkin = true

  userdata = JSON.parse(localStorage.getItem('userdata')!)

  constructor(private httpClient: HttpClient) { }

  scanSuccessHandler(qr: string) {
    this.spinner = true
    const data = {
      qr: qr,
      username: this.userdata.username,
      password: this.userdata.password,
      checkin: this.checkin
    }
    this.httpClient.post(environment.endpoint + '/checkin', data).subscribe({
      next: (res: any) => {
        this.spinner = false
        alert(res.message)
      },
      error: (err) => {
        this.spinner = false
        alert(err.error)
      }
    })
  }

}
