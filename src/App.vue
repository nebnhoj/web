<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import Navbar from './components/Navbar.vue'

const theme = ref<'light' | 'dark'>('light')

const applyTheme = (value: 'light' | 'dark') => {
  document.documentElement.setAttribute('data-theme', value)
}

const toggleTheme = () => {
  theme.value = theme.value === 'light' ? 'dark' : 'light'
}

onMounted(() => {
  const storedTheme = localStorage.getItem('theme')
  if (storedTheme === 'light' || storedTheme === 'dark') {
    theme.value = storedTheme
  } else {
    theme.value = 'light'
  }

  applyTheme(theme.value)
})

watch(theme, (value) => {
  applyTheme(value)
  localStorage.setItem('theme', value)
})
</script>

<template>
  <div id="top" class="min-h-screen bg-base-100 text-base-content">
    <Navbar :theme="theme" @toggle-theme="toggleTheme" />

    <main>
      <router-view />
    </main>

    <footer class="border-t border-base-300 bg-base-200 px-6 py-6 text-center text-sm font-semibold">
      <p>© {{ new Date().getFullYear() }} John Ben C. Uera · Software Engineer · Built with Vue + Vite</p>
    </footer>
  </div>
</template>
