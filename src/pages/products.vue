<template>
  <div>
    <h1>Products</h1>

    <!-- Add Product (Admin only) -->
    <div v-if="role === 'admin'">
      <form @submit.prevent="addProduct">
        <input v-model="newProduct.title" placeholder="Title" required />
        <input v-model="newProduct.description" placeholder="Description" required />
        <input type="number" v-model="newProduct.price" placeholder="Price" required />
        <button type="submit">Add Product</button>
      </form>
      <hr />
    </div>

    <!-- All Products -->
    <div v-if="products.length">
      <div v-for="product in products" :key="product._id" style="border:1px solid #ccc; padding:10px; margin:10px;">
        <h3>{{ product.title }}</h3>
        <p>{{ product.description }}</p>
        <p>{{ product.price }}</p>
        <button @click="getProductById(product._id)">View</button>

        <div v-if="role === 'admin'">
          <button @click="editProduct(product)">Edit</button>
          <button @click="deleteProduct(product._id)">Delete</button>
        </div>
      </div>
    </div>

    <!-- Single Product -->
    <div v-if="singleProduct">
      <h2>Product Details</h2>
      <p>{{ singleProduct.title }}</p>
      <p>{{ singleProduct.description }}</p>
      <p>{{ singleProduct.price }}</p>
    </div>

    <!-- Edit Form (Admin only) -->
    <div v-if="editMode && role === 'admin'">
      <h2>Edit Product</h2>
      <form @submit.prevent="updateProduct">
        <input v-model="editProductData.title" placeholder="Title" required />
        <input v-model="editProductData.description" placeholder="Description" required />
        <input type="number" v-model="editProductData.price" placeholder="Price" required />
        <button type="submit">Update</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

const API_URL = "https://gnsdevops.s-badge.com/log/products";
const token = localStorage.getItem("token");
const role = localStorage.getItem("role");

const products = ref([]);
const singleProduct = ref(null);
const newProduct = ref({ title: "", description: "", price: "" });
const editMode = ref(false);
const editProductData = ref({});
let editId = null;

// Get all products
const getProducts = async () => {
  const token = localStorage.getItem("token");
  console.log("Token:", token);

  const res = await axios.get(API_URL, {
   headers: { token }

  });

  console.log(res.data);
  products.value = res.data.products;
};


// Get product by ID
const getProductById = async (id) => {
  const res = await axios.get(`${API_URL}/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  singleProduct.value = res.data;
};

// Add product (Admin only)
const addProduct = async () => {
  await axios.post(API_URL, newProduct.value, {
    headers: { Authorization: `Bearer ${token}` }
  });
  newProduct.value = { title: "", description: "", price: "" };
  getProducts();
};

// Delete product (Admin only)
const deleteProduct = async (id) => {
  await axios.delete(`${API_URL}/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  getProducts();
};

// Edit producttt
const editProduct = (product) => {
  editMode.value = true;
  editProductData.value = { ...product };
  editId = product._id;
};

// Update product (Admin only)
const updateProduct = async () => {
  await axios.put(`${API_URL}/${editId}`, editProductData.value, {
    headers: { Authorization: `Bearer ${token}` }
  });
  editMode.value = false;
  getProducts();
};

onMounted(getProducts);
</script>
