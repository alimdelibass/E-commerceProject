import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { Header } from './components/header/header';
import { Sidebar } from './components/sidebar/sidebar';
import { Footer } from './components/footer/footer';

import { MatDrawer, MatDrawerContainer, MatDrawerContent } from '@angular/material/sidenav';

import { AlertifyService, MessageType, Position } from '../../services/admin/alertify';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    RouterOutlet,
    Header,
    Sidebar,
    Footer,
    MatDrawer,
    MatDrawerContainer,
    MatDrawerContent
  ],
  templateUrl: './layout.html',
  styleUrl: './layout.scss'
})
export class LayoutComponent implements OnInit {
  constructor(private alertify: AlertifyService) {}

  ngOnInit(): void {
    this.alertify.message('Layout component initialized', MessageType.Success, {
      delaySeconds: 1,
      position: Position.TopRight
    });
  }
}
