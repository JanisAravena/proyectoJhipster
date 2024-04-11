import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of, EMPTY, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { INoticias } from '../noticias.model';
import { NoticiasService } from '../service/noticias.service';

const noticiasResolve = (route: ActivatedRouteSnapshot): Observable<null | INoticias> => {
  const id = route.params['id'];
  if (id) {
    return inject(NoticiasService)
      .find(id)
      .pipe(
        mergeMap((noticias: HttpResponse<INoticias>) => {
          if (noticias.body) {
            return of(noticias.body);
          } else {
            inject(Router).navigate(['404']);
            return EMPTY;
          }
        }),
      );
  }
  return of(null);
};

export default noticiasResolve;
