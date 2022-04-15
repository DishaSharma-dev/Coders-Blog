import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../../services/user/user.service';

@Injectable({
  providedIn: 'root',
})
export class RouteGuard implements CanActivate {
  constructor(private userService: UserService) {}
  routeAllowed = ['MyBlogs', "Profile", "WriteBlog"];
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (
      localStorage.getItem('auth_token') == null &&
      (route.routeConfig?.path == 'SignIn' ||
        route.routeConfig?.path == 'SignUp')
    ) {
      return true;
    }

    if (
      localStorage.getItem('auth_token') != null &&
      this.routeAllowed.some((x) => x == route.routeConfig?.path)
    )
      return true;
    return false;
  }
}
