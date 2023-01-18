import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  spinner = false

  formData = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  })

  endPoint = 'https://StudentPortalLogin.supersum4n.repl.co/login'

  constructor(private httpClient: HttpClient, private router: Router) { }

  ngOnInit(): void { }

  login() {
    if (!this.formData.valid) return
    this.spinner = true
    const username = this.formData.controls.username.value as string
    const password = this.formData.controls.password.value as string
    this.httpClient.post(this.endPoint, { 'username': username, 'password': password }).subscribe({
      next: (res: any) => {
        if (res.error == false) {
          localStorage.setItem('username', username)
          localStorage.setItem('password', password)
          this.router.navigate(['dashboard'])
        } else {
          alert('Wrong credentials')
        }
      },
      error: (e) => alert('Error occured'),
      complete: () => this.spinner = false
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
