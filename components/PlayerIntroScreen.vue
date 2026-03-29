<template>
  <div class="min-h-screen bg-gray-900 flex flex-col items-center justify-center px-6 game-screen">
    <div class="text-center">
      <p class="text-xl text-gray-400 mb-4">Teraz gra</p>
      <h1 class="text-7xl font-extrabold text-white mb-8">{{ currentPlayer?.name }}</h1>
      <p class="text-lg text-gray-400 mb-2">
        Gracz {{ state.currentPlayerIndex + 1 }} z {{ state.players.length }}
      </p>
      <p class="text-gray-500 mb-10">
        {{ state.cardsPerPlayer }} kart &middot; {{ state.timePerTurn }}s na kartę
      </p>

      <div class="text-5xl font-bold text-indigo-400 mb-6 animate-pulse-scale">
        {{ countdown }}
      </div>

      <button
        class="bg-indigo-600 hover:bg-indigo-700 text-white text-2xl font-bold px-12 py-5 rounded-2xl transition-all"
        @click="handleStart"
      >
        Gotowy!
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted } from 'vue'
import { useGameState } from '~/composables/useGameState'
import { useOrientation } from '~/composables/useOrientation'
import { requestOrientationPermission } from '~/composables/useTiltDetection'

const { state, currentPlayer, startCountdown } = useGameState()
const { isPortrait } = useOrientation()

const countdown = ref(10)
let interval: ReturnType<typeof setInterval> | null = null

function startTimer() {
  stopTimer()
  interval = setInterval(() => {
    countdown.value--
    if (countdown.value <= 0) {
      stopTimer()
      doStart()
    }
  }, 1000)
}

function stopTimer() {
  if (interval) { clearInterval(interval); interval = null }
}

async function doStart() {
  stopTimer()
  await requestOrientationPermission()
  try { await document.documentElement.requestFullscreen?.() } catch {}
  try { await (screen.orientation as any).lock?.('landscape') } catch {}
  startCountdown()
}

async function handleStart() {
  doStart()
}

watch(isPortrait, (portrait) => {
  if (portrait) stopTimer()
  else if (countdown.value > 0) startTimer()
})

onMounted(() => {
  countdown.value = 10
  if (!isPortrait.value) startTimer()
})

onUnmounted(() => stopTimer())
</script>
