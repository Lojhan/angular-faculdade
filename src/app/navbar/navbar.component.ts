import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import User from 'src/models/user.model';
import { AuthenticatedFeaturesService } from '../authenticated-features.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  logged = false

  isMenuCollapsed = true

  email = new FormControl('');
  password = new FormControl('');
  user: User = new User();

  constructor(
    private authService: AuthenticatedFeaturesService
  ) {}

  async ngOnInit(): Promise<void> {
    if(localStorage.getItem("token")){
      const data = await this.authService.refresh()
      this.user = data.user
      this.logged = data.logged
    }
  }

  async login(): Promise<void> {
    try {
      const data = await this.authService.login(this.email.value, this.password.value)
      this.user = data.user
      this.logged = data.logged
      
      } catch (error) {
        console.error(error)
    }
  }

  async logout(): Promise<void> {
    try {
      await this.authService.login(this.email.value, this.password.value)
      this.user = {} as User
      this.logged = false
      
      } catch (error) {
        console.error(error)
    }
  }

  setEmail(e: any){
    this.email.setValue(e.target.value)
  }

  setPassword(e: any){
    this.password.setValue(e.target.value) 
  }

}
