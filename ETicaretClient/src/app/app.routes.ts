import { Routes } from '@angular/router';

import { LayoutComponent } from './admin/layout/layout';
import { UILayoutComponent } from './ui/layout/ui-layout.component';

export const routes: Routes = [
  // UI Routes (Varsayılan)
  {
    path: '',
    component: UILayoutComponent,
    children: [
      { path: '', loadComponent: () => import('./ui/components/home/home').then(m => m.Home) },
      { path: 'products', loadComponent: () => import('./ui/components/products/products').then(m => m.Products) },
      { path: 'basket', loadComponent: () => import('./ui/components/baskets/baskets').then(m => m.Baskets) }
    ]
  },

  // Admin Routes
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
  }
];
