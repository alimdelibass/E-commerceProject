import { Component, OnInit, HostListener, signal } from '@angular/core';
import { RouterLink, Router, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ui-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './ui-header.component.html',
  styleUrl: './ui-header.scss'
})
export class UIHeaderComponent implements OnInit {
  isScrolled = signal(false);
  isMenuOpen = signal(false);
  basketCount = signal(0);

  constructor(private router: Router) {}

  ngOnInit(): void {
    const savedBasket = localStorage.getItem('basket');
    if (savedBasket) {
      this.basketCount.set(JSON.parse(savedBasket).length);
    }
  }

  @HostListener('window:scroll')
  onWindowScroll(): void {
    this.isScrolled.set(window.scrollY > 10);
  }

  toggleMenu(): void {
    this.isMenuOpen.update(value => !value);
  }

  closeMenu(): void {
    this.isMenuOpen.set(false);
  }

  navigateTo(path: string): void {
    this.closeMenu();
    this.router.navigate([path]);
  }

  goToAdmin(): void {
    this.closeMenu();
    this.router.navigate(['/admin']);
  }
}
