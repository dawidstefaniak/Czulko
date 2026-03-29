<template>
  <div class="min-h-screen bg-gray-900 flex flex-col items-center justify-center relative game-screen">
    <!-- Timer bar -->
    <div class="absolute top-0 left-0 right-0 h-2 bg-gray-800">
      <div
        class="h-full bg-indigo-500 transition-all duration-1000 ease-linear"
        :style="{ width: timerPercent + '%' }"
      />
    </div>

    <!-- Timer & card counter -->
    <div class="absolute top-4 left-0 right-0 flex justify-between px-6">
      <span class="text-xl text-gray-400 font-mono">{{ secondsRemaining }}s</span>
      <span class="text-xl text-gray-400">
        {{ state.currentCardIndex + 1 }}/{{ state.cardsPerPlayer }}
      </span>
    </div>

    <!-- Word -->
    <h1 class="text-6xl md:text-8xl font-extrabold text-white text-center px-4 leading-tight">
      {{ currentWord }}
    </h1>

    <!-- Desktop hint -->
    <p class="absolute bottom-6 text-gray-600 text-sm hidden md:block">
      ↓ Dobrze &nbsp;&nbsp;|&nbsp;&nbsp; ↑ Źle
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useGameState } from '~/composables/useGameState'
import { useTiltDetection } from '~/composables/useTiltDetection'
import { useWakeLock } from '~/composables/useWakeLock'

const { state, currentWord, answerCorrect, answerWrong } = useGameState()

const secondsRemaining = ref(state.timePerTurn)
const isPlaying = ref(true)
const wakeLockEnabled = ref(true)

const timerPercent = computed(() =>
  (secondsRemaining.value / state.timePerTurn) * 100
)

useWakeLock(wakeLockEnabled)

function handleCorrect() {
  if (!isPlaying.value) return
  answerCorrect()
}

function handleWrong() {
  if (!isPlaying.value) return
  answerWrong()
}

function handleTimeUp() {
  if (!isPlaying.value) return
  isPlaying.value = false
  answerWrong()
}

useTiltDetection(handleCorrect, handleWrong, () => isPlaying.value)

let timer: ReturnType<typeof setInterval> | null = null

onMounted(() => {
  secondsRemaining.value = state.timePerTurn
  timer = setInterval(() => {
    secondsRemaining.value--
    if (secondsRemaining.value <= 0) {
      if (timer) clearInterval(timer)
      handleTimeUp()
    }
  }, 1000)
})

onUnmounted(() => {
  if (timer) clearInterval(timer)
  wakeLockEnabled.value = false
})
</script>
