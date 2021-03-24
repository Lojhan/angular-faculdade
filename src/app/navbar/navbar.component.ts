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

  constructor(
    private authService: AuthenticatedFeaturesService
  ) {}

  ngOnInit(): void {
  }

  async login(){
    try {
      this.logged = await this.authService.login(this.email.value, this.password.value)
      
      } catch (error) {
        console.error(error)
    }
    this.authService.login(this.email.value, this.password.value)
  }

  setEmail(e: any){
    this.email.setValue(e.target.value)
  }

  setPassword(e: any){
    this.password.setValue(e.target.value) 
  }

}
