import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticatedFeaturesService } from '../authenticated-features.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {

  constructor(
    private authService: AuthenticatedFeaturesService,
  ) {}

  name = localStorage.getItem("username")

  src = `http://192.168.15.3:4000/api/images/profiles/${localStorage.getItem("id")}.jpeg`


  async logout(): Promise<void> {
    try {
      this.authService.logout()
      window.location.href = 'http://localhost:4200'
      
      } catch (error) {
        console.error(error)
    }
  }

}
