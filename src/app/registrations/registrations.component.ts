import { HttpClient, JsonpInterceptor } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-registrations',
  templateUrl: './registrations.component.html',
  styleUrls: ['./registrations.component.scss']
})
export class RegistrationsComponent implements OnInit {

  data: undefined
  searchKey = ''

  constructor(private httpClient: HttpClient) { }

  ngOnInit() {
    this.httpClient.post(environment.endpoint + '/registrations', { username: localStorage.getItem('username'), password: localStorage.getItem('password') }).subscribe({
      next: (res: any) => {
        this.data = res
      },
      error: (err) => {
        alert('Error has occured')
      }
    })
  }

  search(key: any) {
    return key.includes(this.searchKey)
  }

}
