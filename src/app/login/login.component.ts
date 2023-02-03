import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  spinner = false

  formData = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  })

  constructor(private httpClient: HttpClient, private router: Router) { }

  login() {
    if (!this.formData.valid) return
    this.spinner = true
    const username = this.formData.controls.username.value?.toLowerCase()
    const password = this.formData.controls.password.value?.toString()
    this.httpClient.post(environment.endpoint + '/login', { 'username': username, 'password': password }).subscribe({
      next: (res: any) => {
        localStorage.setItem('userdata', JSON.stringify(res))
        this.spinner = false
        this.router.navigate(['dashboard'])
      },
      error: (e) => {
        alert(e.error)
        this.spinner = false
      }
    })
  }

  open(s: string) {
    if (s == 'instagram') {
      window.open('https://www.instagram.com/github.gitam/')
    } else if (s == 'epoch') {
      window.open('https://github-community-gitam.github.io/epoch/')
    }
  }

}
