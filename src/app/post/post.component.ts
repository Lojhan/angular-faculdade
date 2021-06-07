import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RequestsService } from '../requests.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  constructor(
    
    private route: ActivatedRoute,
    private requestsService: RequestsService
  ) {}

  post: any = {};

  async ngOnInit(): Promise<void> {
  const routeParams = this.route.snapshot.paramMap;
  this.post = await this.requestsService.getPost(routeParams.get('id')!);
  }

}
