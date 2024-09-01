<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
    <div class="flex flex-col md:flex-row -mx-4" v-if="product">
      <div class="md:flex-1 px-4">
        <div>
          <div class="h-64 md:h-80 rounded-lg bg-gray-100 mb-4">
            <div class="h-64 md:h-80 rounded-lg bg-gray-100 mb-4 flex items-center justify-center">
              <img class="size-80 object-contain mb-2" :src="product.image" alt="product image" />
            </div>
          </div>
        </div>
      </div>
      <div class="md:flex-1 px-4 mt-2">
        <h2 class="mb-2 leading-tight tracking-tight font-bold text-gray-800 text-2xl md:text-3xl">{{ product.title }}</h2>
        <p class="text-sm text-indigo-600 hover:underline">{{ product.category }}</p>
        <div class="flex items-center space-x-4 my-4">
          <div>
            <div class="rounded-lg bg-gray-100 flex py-2 px-3">
              <span class="text-indigo-400 mr-1 mt-1">$</span>
              <span class="font-bold text-indigo-600 text-3xl">{{ product.price }}</span>
            </div>
          </div>  
          <div class="flex-1">
            <p class="text-green-500 text-xl font-semibold">Save 12%</p>
            <p class="text-gray-400 text-sm">Inclusive of all Taxes.</p>
          </div>
          <div class="flex-1">
            <p class="text-xl font-semibold" :class="activeColor">{{ product.rating.rate }}</p>
            <p class="text-gray-400 text-sm">{{ product.rating.count }}</p>     
          </div>
        </div>

        <p class="text-gray-500">{{ product.description }}</p>

        <div class="flex py-4 space-x-4">
          <div class="relative">
            <div class="text-center left-0 pt-2 right-0 absolute block text-xs uppercase text-gray-400 tracking-wide font-semibold">Qty</div>
            <select class="cursor-pointer appearance-none rounded-xl border border-gray-200 pl-4 pr-8 h-14 flex items-end pb-1">
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
            </select>

            <svg class="w-5 h-5 text-gray-400 absolute right-0 bottom-0 mb-2 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
            </svg>
          </div>

          <button @click="goBackToProducts()" class="h-14 px-6 py-2 font-semibold rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white">
            Add to Cart
          </button>
          <button @click="editProduct()" class="h-14 px-6 py-2 font-semibold rounded-xl bg-green-600 hover:bg-green-500 text-white">
            Edit Product
          </button>
        </div>
      </div>
    </div>
    <div v-else class="flex justify-center mt-2">Такого продукта нет</div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useProductsStore } from '@/stores/products';

const route = useRoute();
const router = useRouter();
const store = useProductsStore();

const productId = computed(() => Number(route.params.id));
const activeColor = ref('red');

const product = computed(() => store.products.find((p) => p.id === productId.value));

function goBackToProducts() {
  router.push('/products');
}

function editProduct() {
  if (product.value) {
    router.push({ name: 'editProduct', params: { id: productId.value } });
  }
}

watch(product, (newProduct) => {
  if (newProduct?.rating.rate) {
    if (newProduct.rating.rate < 2.5) {
      activeColor.value = 'text-red-500';
    } else if (newProduct.rating.rate < 4) {
      activeColor.value = 'text-yellow-500';
    } else {
      activeColor.value = 'text-green-500';
    }
  }
}, { immediate: true });
</script>
