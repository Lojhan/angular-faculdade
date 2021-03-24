import { Injectable } from '@angular/core';
import HttpClient from '../plugins/axios'

@Injectable({
  providedIn: 'root'
})
export class RequestsService extends HttpClient {

  constructor() { 
    super("http://192.168.15.3:3000");
  }

  async login(email: string, password: string) {
    const response = await this.instance.post("login", { email, password });
    localStorage.setItem("token", response["data"]["access_token"]);

    this.instance.defaults.headers["Authorization"] =
      "Bearer " + response["data"]["access_token"];

    return response;
  }

  async logout() {
    try{
      await this.instance.post("logout")
      localStorage.removeItem("token")
    } catch (error) {
      console.error(error)
    }
  }

  async getAllPosts() {
    try{
      return (await this.instance.get("posts")).data
    } catch (error) {
      console.error(error)
      return error
    }
  }

  async getPost(id: number) {
    try{
      return (await this.instance.get("post/" + id)).data
    } catch (error) {
      console.error(error)
      return error
    }
  }


}
