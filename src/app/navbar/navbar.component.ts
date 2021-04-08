import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
    private authService: AuthenticatedFeaturesService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  async ngOnInit(): Promise<void> {
    if(localStorage.getItem("token")){
      console.log('test')
      try {
        const data = await this.authService.refresh()
        this.user = data.user
        this.logged = data.logged
      } catch (error) {
        this.router.navigate(['/'])
      } 
    } else {
      if([
        'profile', 
        'my-posts', 
        'edit-post', 
        'create-post'
      ].includes(window.location.pathname.split('/')[1])) {
        this.router.navigate(['/'])
      }
    
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
      this.authService.logout()
      this.user = {} as User
      this.logged = false
      this.router.navigate(['/'])
      
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
