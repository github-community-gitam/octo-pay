import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-transfers',
  templateUrl: './transfers.component.html',
  styleUrls: ['./transfers.component.scss']
})
export class TransfersComponent implements OnInit {

  userdata = JSON.parse(localStorage.getItem('userdata')!)
  data: any

  constructor(private httpClient: HttpClient) { }

  ngOnInit() {
    this.getData()
  }

  async getData() {
    this.httpClient.post(environment.endpoint + '/transfers', { username: this.userdata.username, password: this.userdata.password }).subscribe({
      next: (res: any) => {
        this.data = res
      },
      error: (err) => {
        alert(err.error)
      }
    })
  }

}
