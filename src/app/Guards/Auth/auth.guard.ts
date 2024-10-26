import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from "@angular/router";
import { AngularFireAuth } from '@angular/fire/compat/auth'
import { Observable } from "rxjs";
import { map, take, tap } from 'rxjs/operators'
import { Auth } from "@angular/fire/auth";

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {
  constructor(private auth: AngularFireAuth, private router: Router) { }
  canActivate(): Observable<boolean> {
    return this.auth.authState.pipe(
      take(1),
      map(user => !!user),
      tap(loggedIn => {
        if (!loggedIn) {
          this.router.navigate(['/login'])
        }
      })
    )
  }
}