<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import Navbar from './components/Navbar.vue'

const theme = ref<'light' | 'dark'>('light')

const applyTheme = (value: 'light' | 'dark') => {
  if (typeof document !== 'undefined') {
    document.documentElement.setAttribute('data-theme', value)
  }
}

const toggleTheme = () => {
  theme.value = theme.value === 'light' ? 'dark' : 'light'
}

onMounted(() => {
  const storedTheme = typeof localStorage !== 'undefined'
    ? localStorage.getItem('theme')
    : null

  if (storedTheme === 'light' || storedTheme === 'dark') {
    theme.value = storedTheme
  } else {
    theme.value = 'light'
  }

  applyTheme(theme.value)
})

watch(theme, (value) => {
  applyTheme(value)
  if (typeof localStorage !== 'undefined') {
    localStorage.setItem('theme', value)
  }
})

const currentYear = new Date().getFullYear()
</script>

<template>
  <div id="top" class="min-h-screen bg-[#eaf4ff] text-black">
    <Navbar :theme="theme" @toggle-theme="toggleTheme" />

    <main>
      <router-view />
    </main>

    <footer class="border-t-2 border-black bg-[#cfe5ff] px-6 py-6 text-center text-sm font-semibold">
      <p>© {{ currentYear }} John Ben C. Uera · Software Engineer · Built with Vue + Vite</p>
    </footer>
  </div>
</template>