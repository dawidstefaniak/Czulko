<template>
  <div class="min-h-screen bg-indigo-900 flex flex-col items-center justify-center game-screen">
    <p class="text-2xl text-indigo-200 mb-6">Przyłóż telefon do czoła!</p>
    <div class="text-9xl font-extrabold text-white animate-pulse-scale">
      {{ count }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useGameState } from '~/composables/useGameState'

const { startPlaying } = useGameState()

const count = ref(5)
let interval: ReturnType<typeof setInterval> | null = null

onMounted(() => {
  interval = setInterval(() => {
    count.value--
    if (count.value <= 0) {
      if (interval) clearInterval(interval)
      startPlaying()
    }
  }, 1000)
})

onUnmounted(() => {
  if (interval) clearInterval(interval)
})
</script>
