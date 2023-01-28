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

  allowedFormats = [BarcodeFormat.QR_CODE]
  spinner = false

  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
  }

  scanSuccessHandler(qr: string) {
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
        this.spinner = false
      },
      error: (err) => {
        alert('Error has occured')
        this.spinner = false
      }
    })
  }

}
