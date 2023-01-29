import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-transfers',
  templateUrl: './transfers.component.html',
  styleUrls: ['./transfers.component.scss']
})
export class TransfersComponent implements OnInit {

  userdata: any
  data: any

  constructor(private httpClient: HttpClient) { }

  ngOnInit() {
    this.getData()
  }

  async getData() {
    this.userdata = JSON.parse(localStorage.getItem('userdata')!)
    this.httpClient.post(environment.endpoint + '/transfers', { username: localStorage.getItem('username'), password: this.userdata.password }).subscribe((res: any) => {
      if (!res.error) {
        this.data = res.transfers
      } else {
        alert(res.message)
      }
    })
  }

}
