import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-registrations',
  templateUrl: './registrations.component.html',
  styleUrls: ['./registrations.component.scss']
})
export class RegistrationsComponent implements OnInit {

  userdata = JSON.parse(localStorage.getItem('userdata')!)

  data: undefined
  searchKey = ''

  constructor(private httpClient: HttpClient) { }

  ngOnInit() {
    this.httpClient.post(environment.endpoint + '/registrations', { username: this.userdata.username, password: this.userdata.password }).subscribe({
      next: (res: any) => {
        this.data = res
      },
      error: (err) => {
        alert(err.error)
      }
    })
  }

  search(key: any) {
    return key.includes(this.searchKey)
  }

}
