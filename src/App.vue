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
    theme.value = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  }

  applyTheme(theme.value)
})

watch(theme, (value) => {
  applyTheme(value)
  localStorage.setItem('theme', value)
})
</script>

<template>
  <div class="min-h-screen bg-base-100 text-base-content">
    <Navbar :theme="theme" @toggle-theme="toggleTheme" />

    <main class="mx-auto max-w-5xl px-6 py-10">
      <router-view />
    </main>

    <footer class="border-t border-base-300 p-6 text-center text-sm text-base-content/70">
      <p>© 2025 John Ben C. Uera</p>
    </footer>
  </div>
</template>
