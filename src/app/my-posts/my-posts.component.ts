import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { AuthenticatedFeaturesService } from '../authenticated-features.service';
import { RequestsService } from '../requests.service';

@Component({
  selector: 'app-my-posts',
  templateUrl: './my-posts.component.html',
  styleUrls: ['./my-posts.component.css']
})
export class MyPostsComponent implements OnInit {
  @ViewChild('error')
  public readonly errorSwal!: SwalComponent;

  constructor(
    private router: Router,
    private requestsService: RequestsService,
    private authenticatedFeaturesService: AuthenticatedFeaturesService,
  ) { }

  posts: Array<any> = [];

  async ngOnInit(): Promise<void> {
    this.posts = await this.requestsService.getUserPosts(+localStorage.getItem('id')!);
  }

  async deletePost(id: string | number) {
    try {
      await this.authenticatedFeaturesService.deletePost(id);
      this.posts = await this.requestsService.getUserPosts(+localStorage.getItem('id')!);

    } catch (error) {
      this.errorSwal.fire()
    }
  }

  async editPost(id: string | number) {
    this.router.navigate(['edit-post', id])
  }

}
