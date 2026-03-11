<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'

type ExperienceItem = {
  role: string
  company: string
  period: string
  highlights: string[]
}

type ProfileData = {
  name: string
  title: string
  email: string
  phone: string
  location: string
  profile: string
  experience: ExperienceItem[]
  skills: Record<string, string[]>
  education: {
    degree: string
    school: string
    period: string
  }
  awards: string[]
  certificates: string[]
  links: {
    linkedin: string
    github: string
    googlePlay: string
  }
}

const profile = ref<ProfileData | null>(null)

const mailtoLink = computed(() => {
  if (!profile.value?.email) {
    return '#'
  }

  return `mailto:${profile.value.email.trim()}`
})

onMounted(async () => {
  const response = await fetch('/profile.json')
  profile.value = await response.json()
})
</script>

<template>
  <div v-if="profile" class="relative overflow-hidden">
    <section id="hero" class="mx-auto max-w-6xl px-6 py-16">
      <p class="mb-4 inline-block rounded-full border-2 border-black bg-white px-4 py-2 text-xs font-black uppercase tracking-[0.15em]">
        {{ profile.location }} · Open to Opportunities
      </p>
      <h1 class="max-w-4xl text-4xl font-black leading-tight sm:text-6xl">
        {{ profile.name }}
      </h1>
      <p class="mt-4 text-2xl font-bold">{{ profile.title }}</p>
      <p class="mt-6 max-w-3xl text-lg font-medium">{{ profile.profile }}</p>
      <div class="mt-8 flex flex-wrap gap-3">
        <a href="#experience" class="rounded-full border-2 border-black bg-black px-6 py-3 font-bold text-white">View Experience</a>
        <a :href="mailtoLink" class="rounded-full border-2 border-black bg-white px-6 py-3 font-bold">Contact Me</a>
      </div>
    </section>

    <section id="experience" class="mx-auto max-w-6xl px-6 py-10">
      <h2 class="text-3xl font-black">Professional Experience</h2>
      <div class="mt-6 space-y-5">
        <article v-for="item in profile.experience" :key="`${item.company}-${item.period}`" class="rounded-3xl border-2 border-black bg-white p-6">
          <h3 class="text-xl font-black">{{ item.role }} | {{ item.company }}</h3>
          <p class="text-sm font-semibold uppercase tracking-wide">{{ item.period }}</p>
          <ul class="mt-3 list-disc space-y-2 pl-5">
            <li v-for="highlight in item.highlights" :key="highlight" class="font-medium">{{ highlight }}</li>
          </ul>
        </article>
      </div>
    </section>

    <section id="skills" class="mx-auto max-w-6xl px-6 py-10">
      <h2 class="text-3xl font-black">Technical Skills</h2>
      <div class="mt-6 grid gap-4 md:grid-cols-2">
        <article v-for="(items, category) in profile.skills" :key="category" class="rounded-3xl border-2 border-black bg-[#cfe5ff] p-5">
          <h3 class="text-lg font-black">{{ category }}</h3>
          <p class="mt-2 font-medium">{{ items.join(', ') }}</p>
        </article>
      </div>
    </section>

    <section id="education" class="mx-auto max-w-6xl px-6 py-10">
      <h2 class="text-3xl font-black">Education</h2>
      <div class="mt-6 rounded-3xl border-2 border-black bg-white p-6">
        <p class="text-xl font-black">{{ profile.education.degree }}</p>
        <p class="font-semibold">{{ profile.education.school }}</p>
        <p class="text-sm uppercase tracking-wide">{{ profile.education.period }}</p>
      </div>
    </section>

    <section id="awards" class="mx-auto max-w-6xl px-6 py-10">
      <h2 class="text-3xl font-black">Awards & Certificates</h2>
      <div class="mt-6 grid gap-4 md:grid-cols-2">
        <article class="rounded-3xl border-2 border-black bg-white p-6">
          <h3 class="text-lg font-black">Awards</h3>
          <ul class="mt-3 list-disc space-y-2 pl-5">
            <li v-for="award in profile.awards" :key="award" class="font-medium">{{ award }}</li>
          </ul>
        </article>
        <article class="rounded-3xl border-2 border-black bg-white p-6">
          <h3 class="text-lg font-black">Certificates</h3>
          <ul class="mt-3 list-disc space-y-2 pl-5">
            <li v-for="certificate in profile.certificates" :key="certificate" class="font-medium">{{ certificate }}</li>
          </ul>
        </article>
      </div>
    </section>

    <section id="contact" class="mx-auto max-w-6xl px-6 pb-24 pt-10">
      <div class="rounded-[2.5rem] border-2 border-black bg-black p-8 text-white">
        <h2 class="text-3xl font-black">Contact</h2>
        <p class="mt-4 text-lg">Email: <a class="underline" :href="mailtoLink">{{ profile.email }}</a></p>
        <p class="text-lg">Phone: {{ profile.phone }}</p>
        <div class="mt-5 flex flex-wrap gap-3">
          <a :href="profile.links.linkedin" target="_blank" rel="noopener noreferrer" class="rounded-full border-2 border-white px-4 py-2 font-bold">LinkedIn</a>
          <a :href="profile.links.github" target="_blank" rel="noopener noreferrer" class="rounded-full border-2 border-white px-4 py-2 font-bold">GitHub</a>
          <a :href="profile.links.googlePlay" target="_blank" rel="noopener noreferrer" class="rounded-full border-2 border-white px-4 py-2 font-bold">Google Play</a>
        </div>
      </div>
    </section>
  </div>
</template>
