import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import validator from 'validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  constructor() { }

  reader = new FileReader();
  src: any = "https://via.placeholder.com/350x350"
  email = new FormControl('');
  username = new FormControl('');
  password = new FormControl('');
  passwordHelper = new FormControl('');
  passwordsMatch: "unset" | false | true = "unset"

  openPicker(){
    document.getElementById('profile-pic')!.click();
  }

  changed(event: any) {    
    if (event.target.files[0]! === null) return;
    event.target.files instanceof FileList && this.reader.readAsDataURL(event.target.files[0]!);
    this.reader.onloadend = () => this.src = this.reader.result;
  }

  setEmail(e: any){
    if (!validator.isEmail(e.target.value)){
      document.getElementById("registerEmail")?.classList.add("is-invalid")
    } else {
      document.getElementById("registerEmail")?.classList.remove("is-invalid")
    }
    this.email.setValue(e.target.value)
  }

  setUsername(e: any){
    this.username.setValue(e.target.value)
  }

  setPassword(e: any){
    if (e?.target.value !== this.passwordHelper.value) {
      this.passwordsMatch = false 
      document.getElementById("registerPassHelper")?.classList.add("is-invalid")
    } else if (e?.target.value === '') {
      document.getElementById("registerPassHelper")?.classList.remove("is-invalid")
      this.passwordsMatch = 'unset'
    }
    else {
      document.getElementById("registerPassHelper")?.classList.remove("is-invalid")
      this.passwordsMatch = true
    }

    this.password.setValue(e.target.value) 
  }

  setPasswordHelper(e: any){
    if (e?.target.value !== this.password.value) {
      this.passwordsMatch = false 
      document.getElementById("registerPassHelper")?.classList.add("is-invalid")
    } else if (e?.target.value === '') {
      document.getElementById("registerPassHelper")?.classList.remove("is-invalid")
      this.passwordsMatch = 'unset'
    }
    else {
      document.getElementById("registerPassHelper")?.classList.remove("is-invalid")
      this.passwordsMatch = true
    }

    this.passwordHelper.setValue(e.target.value) 
  }

  submit() {
    const invalids = document.getElementsByClassName("is-invalid")

    if (invalids.length > 0) return
    else {
      console.log(
        this.email.value,
        this.username.value,
        this.password.value,
      )
    }
  }


}
