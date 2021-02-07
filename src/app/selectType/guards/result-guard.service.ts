import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { TypesService } from 'src/app/selectType/services/types.service';

@Injectable({
  providedIn: 'root',
})
export class ResultGuard implements CanActivate {
  selectedTypes: Set<string>;

  constructor(private typesService: TypesService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (this.typesService.selectedTypes.size > 0) {
      return true;
    } else {
      this.router.navigate(['home']);
    }
  }
}
