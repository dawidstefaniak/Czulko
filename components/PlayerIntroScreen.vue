<template>
  <div class="min-h-screen bg-gray-900 flex flex-col items-center justify-center px-6 game-screen">
    <div class="text-center">
      <p class="text-xl text-gray-400 mb-4">Teraz gra</p>
      <h1 class="text-6xl font-extrabold text-white mb-8">{{ currentPlayer?.name }}</h1>
      <p class="text-lg text-gray-400 mb-2">
        Gracz {{ state.currentPlayerIndex + 1 }} z {{ state.players.length }}
      </p>
      <p class="text-gray-500 mb-10">
        {{ state.cardsPerPlayer }} kart &middot; {{ state.timePerTurn }}s na kartę
      </p>
      <button
        class="bg-indigo-600 hover:bg-indigo-700 text-white text-2xl font-bold px-12 py-5 rounded-2xl transition-all animate-pulse-scale"
        @click="handleStart"
      >
        Gotowy!
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useGameState } from '~/composables/useGameState'
import { requestOrientationPermission } from '~/composables/useTiltDetection'

const { state, currentPlayer, startCountdown } = useGameState()

async function handleStart() {
  await requestOrientationPermission()
  // Try to lock to landscape and go fullscreen
  try {
    await document.documentElement.requestFullscreen?.()
  } catch { /* ignore */ }
  try {
    await (screen.orientation as any).lock?.('landscape')
  } catch { /* ignore */ }
  startCountdown()
}
</script>
