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
    <h2 class="text-4xl font-bold text-white mb-4">
      {{ state.lastAnswerCorrect ? 'Dobrze!' : 'Źle!' }}
    </h2>

    <!-- Current player name -->
    <p class="text-xl text-white/70 mb-4">{{ currentPlayer?.name }}</p>

    <!-- Current score -->
    <div class="bg-black/20 rounded-2xl px-8 py-4 mb-8">
      <p class="text-xl text-white/80">Wynik: <span class="font-extrabold text-white text-3xl">{{ currentPlayer?.score }}</span> / {{ state.currentCardIndex + 1 }}</p>
    </div>

    <!-- Next word countdown -->
    <div class="text-white/70 text-lg">
      <p v-if="isLastCard">Koniec tury za {{ countdown }}s...</p>
      <p v-else>Następne słowo za {{ countdown }}s...</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import { useGameState } from '~/composables/useGameState'
import { useOrientation } from '~/composables/useOrientation'

const { state, currentPlayer, nextCard } = useGameState()
const { isPortrait } = useOrientation()

const countdown = ref(5)

const isLastCard = computed(() =>
  state.currentCardIndex + 1 >= state.cardsPerPlayer
)

let interval: ReturnType<typeof setInterval> | null = null

function startTimer() {
  stopTimer()
  interval = setInterval(() => {
    countdown.value--
    if (countdown.value <= 0) {
      stopTimer()
      nextCard()
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
  countdown.value = 5
  if (!isPortrait.value) startTimer()
})

onUnmounted(() => stopTimer())
</script>
