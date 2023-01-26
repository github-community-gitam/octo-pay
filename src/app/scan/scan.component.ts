import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { BarcodeFormat } from '@zxing/library';
import { environment } from 'src/environments/environment';
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-scan',
  templateUrl: './scan.component.html',
  styleUrls: ['./scan.component.scss']
})
export class ScanComponent implements OnInit {

  octopay = true
  allowedFormats = [BarcodeFormat.QR_CODE]
  spinner = false
  checkin = true

  constructor(private httpClient: HttpClient, private commonService: CommonService) { }

  ngOnInit(): void {
    this.octopay = this.commonService.octopay
  }

  scanSuccessHandler(qr: string) {
    if (this.octopay) {
      this.transferCoins(qr)
    } else {
      this.checkPassValidity(qr)
    }
  }

  transferCoins(qr: string) {
    if (!qr.startsWith('stall')) alert('Invalid QR')
    const body = {
      username: localStorage.getItem('username'),
      password: localStorage.getItem('password'),
      amt: 25,
      stall_id: qr
    }
    this.httpClient.post(environment.endpoint + '/scan', body).subscribe({
      next: (res: any) => {
        if (!res.error) {
          alert('Transfer success')
        } else {
          alert(res.message)
        }
      },
      error: (err) => {
        alert('Error has occured')
      }
    })
  }

  checkPassValidity(qr: string) {
    this.httpClient.post(environment.endpoint + '/checkin', { qr: qr, checkin: this.checkin }).subscribe({
      next: (res: any) => {
        if (!res.error) {
          alert('Valid E Pass')
        } else {
          alert('Invalid E Pass')
        }
      },
      error: (err) => {
        alert('Error has occured')
      }
    })
  }

  
  test() {
    const body = {
      username: localStorage.getItem('username'),
      password: localStorage.getItem('password'),
      amt: 25,
      stall_id: 'stall_1001'
    }
    this.httpClient.post(environment.endpoint + '/scan', body).subscribe({
      next: (res: any) => {
        if (!res.error) {
          alert('Transfer success')
        } else {
          alert(res.message)
        }
      },
      error: (err) => {
        alert('Error has occured')
      }
    })
  }

}
