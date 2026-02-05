import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './components/header/header';
import { Sidebar } from "./components/sidebar/sidebar";
import { Footer } from './components/footer/footer';
import { MatDrawer, MatDrawerContainer, MatDrawerContent } from '@angular/material/sidenav';
import { Alertify, messageType } from '../../services/admin/alertify';


@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet, Header, Sidebar, Footer, MatDrawer, MatDrawerContainer, MatDrawerContent],
  templateUrl: './layout.html',
  styleUrl: './layout.scss'
})
export class LayoutComponent implements OnInit {
  constructor(private alertify: Alertify) {}
  ngOnInit(): void {
    this.alertify.massage("Layout component initialized", messageType.Success);
  }
}