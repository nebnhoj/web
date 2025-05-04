import { createRouter, createWebHistory } from 'vue-router'
import Home from './pages/Home.vue'
import About from './pages/About.vue'
import Experience from './pages/Experience.vue'
import Projects from './pages/Projects.vue'
import Contact from './pages/Contact.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/about', component: About },
  { path: '/experience', component: Experience },
  { path: '/projects', component: Projects },
  { path: '/contact', component: Contact }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router