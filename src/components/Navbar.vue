<script setup lang="ts">
interface Props {
  theme: 'light' | 'dark'
}

const props = defineProps<Props>()
const emit = defineEmits<{
  (e: 'toggle-theme'): void
}>()
</script>

<template>
  <div class="navbar border-b border-base-300 bg-base-100 text-base-content">
    <div class="flex-1">
      <router-link class="btn btn-ghost text-xl" to="/">John Ben</router-link>
    </div>

    <div class="flex items-center gap-2">
      <ul class="menu menu-horizontal px-1">
        <li><router-link to="/">Home</router-link></li>
        <li><router-link to="/about">About</router-link></li>
        <li><router-link to="/experience">Experience</router-link></li>
        <li><router-link to="/projects">Projects</router-link></li>
        <li><router-link to="/contact">Contact</router-link></li>
      </ul>

      <button class="btn btn-sm btn-outline" type="button" @click="emit('toggle-theme')">
        {{ props.theme === 'dark' ? '☀️ Light' : '🌙 Dark' }}
      </button>
    </div>
  </div>
</template>
