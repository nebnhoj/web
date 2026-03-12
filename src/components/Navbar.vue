<script setup lang="ts">
import { computed, watch } from 'vue'
import { useI18n } from 'vue-i18n'

const { t, locale } = useI18n()

const navItems = computed(() => [
  { label: t('nav.about'), href: '#hero' },
  { label: t('nav.experience'), href: '#experience' },
  { label: t('nav.skills'), href: '#skills' },
  { label: t('nav.contact'), href: '#contact' },
  { label: t('nav.blog'), href: 'https://www.notion.so/JB-s-Blog-0451a703bfae82048db381ba3bdf3101' }

])

watch(
  locale,
  (nextLocale) => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('locale', nextLocale)
    }
  },
  { immediate: true }
)

if (typeof window !== 'undefined') {
  const savedLocale = window.localStorage.getItem('locale')

  if (savedLocale === 'en' || savedLocale === 'de') {
    locale.value = savedLocale
  }
}
</script>

<template>
  <header class="sticky top-0 z-50 border-b border-black/10 bg-[#cfe5ff]/90 backdrop-blur">
    <div class="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
      <a href="#top" class="rounded-full border-2 border-black bg-white px-4 py-2 text-sm font-black uppercase tracking-wide">
        John Ben Uera
      </a>

      <div class="flex items-center gap-2">
        <nav class="hidden gap-2 md:flex">
          <a
            v-for="item in navItems"
            :key="item.href"
            :href="item.href"
            class="rounded-full border-2 border-black bg-white px-4 py-2 text-sm font-bold transition-transform hover:-translate-y-1"
          >
            {{ item.label }}
          </a>
        </nav>

        <label class="flex items-center gap-2 rounded-full border-2 border-black bg-white px-3 py-2 text-xs font-bold">
          <span>{{ t('language.label') }}</span>
          <select v-model="locale" class="bg-transparent text-xs font-bold outline-none">
            <option value="en">{{ t('language.en') }}</option>
            <option value="de">{{ t('language.de') }}</option>
          </select>
        </label>
      </div>
    </div>
  </header>
</template>
