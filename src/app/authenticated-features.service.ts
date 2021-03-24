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

  async login(email: string, password: string): Promise<boolean> {
    try {
      const { data } = await this.requests.login(email, password)
      this.user = User.fromJSON(data)
      this.logged = true
      return this.logged 
    } catch (error) {
      this.logged = true
      console.error(error)
      return this.logged

    }
  }

  async logout(){
    try {
      await this.requests.logout()
    } catch (error) {
      this.logged = false
      console.error(error)
    }
  }
}
