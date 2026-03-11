<script setup lang="ts">
 import Navbar from './components/Navbar.vue'
 import { SpeedInsights } from '@vercel/speed-insights/vue'
import Navbar from './components/Navbar.vue'
import { Analytics } from '@vercel/analytics/vue'
 
const currentYear = new Date().getFullYear()
</script>

<template>
  <div id="top" class="min-h-screen bg-[#eaf4ff] text-black">
    <Analytics />
    <Navbar  />

    <main>
      <router-view />
    </main>

    <footer class="border-t-2 border-black bg-[#cfe5ff] px-6 py-6 text-center text-sm font-semibold">
      <p>© {{ currentYear }} John Ben C. Uera · Software Engineer · Built with Vue + Vite</p>
    </footer>
    <SpeedInsights />
  </div>
</template>