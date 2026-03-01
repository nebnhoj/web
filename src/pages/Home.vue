<script setup lang="ts">
const highlights = [
  '8+ years building and supporting production software across backend, mobile, and cloud platforms.',
  'Strong focus on DevOps practices, platform automation, and reliable CI/CD pipelines.',
  'Experienced in .NET, Flutter, AWS, and multi-cloud operations for high-impact teams.',
]

const focusAreas = [
  'Backend API development and systems integration',
  'Cloud infrastructure, observability, and release engineering',
  'Mobile app delivery and cross-functional collaboration',
]
</script>

<template>
  <section class="space-y-6">
    <header class="space-y-3">
      <p class="text-sm font-medium uppercase tracking-wide text-slate-500">Software Engineer · DevOps Specialist</p>
      <h1 class="text-4xl font-bold leading-tight sm:text-5xl">John Ben C. Uera</h1>
      <p class="max-w-3xl text-lg text-slate-700">
        I design and deliver scalable products with a practical blend of backend engineering, cloud operations,
        and mobile development.
      </p>
    </header>

    <div class="grid gap-6 md:grid-cols-2">
      <article class="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
        <h2 class="mb-3 text-xl font-semibold">Professional Highlights</h2>
        <ul class="space-y-2">
          <li v-for="highlight in highlights" :key="highlight" class="text-slate-700">• {{ highlight }}</li>
        </ul>
      </article>

      <article class="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
        <h2 class="mb-3 text-xl font-semibold">Current Focus</h2>
        <ul class="space-y-2">
          <li v-for="focus in focusAreas" :key="focus" class="text-slate-700">• {{ focus }}</li>
        </ul>
      </article>
    </div>
  </section>
</template>
