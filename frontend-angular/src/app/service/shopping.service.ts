import { Injectable } from '@angular/core';
import { ShoppingProduct } from '../models/shopping-product.model';

@Injectable({
  providedIn: 'root'
})
export class ShoppingService {
  private products: ShoppingProduct[] = [];

  constructor() { }

  addProduct(shoppingProduct: ShoppingProduct): ShoppingProduct {
    this.products.push(shoppingProduct);
    return shoppingProduct;
  }

  removeProduct(id: string): void {
    this.products = this.products.filter(product => product.id !== id);
  }

  editProduct(id: string, updatedProduct: Partial<ShoppingProduct>): ShoppingProduct | null {
    const product = this.products.find(product => product.id === id);
    if (product) {
      Object.assign(product, updatedProduct);
      return product;
    }
    return null;
  }

  getProducts(): ShoppingProduct[] {
    return this.products;
  }

  getProductById(id: string): ShoppingProduct | null {
    return this.products.find(product => product.id === id) || null;
  }
}