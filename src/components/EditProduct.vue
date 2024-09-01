<template>
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
      <h1 class="text-2xl font-bold mb-4">Edit Product</h1>
      <form @submit.prevent="updateProduct" class="space-y-4">
        <div>
          <label for="title" class="block text-sm font-medium text-gray-700">Title</label>
          <input v-model="product.title" type="text" id="title" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm border p-1" required />
        </div>
        <div>
          <label for="category" class="block text-sm font-medium text-gray-700">Category</label>
          <input v-model="product.category" :step="0.01" type="text" id="category" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm border p-1" required />
        </div>
        <div>
          <label for="price" class="block text-sm font-medium text-gray-700">Price</label>
          <input v-model="product.price" :step="0.01" type="number" id="price" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm border p-1" required />
        </div>
        <div>
          <label for="description" class="block text-sm font-medium text-gray-700">Description</label>
          <textarea v-model="product.description" id="description" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm border p-1" rows="4" required></textarea>
        </div>
        <button type="submit" class="px-6 py-2 font-semibold rounded-xl bg-blue-600 hover:bg-blue-500 text-white">
          Save Changes
        </button>
      </form>
    </div>
</template>
  
<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useProductsStore } from '@/stores/products';

const route = useRoute();
const router = useRouter();
const store = useProductsStore();

const productId = Number(route.params.id);

const product = ref({
    id: store.products.length+1,
    title: "",
    price: 0,
    image: "",
    category: "",
    description: "",
    rating: {
        count: 0,
        rate: 0
    },
    liked: false
});
  
onMounted(() => {
const existingProduct = store.products.find(p => p.id === productId);
if (existingProduct) {
    product.value = { ...existingProduct };
} else {
    router.push('/products');
}
});
  
function updateProduct() {
    const updatedProduct = { ...product.value, id: productId };
    store.updateProduct(updatedProduct);
    router.push('/products');
}
</script>
