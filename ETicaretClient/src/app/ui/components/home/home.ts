import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { trigger, transition, style, animate } from '@angular/animations';

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice: number;
  image: string;
  emoji: string;
  rating: number;
  reviews: number;
  isNew: boolean;
  discount: number;
}

interface Category {
  name: string;
  emoji: string;
  description: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.scss',
  animations: [
    trigger('fadeInUp', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('0.6s ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ]),
    trigger('scaleIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0.9)' }),
        animate('0.5s ease-out', style({ opacity: 1, transform: 'scale(1)' }))
      ])
    ])
  ]
})
export class Home implements OnInit {
  featuredProducts = signal<Product[]>([]);
  categories = signal<Category[]>([]);
  selectedCategory = signal<string>('');
  currentSlide = signal(0);

  ngOnInit(): void {
    this.loadCategories();
    this.loadFeaturedProducts();
    this.startAutoSlide();
  }

  private loadCategories(): void {
    const categories: Category[] = [
      { name: 'Elektronik', emoji: '📱', description: 'Son teknoloji cihazlar' },
      { name: 'Moda', emoji: '👕', description: 'Stil ve Konfor' },
      { name: 'Ev & Bahçe', emoji: '🏠', description: 'Ev dekorasyon ürünleri' },
      { name: 'Spor', emoji: '⚽', description: 'Spor ve fitness' },
      { name: 'Kitaplar', emoji: '📚', description: 'Bilgi ve eğlence' }
    ];
    this.categories.set(categories);
  }

  private loadFeaturedProducts(): void {
    const products: Product[] = [
      {
        id: 1,
        name: 'Premium Kablosuz Kulaklık',
        price: 1299,
        originalPrice: 1799,
        emoji: '🎧',
        image: '🎧',
        rating: 4.8,
        reviews: 245,
        isNew: true,
        discount: 28
      },
      {
        id: 2,
        name: 'Akıllı Saat Pro',
        price: 1899,
        originalPrice: 2299,
        emoji: '⌚',
        image: '⌚',
        rating: 4.6,
        reviews: 189,
        isNew: true,
        discount: 17
      },
      {
        id: 3,
        name: 'USB-C Hub 7 Port',
        price: 299,
        originalPrice: 399,
        emoji: '🔌',
        image: '🔌',
        rating: 4.7,
        reviews: 156,
        isNew: false,
        discount: 25
      },
      {
        id: 4,
        name: 'Taşınabilir Şarj Cihazı',
        price: 599,
        originalPrice: 799,
        emoji: '🔋',
        image: '🔋',
        rating: 4.5,
        reviews: 312,
        isNew: false,
        discount: 25
      },
      {
        id: 5,
        name: 'Bluetooth Hoparlör',
        price: 799,
        originalPrice: 1099,
        emoji: '🔊',
        image: '🔊',
        rating: 4.9,
        reviews: 428,
        isNew: true,
        discount: 27
      },
      {
        id: 6,
        name: 'Phone Stand Ayarlanabilir',
        price: 199,
        originalPrice: 299,
        emoji: '📱',
        image: '📱',
        rating: 4.4,
        reviews: 87,
        isNew: false,
        discount: 33
      }
    ];
    this.featuredProducts.set(products);
  }

  private startAutoSlide(): void {
    setInterval(() => {
      this.currentSlide.update(current => (current + 1) % 3);
    }, 5000);
  }

  onCategoryClick(category: string): void {
    this.selectedCategory.set(category);
  }

  navigateToProducts(): void {
    // Router navigate to products would go here
  }

  addToBasket(product: Product): void {
    const basket = JSON.parse(localStorage.getItem('basket') || '[]');
    const existingItem = basket.find((item: any) => item.id === product.id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      basket.push({ ...product, quantity: 1 });
    }

    localStorage.setItem('basket', JSON.stringify(basket));
    // Show notification would go here
    console.log('Product added to basket:', product.name);
  }
}

