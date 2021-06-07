import { Injectable } from '@angular/core';
import { Post } from 'src/models/post.model';
import HttpClient from '../plugins/axios'

@Injectable({
  providedIn: 'root'
})
export class RequestsService extends HttpClient {
  constructor() { 
    super("http://192.168.15.5:4000/api");
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

  async getAllPosts(): Promise<Post[]> {
    try{
      return (await this.instance.get("posts"))
    } catch (error) {
      console.error(error)
      return error
    }
  }

  
  async getLatestPosts(): Promise<Post[]> {
    try{
      return (await this.instance.get("posts/latest"))
    } catch (error) {
      console.error(error)
      return error
    }
  }

  async getUserPosts(id: string) {
    try{
      return (await this.instance.get("posts/user/" + id))
    } catch (error) {
      console.error(error)
      return error
    }
  }

  async getPost(id: string): Promise<Post> {
    try{
      return (await this.instance.get(`posts/${id}`))
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
    return await this.instance.post(
        "posts",
        formData, { 
          headers: { "Content-Type": "multipart/form-data"}
        }
      );
  }


  async editPost(id: string | number, title: string, subtitle: string, text: string, pic: File) {
    var formData = new FormData()
    formData.append('title', title)
    formData.append('subtitle', subtitle)
    formData.append('text', text)
    formData.append('image', pic)
    return await this.instance.patch(
      `posts/${id}`,
        formData, { 
          headers: { "Content-Type": "multipart/form-data"}
        }
      );
  }



  async deletePost(id: string | number) {
    return await await this.instance.delete(`posts/${id}`)
  }


}
