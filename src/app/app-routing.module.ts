import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SigninComponent } from './components/account/signin/signin.component';
import { SignupComponent } from './components/account/signup/signup.component';
import { BlogComponent } from './components/home/blog/blog.component';
import { BlogsComponent } from './components/home/blogs/blogs.component';
import { ProfileComponent } from './components/home/profile/profile.component';
import { WriteBlogComponent } from './components/home/write-blog/write-blog.component';
import { RouteGuard } from './shared/guards/route/route.guard';

const routes: Routes = [
  { path: '', redirectTo: 'blogs', pathMatch: 'full' },
  { path: 'SignIn', component: SigninComponent, canActivate: [RouteGuard] },
  { path: 'SignUp', component: SignupComponent, canActivate: [RouteGuard] },
  { path: 'blogs', component: BlogsComponent },
  {
    path: 'MyBlogs',
    component: BlogsComponent,
    canActivate: [RouteGuard],
    data: { MyBlogs: true },
  },
  {
    path: 'Profile',
    component: ProfileComponent,
    canActivate: [RouteGuard],
  },
  {
    path: 'WriteBlog',
    component : WriteBlogComponent,
    canActivate: [RouteGuard]
  },
  {
    path: 'Blog/:Id',
    component : BlogComponent
    
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
