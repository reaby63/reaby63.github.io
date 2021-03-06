import { CmsComponent } from './cms/cms.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GridComponent } from './grid/grid.component';
import { ModuleComponent } from './module/module.component';
import { ArticleComponent } from './article/article.component';
import { ModuleListComponent } from './module-list/module-list.component';

const routes: Routes = [
  { path: '', component: ArticleComponent },
  { path: 'cms', component: CmsComponent },
  { path: 'grid', component: GridComponent },
  { path: 'module', component: ModuleComponent },
  { path: 'modulelist', component: ModuleListComponent },

  {
    path: 'module/sample',
    loadChildren: () => import('app-sample').then((m) => m.SampleModule),
  },

  {
    path: 'module/salary',
    loadChildren: () => import('app-salary').then((m) => m.SalaryModule),
  },

  {
    path: 'module/portal-calendar',
    loadChildren: () =>
      import('lib-portal-calendar').then((m) => m.LibPortalCalendarModule),
  },
  {
    path: 'module/portal-member',
    loadChildren: () =>
      import('lib-portal-member').then((m) => m.LibPortalMemberModule),
  },
  {
    path: 'authentication/code',
    loadChildren: () =>
      import('alle-authentication').then((m) => m.AuthenticationModule),
  },

  // {
  //   path: 'module/portal-msg',
  //   loadChildren: () =>
  //     import('lib-portal-msg').then((m) => m.LibPortalMsgModule),
  // },
];

// const importsArray: any[] | Type<any> | ModuleWithProviders<{}> = [
//   RouterModule.forRoot(routes)
// ];

// importsArray.push(SampleModule);

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: false })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
