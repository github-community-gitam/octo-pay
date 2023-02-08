import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
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

  qr: any
  stalldata: any
  quantity = 1

  constructor(private httpClient: HttpClient) { }

  toggleModal() {
    document.getElementById('modal-button')?.click()
    this.spinner = false
  }

  refresh(){
    location.reload()
  }

  scanSuccessHandler(qr: string) {
    this.spinner = true
    this.qr = qr
    const body = {
      username: this.userdata.username,
      password: this.userdata.password,
      stall_id: this.qr
    }
    this.httpClient.post(environment.endpoint + '/scan', body).subscribe({
      next: (res: any) => {
        this.stalldata = res
        document.getElementById('modal-button')?.click()
      },
      error: (err) => {
        this.spinner = false
        alert(err.error)
      }
    })
  }

  transferoc() {
    this.toggleModal()
    this.spinner = true
    const body = {
      username: this.userdata.username,
      password: this.userdata.password,
      stall_id: this.qr,
      qty: this.quantity
    }
    this.httpClient.post(environment.endpoint + '/scan', body).subscribe({
      next: (res: any) => {
        this.spinner = false
        alert("Transfer success")
      },
      error: (err) => {
        this.spinner = false
        alert(err.error)
      }
    })
  }


}
