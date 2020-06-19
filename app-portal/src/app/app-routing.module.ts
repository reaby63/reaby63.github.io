import { AppModule } from './app.module';
import { CmsComponent } from './cms/cms.component';
import { NgModule, Type, ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GridComponent } from './grid/grid.component';
import { ModuleComponent } from './module/module.component';


const routes: Routes = [
  { path: 'cms', component: CmsComponent },
  { path: 'grid', component: GridComponent },
  { path: 'module', component: ModuleComponent },

  {
    path: 'module/sample',
    loadChildren: () => import('app-sample').then((m) => m.SampleModule),
  },

  {
    path: 'module/salary',
    loadChildren: () => import('app-salary').then((m) => m.SalaryModule),
  },


];

// const importsArray: any[] | Type<any> | ModuleWithProviders<{}> = [
//   RouterModule.forRoot(routes)
// ];


// importsArray.push(SampleModule);


@NgModule({
  imports: [RouterModule.forRoot(routes, {enableTracing: false})],
  exports: [RouterModule],
})

export class AppRoutingModule {}
