import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from 'src/models/post.model';
import { AuthenticatedFeaturesService } from '../authenticated-features.service';
import { RequestsService } from '../requests.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {

  constructor(
    private authService: AuthenticatedFeaturesService,
    private requestsService: RequestsService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  reader = new FileReader();
  src: any = "https://via.placeholder.com/1200x500"

  title = new FormControl('');
  subtitle = new FormControl('');
  text = new FormControl('');
  pic: File = {} as File;
  id: number | string = -1;

  openPicker(){
    document.getElementById('profile-pic')!.click();
  }

  changed(event: any) {    
    if (event.target.files[0]! === null) return;
    event.target.files instanceof FileList && this.reader.readAsDataURL(event.target.files[0]!);
    this.reader.onloadend = () => this.src = this.reader.result;
    this.pic = event.target.files[0];
  }

  setTitle(e: any){
    this.title.setValue(e.target.value)
  }

  setSubtitle(e: any){
    this.subtitle.setValue(e.target.value)
  }

  setText(e: any){
    this.text.setValue(e.target.value)
  }

  async post(){
    try {
      const data: Post = await this.authService.post(this.title.value, this.subtitle.value, this.text.value, this.pic) 
      this.router.navigate(['post', data._id])
    } catch(err){
      console.log(err)
    }
  }

  async editPost(){
    try {
      await this.authService.editPost(this.id, this.title.value, this.subtitle.value, this.text.value, this.pic)
      this.router.navigate(['post', this.id])
    } catch(err){
      console.log(err)
    }
  }

  async ngOnInit(): Promise<void> {
    const routeId = this.route.snapshot.paramMap.get("id");
    if (routeId){
      const { _id, title, subtitle, text } = await this.requestsService.getPost(routeId);
      console.log(title, subtitle, text)
      this.id = _id;
      this.src = `http://192.168.15.5:4000/api/images/posts/${_id}.jpeg`
      this.title.setValue(title)
      this.subtitle.setValue(subtitle)
      this.text.setValue(text)
    } else {
      this.id = 0
    }
  }

}
