<template>
  <div class="min-h-screen bg-indigo-900 flex flex-col items-center justify-center game-screen">
    <p class="text-2xl text-indigo-200 mb-6">Przyłóż telefon do czoła!</p>
    <div class="text-9xl font-extrabold text-white animate-pulse-scale">
      {{ count }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted } from 'vue'
import { useGameState } from '~/composables/useGameState'
import { useOrientation } from '~/composables/useOrientation'

const { startPlaying } = useGameState()
const { isPortrait } = useOrientation()

const count = ref(5)
let interval: ReturnType<typeof setInterval> | null = null

function startTimer() {
  stopTimer()
  interval = setInterval(() => {
    count.value--
    if (count.value <= 0) {
      stopTimer()
      startPlaying()
    }
  }, 1000)
}

function stopTimer() {
  if (interval) { clearInterval(interval); interval = null }
}

watch(isPortrait, (portrait) => {
  if (portrait) stopTimer()
  else startTimer()
})

onMounted(() => {
  if (!isPortrait.value) startTimer()
})

onUnmounted(() => stopTimer())
</script>
