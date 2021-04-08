import { Injectable } from '@angular/core';
import User from 'src/models/user.model';
import { RequestsService } from './requests.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticatedFeaturesService {

  constructor(
    private requests: RequestsService
  ) {}

  logged: boolean = false
  user: User = new User();

  async login(email: string, password: string): Promise<any> {
    try {
      const data = await this.requests.login(email, password)
      this.user = new User(email, data.accessToken, data.user.id)
      this.logged = true
      console.log(data)
      
      localStorage.setItem("id", data.user.id)
      return { logged: this.logged, user: this.user }
    } catch (error) {
      console.error(error)
      return this.logged

    }
  }

  async signup(email: string, username: string, password: string, profilePic: File): Promise<any> {
    try {
      await this.requests.signup(email, username, password, profilePic)
      await this.login(username, password)
      window.location.replace('http://localhost:4200/');
    } catch (error) {
      console.error(error)
      return this.logged
    }
  }

  async refresh(): Promise<any> {
      const data = await this.requests.refresh(localStorage.getItem("token")!)
      localStorage.setItem("token", data)
      this.logged = true
      this.user = new User(
        localStorage.getItem("username")!,
        localStorage.getItem("token")!, 
        +localStorage.getItem("id")!
      )
      return { logged: this.logged, user: this.user }
  }

  async logout(){
    try {
      localStorage.clear()
      this.logged = false
    } catch (error) {
      this.logged = false
      console.error(error)
    }
  }

  async post(title: string, subtitle: string, text: string, pic: File): Promise<any> {
    try {
      await this.requests.post(title, subtitle, text, pic)
    } catch (error) {
      console.error(error)
      return this.logged
    }
  }

  async editPost(id: string | number, title: string, subtitle: string, text: string, pic: File): Promise<any> {
    try {
      await this.requests.editPost(id, title, subtitle, text, pic)
    } catch (error) {
      console.error(error)
      return this.logged
    }
  }

  async deletePost(id: string | number): Promise<any> {
      await this.requests.deletePost(id)
  }
}
