<template>
  <div class="container" v-if="product">
    <h2>{{ product.title }}</h2>
    <p>{{ product.description }}</p>
    <p>Price: {{ product.price }}$</p>
    <router-link to="/products">⬅ Back to Products</router-link>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { useRoute } from "vue-router";

const API = "http://localhost:5000/api/products"; // غيّرها لرابط السيرفر

const route = useRoute();
const product = ref(null);

onMounted(async () => {
  const id = route.params.id;
  const res = await axios.get(`${API}/${id}`);
  product.value = res.data;
});
</script>
