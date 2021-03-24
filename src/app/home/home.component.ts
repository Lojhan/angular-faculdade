import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  images = [1, 2, 3, 4, 5];

  
  others = [6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  navigate(id: number){
    this.router.navigate(['/post', id]);
 }

}
