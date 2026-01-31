import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';

const routes: Routes = [
  {
    'path': '',
    'component': MainLayoutComponent,
    'children': [
      {
        path: '',
        redirectTo: '/administration/dashboard',
        pathMatch: 'full'
      },
      {
        path: 'administration',
        children: [
          {
            path: 'dashboard',
            loadComponent: () => import('./features/adminstration/pages/dashboard/dashboard.component').then(m => m.DashboardComponent)
          },
          {
            path: 'settings',
            loadComponent: () => import('./features/adminstration/pages/settings/settings.component').then(m => m.SettingsComponent)
          }
        ]
      },
      {
        path: 'recipients',
        loadComponent: () => import('./features/recipients/pages/recipients/recipients.component').then(m => m.RecipientsComponent)
      }
    ]


  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
