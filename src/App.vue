<template>
  <nav class="mt-2 flex gap-10 justify-center font-bold text-xl">
    <RouterLink to="/">Home</RouterLink>
    <RouterLink to="/products">Products</RouterLink>  
    <RouterLink to="/create-product">Create Product</RouterLink>  
  </nav>
  <main class="mt-2">
    <RouterView />
  </main>
</template>
