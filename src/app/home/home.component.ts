import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticatedFeaturesService } from '../authenticated-features.service';
import { RequestsService } from '../requests.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  posts: Array<any> = [];
  latest: Array<any> = [];

  constructor(
    private router: Router,
    private requestsService: RequestsService
    ) { }

  async ngOnInit(): Promise<void> {
    this.posts = await this.requestsService.getAllPosts();
    this.latest = await this.requestsService.getLatestPosts();
  }

  navigate(id: number){
    this.router.navigate(['/post', id]);
 }

}
