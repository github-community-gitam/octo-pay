import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { BarcodeFormat } from '@zxing/library';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-scan',
  templateUrl: './scan.component.html',
  styleUrls: ['./scan.component.scss']
})
export class ScanComponent {

  userdata = JSON.parse(localStorage.getItem('userdata')!)

  allowedFormats = [BarcodeFormat.QR_CODE]
  spinner = false

  constructor(private httpClient: HttpClient) { }

  scanSuccessHandler(qr: string) {
    this.spinner = true
    const body = {
      username: this.userdata.username,
      password: this.userdata.password,
      amt: 25,
      stall_id: qr
    }
    this.httpClient.post(environment.endpoint + '/scan', body).subscribe({
      next: (res: any) => {
        this.spinner = false
        alert('Transfer success')
      },
      error: (err) => {
        this.spinner = false
        alert(err.error)
      }
    })
  }

  test() {
    this.spinner = true
    const body = {
      username: localStorage.getItem('username'),
      password: this.userdata.password,
      amt: 25,
      stall_id: 'jtSvphaMu2Jq8yND4qhDJQ=='
    }
    this.httpClient.post(environment.endpoint + '/scan', body).subscribe({
      next: (res: any) => {
        if (!res.error) {
          alert('Transfer success')
        } else {
          alert(res.message)
        }
        this.spinner = false
      },
      error: (err) => {
        alert('Error has occured')
        this.spinner = false
      }
    })
  }


}
