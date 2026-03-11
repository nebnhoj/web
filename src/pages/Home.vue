<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'

const scrollY = ref(0)

const onScroll = () => {
  scrollY.value = window.scrollY
}

onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
})

const heroBubbleStyle = computed(() => ({
  transform: `translateY(${scrollY.value * 0.18}px)`
}))

const midBubbleStyle = computed(() => ({
  transform: `translateY(${scrollY.value * -0.12}px)`
}))

const floatingCardStyle = computed(() => ({
  transform: `translateY(${scrollY.value * 0.08}px)`
}))

const features = [
  'Playful rounded components and pill-based actions',
  'High-contrast typography with black-on-blue clarity',
  'Interactive parallax motion that responds to scrolling'
]
</script>

<template>
  <div class="relative overflow-hidden">
    <div class="pointer-events-none absolute inset-0">
      <div class="absolute -left-28 top-20 h-64 w-64 rounded-full bg-[#9fd0ff]" :style="heroBubbleStyle" />
      <div class="absolute right-0 top-[420px] h-72 w-72 rounded-full bg-[#b8dcff]" :style="midBubbleStyle" />
      <div class="absolute left-1/2 top-[880px] h-80 w-80 -translate-x-1/2 rounded-full bg-[#7fc1ff] opacity-70" :style="heroBubbleStyle" />
    </div>

    <section class="relative mx-auto flex min-h-[80vh] max-w-6xl flex-col justify-center px-6 py-16" id="story">
      <p class="mb-4 inline-block w-fit rounded-full border-2 border-black bg-white px-4 py-2 text-xs font-black uppercase tracking-[0.15em]">
        One-page experience
      </p>
      <h1 class="max-w-4xl text-5xl font-black leading-tight sm:text-7xl">
        Bubble-inspired website with lively motion and instant personality.
      </h1>
      <p class="mt-6 max-w-2xl text-lg font-medium">
        This page captures Klarna-style Bubble energy: oversized curves, bold labels, playful blue gradients, and a smooth parallax story from top to bottom.
      </p>
      <div class="mt-8 flex flex-wrap gap-3">
        <a href="#features" class="rounded-full border-2 border-black bg-black px-6 py-3 font-bold text-white">See Features</a>
        <a href="#contact" class="rounded-full border-2 border-black bg-white px-6 py-3 font-bold">Book a Demo</a>
      </div>
    </section>

    <section id="features" class="relative mx-auto max-w-6xl px-6 py-20">
      <div class="grid gap-6 md:grid-cols-3">
        <article
          v-for="feature in features"
          :key="feature"
          class="rounded-[2rem] border-2 border-black bg-white p-6 shadow-[6px_6px_0_0_#000]"
          :style="floatingCardStyle"
        >
          <h2 class="mb-3 text-xl font-black">Bubble Feature</h2>
          <p class="font-medium">{{ feature }}</p>
        </article>
      </div>
    </section>

    <section id="roadmap" class="relative mx-auto max-w-6xl px-6 py-20">
      <div class="rounded-[2.5rem] border-2 border-black bg-[#cfe5ff] p-8">
        <h2 class="text-3xl font-black">Interactive Roadmap</h2>
        <div class="mt-8 grid gap-4 md:grid-cols-3">
          <div class="rounded-3xl border-2 border-black bg-white p-5">
            <p class="text-sm font-black uppercase">Phase 1</p>
            <p class="mt-2 font-semibold">Brand story and hero animation</p>
          </div>
          <div class="rounded-3xl border-2 border-black bg-white p-5">
            <p class="text-sm font-black uppercase">Phase 2</p>
            <p class="mt-2 font-semibold">Scroll-based parallax and feature reveals</p>
          </div>
          <div class="rounded-3xl border-2 border-black bg-white p-5">
            <p class="text-sm font-black uppercase">Phase 3</p>
            <p class="mt-2 font-semibold">Conversion-focused call to action and social links</p>
          </div>
        </div>
      </div>
    </section>

    <section id="contact" class="relative mx-auto max-w-6xl px-6 pb-24 pt-10">
      <div class="rounded-[2.5rem] border-2 border-black bg-black p-8 text-white">
        <h2 class="text-3xl font-black">Ready to launch your Bubble one-pager?</h2>
        <p class="mt-4 max-w-2xl text-lg">Let's collaborate and turn your product narrative into a fast, interactive, and memorable website.</p>
        <a href="mailto:hello@example.com" class="mt-6 inline-block rounded-full border-2 border-white bg-white px-6 py-3 font-black text-black">
          hello@example.com
        </a>
      </div>
    </section>
  </div>
</template>
