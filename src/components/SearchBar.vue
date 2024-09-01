<template>
    <div class="flex justify-center gap-5 items-baseline">
        <div 
            @click="store.toggleShowLikedOnly" 
            class="font-bold text-blue-700 underline underline-offset-4 cursor-pointer select-none">
            Показывать только избранное
        </div>    
        <div class="basis 3/5 mb-2 w-2/5">
            <form class="flex items-center" @submit.prevent="updateSearch">
                <label for="simple-search" class="sr-only">Search</label>
                <div class="relative w-full">
                    <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                    <svg class="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path>
                    </svg>
                    </div>
                    <input 
                    v-model="searchString" 
                    type="text" 
                    id="simple-search" 
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5" 
                    placeholder="Search" 
                    required>
                </div>
            </form>
        </div>
        <div class="w-1/5">
            <Filters></Filters>
        </div>
    </div>
    <div v-if="store.showLikedOnly && store.productsToShow.length === 0" class="mt-2 flex items-center flex-col">
        Не найдено продуктов по текущему запросу
        <div @click="store.toggleShowLikedOnly" class="text-blue-700 underline underline-offset-4 cursor-pointer select-none">
            Вернуться к списку продуктов
        </div>
    </div>
</template>
  

<script setup lang="ts">
import Filters from './Filters.vue';
import { useProductsStore } from '@/stores/products';
import { ref, watch } from 'vue';

const store = useProductsStore();
const searchString = ref(store.searchString); // Bind the search string to the store

watch(searchString, (newVal) => {
  store.setSearchString(newVal);
});

function updateSearch() {
  store.setSearchString(searchString.value);
}
</script>
