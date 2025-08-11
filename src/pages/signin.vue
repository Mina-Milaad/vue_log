<template>
  <div>
    <h1>Sign In</h1>
    <form @submit.prevent="signin">
      <input type="email" v-model="form.email" placeholder="Email" required />
      <input type="password" v-model="form.password" placeholder="Password" required />
      <button type="submit">Sign In</button>
    </form>
    <p v-if="message">{{ message }}</p>
  </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

const router = useRouter();
const form = ref({ email: "", password: "" });
const message = ref("");

const signin = async () => {
  try {
    const res = await axios.post("https://gnsdevops.s-badge.com/log/auth/signin", form.value);
    const { token, role } = res.data;

    // Save token & role
    localStorage.setItem("token", token);
    localStorage.setItem("role", role);

    message.value = "Login successful!";
    router.push("/products");
  } catch (err) {
    message.value = err.response?.data?.message || "Signin failed";
  }
};
</script>
