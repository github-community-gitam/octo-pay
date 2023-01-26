import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { CommonService } from '../services/common.service';

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

  constructor(private httpClient: HttpClient, private router: Router, private commonService: CommonService) { }

  event_pass = false

  ngOnInit(): void {
    this.event_pass = this.commonService.event_pass
    console.log(this.event_pass)
  }

  reg() {
    console.log(this.event_pass)
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
      username: localStorage.getItem('username'),
      password: localStorage.getItem('password'),
      s_username: this.formData.controls.username.value as string,
      s_password: this.formData.controls.password.value as string,
      event_pass: this.commonService.event_pass,
      quantity: this.commonService.quantity,
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
      password: localStorage.getItem('password'),
      s_username: this.formData.controls.username.value as string,
      s_password: this.formData.controls.password.value as string,
      quantity: this.commonService.quantity,
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
