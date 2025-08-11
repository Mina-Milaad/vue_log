<template>
  <div>
    <h1>Sign Up</h1>
    <form @submit.prevent="signup">
      <input v-model="form.userName" placeholder="User Name" required />
      <input type="email" v-model="form.email" placeholder="Email" required />
      <input type="password" v-model="form.password" placeholder="Password" required />
      <button type="submit">Sign Up</button>
    </form>
    <p v-if="message">{{ message }}</p>
  </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";

const form = ref({ userName: "", email: "", password: "" });
const message = ref("");

const signup = async () => {
  try {
    const res = await axios.post("https://gnsdevops.s-badge.com/log/auth/signup", form.value);
    message.value = "Account created successfully!";
    form.value = { userName: "", email: "", password: "" };
  } catch (err) {
    message.value = err.response?.data?.message || "Signup failed";
  }
};
</script>
