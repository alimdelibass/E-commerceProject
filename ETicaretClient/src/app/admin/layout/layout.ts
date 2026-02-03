import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './components/header/header';
import { Sidebar } from "./components/sidebar/sidebar";
import { Footer } from './components/footer/footer';
import { MatSidenavModule, MatDrawer, MatDrawerContainer, MatDrawerContent } from '@angular/material/sidenav';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [Header, RouterOutlet, Sidebar, Footer, MatDrawer, MatDrawerContainer, MatDrawerContent],
  templateUrl: './layout.html',
  styleUrl: './layout.scss'
})
export class LayoutComponent {}
