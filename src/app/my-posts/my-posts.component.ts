import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticatedFeaturesService } from '../authenticated-features.service';
import { RequestsService } from '../requests.service';

@Component({
  selector: 'app-my-posts',
  templateUrl: './my-posts.component.html',
  styleUrls: ['./my-posts.component.css']
})
export class MyPostsComponent implements OnInit {

  constructor(
    private router: Router,
    private requestsService: RequestsService,
    private authenticatedFeaturesService: AuthenticatedFeaturesService
  ) { }

  posts: Array<any> = [];

  async ngOnInit(): Promise<void> {
    this.posts = await this.requestsService.getUserPosts(this.authenticatedFeaturesService.user.id);
  }

}
