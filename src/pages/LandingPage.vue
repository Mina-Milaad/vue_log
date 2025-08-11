<template>
  <div class="landing-container">
    <h1>Welcome to Our Store 🛒</h1>
    <p>Sign in to explore our products or create an account to start shopping!</p>

    <div class="btn-group">
      <router-link to="/signin" class="btn">Sign In</router-link>
      <router-link to="/signup" class="btn btn-outline">Sign Up</router-link>
    </div>
  </div>
</template>

<script setup>
// No script logic needed here
</script>

<style scoped>
.landing-container {
  text-align: center;
  padding: 50px;
}

h1 {
  font-size: 2.5rem;
  margin-bottom: 15px;
}

p {
  font-size: 1.2rem;
  color: #666;
  margin-bottom: 25px;
}

.btn-group {
  display: flex;
  justify-content: center;
  gap: 15px;
}

.btn {
  background-color: #007bff;
  color: white;
  padding: 10px 18px;
  border-radius: 5px;
  text-decoration: none;
}

.btn:hover {
  background-color: #0056b3;
}

.btn-outline {
  background-color: transparent;
  color: #007bff;
  border: 2px solid #007bff;
}

.btn-outline:hover {
  background-color: #007bff;
  color: white;
}
</style>
