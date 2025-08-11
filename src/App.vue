<template>
  <div>
    <nav>
      <router-link to="/signup">Sign Up</router-link> |
      <router-link to="/signin">Sign In</router-link> |
      <router-link to="/products">Products</router-link>
    </nav>
    <router-view />
  </div>
</template>

<style>
nav {
  padding: 10px;
  background: #eee;
}
nav a {
  margin: 0 10px;
}
</style>
