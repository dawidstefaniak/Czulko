<template>
  <div
    :class="[
      'min-h-screen flex flex-col items-center justify-center game-screen transition-colors',
      state.lastAnswerCorrect ? 'bg-green-600' : 'bg-red-600',
    ]"
  >
    <div class="text-9xl mb-4">
      {{ state.lastAnswerCorrect ? '✓' : '✗' }}
    </div>
    <h2 class="text-4xl font-bold text-white">
      {{ state.lastAnswerCorrect ? 'Dobrze!' : 'Źle!' }}
    </h2>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import { useGameState } from '~/composables/useGameState'

const { state, nextCard } = useGameState()

let timeout: ReturnType<typeof setTimeout> | null = null

onMounted(() => {
  timeout = setTimeout(() => {
    nextCard()
  }, 1500)
})

onUnmounted(() => {
  if (timeout) clearTimeout(timeout)
})
</script>
