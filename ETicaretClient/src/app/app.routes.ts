import { Routes } from '@angular/router';

import { LayoutComponent } from './admin/layout/layout';

export const routes: Routes = [

  {
    path: 'admin',
    component: LayoutComponent,
    children: [
      { path: '', loadComponent: () => import('./admin/components/dashboard/dashboard').then(m => m.Dashboard) },
      { path: 'products', loadComponent: () => import('./admin/components/products/products').then(m => m.Products) },
      { path: 'orders', loadComponent: () => import('./admin/components/orders/orders').then(m => m.Orders) },
      { path: 'customers', loadComponent: () => import('./admin/components/customers/customers').then(m => m.Customers) },
      { path: 'payments', loadComponent: () => import('./admin/components/payments/payments').then(m => m.Payments) },
      { path: 'addresses', loadComponent: () => import('./admin/components/addresses/addresses').then(m => m.Addresses) }
    ]
  },

  // Default yönlendirme
  { path: '', redirectTo: 'admin', pathMatch: 'full' }
];
