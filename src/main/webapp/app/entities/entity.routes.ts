import { Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'authority',
    data: { pageTitle: 'proyectoJhipsterApp.adminAuthority.home.title' },
    loadChildren: () => import('./admin/authority/authority.routes'),
  },
  {
    path: 'region',
    data: { pageTitle: 'proyectoJhipsterApp.region.home.title' },
    loadChildren: () => import('./region/region.routes'),
  },
  {
    path: 'country',
    data: { pageTitle: 'proyectoJhipsterApp.country.home.title' },
    loadChildren: () => import('./country/country.routes'),
  },
  {
    path: 'noticias',
    data: { pageTitle: 'proyectoJhipsterApp.noticias.home.title' },
    loadChildren: () => import('./noticias/noticias.routes'),
  },
  {
    path: 'location',
    data: { pageTitle: 'proyectoJhipsterApp.location.home.title' },
    loadChildren: () => import('./location/location.routes'),
  },
  {
    path: 'department',
    data: { pageTitle: 'proyectoJhipsterApp.department.home.title' },
    loadChildren: () => import('./department/department.routes'),
  },
  {
    path: 'task',
    data: { pageTitle: 'proyectoJhipsterApp.task.home.title' },
    loadChildren: () => import('./task/task.routes'),
  },
  {
    path: 'employee',
    data: { pageTitle: 'proyectoJhipsterApp.employee.home.title' },
    loadChildren: () => import('./employee/employee.routes'),
  },
  {
    path: 'job',
    data: { pageTitle: 'proyectoJhipsterApp.job.home.title' },
    loadChildren: () => import('./job/job.routes'),
  },
  {
    path: 'job-history',
    data: { pageTitle: 'proyectoJhipsterApp.jobHistory.home.title' },
    loadChildren: () => import('./job-history/job-history.routes'),
  },
  /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
];

export default routes;
