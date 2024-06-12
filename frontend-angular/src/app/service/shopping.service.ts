import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ShoppingService {
  private products: Product[] = [];

  constructor() { }

  addProduct(Product: Product): Product {
    this.products.push(Product);
    return Product;
  }

  removeProduct(id: number): void {
    this.products = this.products.filter(product => product.id !== id);
  }

  editProduct(id: number, updatedProduct: Partial<Product>): Product | null {
    const product = this.products.find(product => product.id === id);
    if (product) {
      Object.assign(product, updatedProduct);
      return product;
    }
    return null;
  }

  getProducts(): Product[] {
    return this.products;
  }

  getProductById(id: number): Product | null {
    return this.products.find(product => product.id === id) || null;
  }
}