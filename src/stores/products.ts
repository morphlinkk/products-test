import ProductCreationView from '@/views/ProductCreationView.vue';
import { defineStore } from 'pinia';

export const useProductsStore = defineStore('products', {
  state: () => ({
    products: [] as { id: number; title: string; price: number; image: string; category: string; description: string; rating: { count: number; rate: number }; liked: boolean }[],
    showLikedOnly: false,
    searchString: "",
    minPrice: 0,
    maxPrice: 1000,
  }),
  getters: {
    getLikedProducts: (state) => state.products.filter((product) => product.liked === true),
    productsToShow(state): { id: number; title: string; price: number; image: string; liked: boolean }[] {
      let filteredProducts = state.products;

      if (state.searchString) {
        filteredProducts = filteredProducts.filter((product) =>
          product.title.toLowerCase().includes(state.searchString.toLowerCase())
        );
      }

      if (state.showLikedOnly) {
        filteredProducts = filteredProducts.filter((product) => product.liked);
      }

      filteredProducts = filteredProducts.filter((product) =>
        product.price >= state.minPrice && product.price <= state.maxPrice
      );
      
      return filteredProducts;
    },
  },
  actions: {
    async fetchProducts() {
      try {
        const response = await fetch('https://fakestoreapi.com/products');
        const data = await response.json();
        this.products = data.map((product: {
          id: number;
          title: string;
          price: number;
          image: string;
          category: string;
          description: string;
          rating: { count: number; rate: number };
        }) => ({
          ...product, liked: false
        }));
      } catch (error) {
        console.error('Failed to fetch products:', error);
      }
    },
    addProduct(product: { id: number; title: string; price: number; image: string; category: string; description: string; rating: { count: number; rate: number }; liked: boolean }) {
      this.products.push(product);
    },
    updateProduct(updatedProduct: { id: number; title?: string; price?: number; image?: string; category?: string; description?: string; rating?: { count: number; rate: number }; liked?: boolean }) {
      const productIndex = this.products.findIndex(product => product.id === updatedProduct.id);
    
      if (productIndex !== -1) {
        this.products[productIndex] = {
          ...this.products[productIndex],
          ...updatedProduct
        };
      } else {
        console.error('Product not found');
      }
    },
    removeProduct(id: number) {
      this.products = this.products.filter(product => product.id !== id);
    },
    changeLikeStatus(id: number) {
      const product = this.products.find(product => product.id === id);
      if (product) {
        product.liked = !product.liked;
      }
    },
    toggleShowLikedOnly() {
      this.showLikedOnly = !this.showLikedOnly;
    },
    setSearchString(searchString: string) {
      this.searchString = searchString;
    },
    setMinPrice(minPrice: number) {
      this.minPrice = minPrice;
    },
    setMaxPrice(maxPrice: number) {
      this.maxPrice = maxPrice;
    },
  },
}); 