import { Injectable } from '@angular/core';
import HttpClient from '../plugins/axios'

@Injectable({
  providedIn: 'root'
})
export class RequestsService extends HttpClient {



  constructor() { 
    super("http://192.168.15.3:4000/api");
  }

  async login(username: string, password: string) {
    const response = await this.instance.post("auth/signin", { username, password });
    localStorage.setItem("token", response.accessToken);
    localStorage.setItem("username", username);
    localStorage.setItem("id", response.user.id);

    this.instance.defaults.headers["Authorization"] =
      "Bearer " + response.accessToken;

    return response;
  }

  async signup(email: string, username: string, password: string, image: File) {
    
    var formData = new FormData()
    formData.append('email', email)
    formData.append('username', username)
    formData.append('password', password)
    formData.append('image', image)
    const response = await this.instance.post(
        "auth/signup",
        formData, { 
          headers: { "Content-Type": "multipart/form-data"}
        }
      );
    return response;
  }

  async refresh(token: string) {
    const response = await this.instance.post("auth/verify", { token });
    localStorage.setItem("token", response);
    this.instance.defaults.headers["Authorization"] =
      "Bearer " + response;

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
      return (await this.instance.get("posts"))
    } catch (error) {
      console.error(error)
      return error
    }
  }

  
  async getLatestPosts() {
    try{
      return (await this.instance.get("posts/latest"))
    } catch (error) {
      console.error(error)
      return error
    }
  }

  async getUserPosts(id: number) {
    try{
      return (await this.instance.get("posts/user/" + id))
    } catch (error) {
      console.error(error)
      return error
    }
  }

  async getPost(id: number) {
    try{
      return (await this.instance.get("posts/" + id))
    } catch (error) {
      console.error(error)
      return error
    }
  }

  async post(title: string, subtitle: string, text: string, pic: File) {
    var formData = new FormData()
    formData.append('title', title)
    formData.append('subtitle', subtitle)
    formData.append('text', text)
    formData.append('image', pic)
    const response = await this.instance.post(
        "posts",
        formData, { 
          headers: { "Content-Type": "multipart/form-data"}
        }
      );
    return response;
  }


}
