import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import { NoticiasComponent } from './list/noticias.component';
import { NoticiasDetailComponent } from './detail/noticias-detail.component';
import { NoticiasUpdateComponent } from './update/noticias-update.component';
import NoticiasResolve from './route/noticias-routing-resolve.service';

const noticiasRoute: Routes = [
  {
    path: '',
    component: NoticiasComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: NoticiasDetailComponent,
    resolve: {
      noticias: NoticiasResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: NoticiasUpdateComponent,
    resolve: {
      noticias: NoticiasResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: NoticiasUpdateComponent,
    resolve: {
      noticias: NoticiasResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default noticiasRoute;
