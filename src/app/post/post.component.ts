import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  constructor(
    
    private route: ActivatedRoute,
  ) {}

  id: number = 0;

  ngOnInit(): void {
  const routeParams = this.route.snapshot.paramMap;
  this.id = Number(routeParams.get('id'));
  }

}
