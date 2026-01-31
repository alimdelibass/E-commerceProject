import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './components/header/header';
import { Sidebar } from "./components/sidebar/sidebar";
import { Footer } from './components/footer/footer';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [Header, RouterOutlet, Sidebar,Footer],
  templateUrl: './layout.html',
  styleUrl: './layout.scss'
})
export class Layout {}
