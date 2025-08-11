// router/index.js
import { createRouter, createWebHistory } from "vue-router";
import LandingPage from "../pages/LandingPage.vue";
import SignUp from "../pages/Signup.vue";
import Products from "../pages/products.vue";
import SignIn from "../pages/signin.vue";

const routes = [
  { path: "/", component: LandingPage },
  { path: "/signin", component: SignIn },
  { path: "/signup", component: SignUp },
  { path: "/products", component: Products, meta: { requiresAuth: true } }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

// Auth Guard
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("token");
  if (to.meta.requiresAuth && !token) {
    next("/signin");
  } else {
    next();
  }
});

export default router;
