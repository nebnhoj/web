<script setup lang="ts">
interface Props {
  theme: 'light' | 'dark'
}

defineProps<Props>()

const emit = defineEmits<{
  (e: 'toggle-theme'): void
}>()

const navItems = [
  { label: 'About', href: '#hero' },
  { label: 'Experience', href: '#experience' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' }
]
</script>

<template>
  <header class="sticky top-0 z-50 border-b border-base-300 bg-base-100/90 backdrop-blur">
    <div class="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
      <a href="#top" class="rounded-full border border-base-300 bg-base-100 px-4 py-2 text-sm font-black uppercase tracking-wide">
        John Ben Uera
      </a>

      <nav class="hidden gap-2 md:flex">
        <a
          v-for="item in navItems"
          :key="item.href"
          :href="item.href"
          class="rounded-full border border-base-300 bg-base-100 px-4 py-2 text-sm font-bold transition-transform hover:-translate-y-1"
        >
          {{ item.label }}
        </a>
      </nav>

      <button class="btn btn-sm" type="button" @click="emit('toggle-theme')">
        {{ theme === 'dark' ? 'Light' : 'Dark' }}
      </button>
    </div>
  </header>
</template>
