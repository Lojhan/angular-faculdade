import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AuthenticatedFeaturesService } from '../authenticated-features.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {

  constructor(
    private authService: AuthenticatedFeaturesService
  ) { }

  reader = new FileReader();
  src: any = "https://via.placeholder.com/1200x500"

  title = new FormControl('');
  subtitle = new FormControl('');
  text = new FormControl('');
  pic: File = {} as File;

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

  post(){
    try {
      this.authService.post(this.title.value, this.subtitle.value, this.text.value, this.pic)
    } catch(err){
      console.log(err)
    }
  }



  ngOnInit(): void {
  }

}
