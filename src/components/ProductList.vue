<script setup lang="ts">
import { useProductsStore } from '@/stores/products';
import { onMounted, computed, ref } from 'vue';
import { useRouter } from 'vue-router';

const store = useProductsStore();
const router = useRouter();

const itemsPerPage = 10;
const currentPage = ref(1);

const totalPages = computed(() => Math.ceil(store.productsToShow.length / itemsPerPage));

const paginatedProducts = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return store.productsToShow.slice(start, end);
});

function goToProductPage(id: number) {
  router.push({ name: 'productDetails', params: { id } });
}

function nextPage() {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
}

function prevPage() {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
}

onMounted(() => {
  if (store.products.length === 0) {
    store.fetchProducts();
  }
});
</script>

<template>
  <div class="products">
    <div class="flex justify-center bg-gray-100 select-none">
      <div class="flex justify-center flex-wrap gap-4 mx-auto px-4">
        <div
          v-for="product in paginatedProducts"
          :key="product.id"
          @click="goToProductPage(product.id)"
          class=" max-w-xs max-h-96 w-full cursor-pointer rounded-lg bg-white p-2 shadow duration-150 hover:scale-105 hover:shadow-md"
        > 
          <div class="icon" @click.stop="store.removeProduct(product.id)">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6 ml-auto mr-2">
              <path fill-rule="evenodd" d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
            </svg>
          </div>
          <div class="h-48 w-full overflow-hidden">
            <img  
              class="h-full w-full object-contain object-center"
              :src="product.image"
              alt="product"
            />
          </div>
          <p class="title my-4 pl-4 font-bold text-gray-500">{{ product.title }}</p>
          <p class="mb-4 ml-4 text-xl font-semibold text-gray-800">{{ product.price }}$</p>
          <div class="likeIcon size-8 ml-auto mr-2" @click.stop="store.changeLikeStatus(product.id)">
            <svg
              v-if="!product.liked"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor" 
            >
              <path
                d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z"
              />
            </svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M7.493 18.5c-.425 0-.82-.236-.975-.632A7.48 7.48 0 0 1 6 15.125c0-1.75.599-3.358 1.602-4.634.151-.192.373-.309.6-.397.473-.183.89-.514 1.212-.924a9.042 9.042 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75A.75.75 0 0 1 15 2a2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H14.23c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23h-.777ZM2.331 10.727a11.969 11.969 0 0 0-.831 4.398 12 12 0 0 0 .52 3.507C2.28 19.482 3.105 20 3.994 20H4.9c.445 0 .72-.498.523-.898a8.963 8.963 0 0 1-.924-3.977c0-1.708.476-3.305 1.302-4.666.245-.403-.028-.959-.5-.959H4.25c-.832 0-1.612.453-1.918 1.227Z" />
            </svg>
          </div>
        </div>
      </div>
    </div>
    <nav class="flex justify-center mt-4">
      <ul class="inline-flex -space-x-px cursor-pointer">
        <li>
          <div @click="prevPage()"
            class="bg-white border border-gray-300 text-gray-500 hover:bg-gray-100 hover:text-gray-700 ml-0 rounded-l-lg leading-tight py-2 px-3">
            Previous
          </div>
        </li>
        
        <li v-for="page in totalPages" :key="page">
          <div @click="currentPage = page"
            class="bg-white border border-gray-300 text-gray-500 hover:bg-gray-100 hover:text-gray-700 leading-tight py-2 px-3">
            {{ page }}
          </div>
        </li>
        
        <li>
          <div @click="nextPage()"
            class="bg-white border border-gray-300 text-gray-500 hover:bg-gray-100 hover:text-gray-700 rounded-r-lg leading-tight py-2 px-3">
            Next
          </div>
        </li>
      </ul>
    </nav>
  </div>
</template>

<style scoped>
.title {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    line-clamp: 1;    
    overflow: hidden;
}
</style>
