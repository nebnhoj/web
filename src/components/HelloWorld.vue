<script setup lang="ts">
import { ref } from 'vue'

defineProps<{ msg: string }>()

 </script>

<template>
  <h1 class="text-xl">{{ msg }}</h1>
 
</template>

 
