import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  spinner = false
  event_pass = false
  quantity = 1

  buttonText = ''

  userdata = JSON.parse(localStorage.getItem('userdata')!)

  formData = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  })

  constructor(private httpClient: HttpClient, private router: Router) { }

  ngOnInit(): void {
    if (localStorage.getItem('event_pass')) {
      this.event_pass = true
      this.buttonText = 'Register'
    } else {
      this.quantity = parseInt(localStorage.getItem('quantity')?.toString()!)
      this.buttonText = 'Recharge'
    }
  }

  reg() {
    if (this.event_pass) {
      this.register()
    } else {
      this.recharge()
    }
  }

  register() {
    if (!this.formData.valid) return
    this.spinner = true
    const data = {
      username: this.userdata.username,
      password: this.userdata.password,
      s_username: this.formData.controls.username.value?.toLowerCase(),
      s_password: this.formData.controls.password.value?.toString(),
    }
    this.httpClient.post(environment.endpoint + '/register', data).subscribe({
      next: (res: any) => {
        this.spinner = false
        alert('Registration successful')
        this.router.navigate(['dashboard'])
      },
      error: (err) => {
        this.spinner = false
        alert(err.error)
      }
    })
  }

  recharge() {
    if (!this.formData.valid) return
    this.spinner = true
    const data = {
      username: this.userdata.username,
      password: this.userdata.password,
      s_username: this.formData.controls.username.value?.toLowerCase(),
      s_password: this.formData.controls.password.value?.toString(),
      quantity: this.quantity,
    }
    this.httpClient.post(environment.endpoint + '/recharge', data).subscribe({
      next: (res: any) => {
        this.spinner = false
        alert('Recharge successful')
        this.router.navigate(['dashboard'])
      },
      error: (err) => {
        this.spinner = false
        alert(err.error)
      }
    })
  }


}
