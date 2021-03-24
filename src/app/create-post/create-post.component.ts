import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {

  constructor() { }

  
  reader = new FileReader();
  src: any = "https://via.placeholder.com/1200x500"

  openPicker(){
    document.getElementById('profile-pic')!.click();
  }

  changed(event: any) {    
    if (event.target.files[0]! === null) return;
    event.target.files instanceof FileList && this.reader.readAsDataURL(event.target.files[0]!);
    this.reader.onloadend = () => this.src = this.reader.result;
  }

  ngOnInit(): void {
  }

}
