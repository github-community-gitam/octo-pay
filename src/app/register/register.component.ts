import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Integer from '@zxing/library/esm/core/util/Integer';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  spinner = false

  formData = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  })

  constructor(private httpClient: HttpClient, private router: Router) { }

  userdata: any

  event_pass = false
  quantity = 1

  buttonText = ''

  ngOnInit(): void {
    this.userdata = JSON.parse(localStorage.getItem('userdata')!)
    if(localStorage.getItem('event_pass')) {
      this.event_pass = true
      this.buttonText = 'Register'
    } else {
      this.quantity = parseInt(localStorage.getItem('quantity')?.toString()!)
      this.buttonText = 'Recharge'
    }
  }

  reg() {
    if(this.event_pass) {
      this.register()
    } else {
      this.recharge()
    }
  }

  register() {
    if (!this.formData.valid) return
    this.spinner = true
    const data = {
      username: localStorage.getItem('username'),
      password: this.userdata.password,
      s_username: this.formData.controls.username.value as string,
      s_password: this.formData.controls.password.value as string,
    }
    this.httpClient.post(environment.endpoint + '/register', data).subscribe({
      next: (res: any) => {
        if (!res.error) {
          alert('Registration successful')
          this.router.navigate(['dashboard'])
        } else {
          alert(res.message)
        }
        this.spinner = false
      },
      error: (e) => {
        alert('Error has occured')
        this.spinner = false
      }
    })
  }

  recharge() {
    if (!this.formData.valid) return
    this.spinner = true
    const data = {
      username: localStorage.getItem('username'),
      password: this.userdata.password,
      s_username: this.formData.controls.username.value as string,
      s_password: this.formData.controls.password.value as string,
      quantity: this.quantity,
    }
    this.httpClient.post(environment.endpoint + '/recharge', data).subscribe({
      next: (res: any) => {
        if (!res.error) {
          alert('Recharge successful')
          this.router.navigate(['dashboard'])
        } else {
          alert(res.message)
        }
        this.spinner = false
      },
      error: (e) => {
        alert('Error has occured')
        this.spinner = false
      }
    })
  }


}
