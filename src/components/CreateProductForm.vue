<template>
<div class="flex items-center justify-center p-12">
  <div class="mx-auto w-full max-w-[700px]">
    <form>
      <div class="mb-5">
        <label
          for="title"
          :class="{ hasError: formOptions.title.hasError }"
          class="mb-3 block text-base font-medium text-[#07074D]"
        >
          Title
        </label>
        <input
          v-model="product.title"
          type="text"
          placeholder="Product Title"
          class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
        />
      </div>
      <div class="mb-5">
        <label
          for="category"
          :class="{ hasError: formOptions.category.hasError }"
          class="mb-3 block text-base font-medium text-[#07074D]"
        >
          Category
        </label>
        <input
          v-model="product.category"
          type="text"
          placeholder="Product category"
          class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
        />
      </div>
      <div class="mb-5">
        <label
          for="price"
          :class="{ hasError: formOptions.price.hasError }"
          class="mb-3 block text-base font-medium text-[#07074D]"
        >
          Price
        </label>
        <input
          v-model.number="product.price"
          type="number"
          placeholder="Enter product price"
          class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
        />
      </div>
      <div class="mb-5">
        <label
          for="image"
          :class="{ hasError: formOptions.image.hasError }"
          class="mb-3 block text-base font-medium text-[#07074D]"
        >
          Image
        </label>
        <input
          v-model="product.image"
          type="text"
          placeholder="Product image link"
          class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
        />
      </div>
      <div class="mb-5">
        <label
          for="description"
          :class="{ hasError: formOptions.description.hasError }"
          class="mb-3 block text-base font-medium text-[#07074D]"
        >
          Description
        </label>
        <textarea
          v-model="product.description"
          rows="4"
          placeholder="Type product's description"
          class="w-full resize-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
        ></textarea>    
      </div>
      <div>
        <button
        @click.stop.prevent="addProduct()"
          class="hover:shadow-form rounded-md bg-[#6A64F1] py-3 px-8 text-base font-semibold text-white outline-none"
        >
          Submit
        </button>
      </div>
    </form>
  </div>
</div>
</template>
    
<script setup lang="ts">
import { useProductsStore } from '@/stores/products';   
import { ref, reactive, watch } from 'vue';
import { useRouter } from 'vue-router';

const store = useProductsStore();
const router = useRouter()

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

const hasError = reactive({
  active: true,
})

watch(product, validateForm, { deep: true });

const formOptions = reactive({
  title: { hasError: false },
  category: { hasError: false },
  price: { hasError: false },
  image: { hasError: false },
  description: { hasError: false }
});

function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch (_) {
    return false;
  }
}

function validateForm() {
  formOptions.title.hasError = product.value.title.length < 3;
  formOptions.category.hasError = !product.value.category;
  formOptions.price.hasError = product.value.price <= 0;
  formOptions.image.hasError = !isValidUrl(product.value.image);
  formOptions.description.hasError = product.value.description.length < 10;

  return !Object.values(formOptions).some(option => option.hasError);
}

function addProduct() {
  if (validateForm()) {
    store.addProduct(product.value);
    router.push('/product/' + product.value.id);
  } else {
    alert('Please correct the errors before submitting.');
  }
}
</script>

<style scoped>
.hasError{
  color: red;
}
</style>