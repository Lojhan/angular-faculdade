import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AboutComponent } from './about/about.component';
import { PostComponent } from './post/post.component';
import { CreatePostComponent } from './create-post/create-post.component';
import { RegisterComponent } from './register/register.component';
import { MyPostsComponent } from './my-posts/my-posts.component';
import { NewPostComponent } from './new-post/new-post.component';
import { ProfileComponent } from './profile/profile.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    AboutComponent,
    PostComponent,
    CreatePostComponent,
    RegisterComponent,
    MyPostsComponent,
    NewPostComponent,
    ProfileComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    SweetAlert2Module.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
