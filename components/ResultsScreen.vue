<template>
  <div class="min-h-screen bg-gray-900 flex flex-col items-center px-4 py-8">
    <h1 class="text-4xl font-extrabold text-indigo-400 mb-8">Wyniki</h1>

    <div class="w-full max-w-md space-y-4 mb-8">
      <div
        v-for="(player, idx) in sortedPlayers"
        :key="idx"
        class="bg-gray-800 rounded-xl p-5"
      >
        <div class="flex items-center justify-between mb-3">
          <div class="flex items-center gap-3">
            <span
              :class="[
                'text-2xl font-extrabold',
                idx === 0 ? 'text-yellow-400' : idx === 1 ? 'text-gray-300' : idx === 2 ? 'text-amber-600' : 'text-gray-500',
              ]"
            >
              #{{ idx + 1 }}
            </span>
            <span class="text-xl font-bold text-white">{{ player.name }}</span>
          </div>
          <span class="text-2xl font-bold text-indigo-400">
            {{ player.score }}/{{ state.cardsPerPlayer }}
          </span>
        </div>

        <!-- Score bar -->
        <div class="w-full bg-gray-700 rounded-full h-3 mb-3">
          <div
            class="h-3 rounded-full bg-indigo-500 transition-all"
            :style="{ width: (player.score / state.cardsPerPlayer) * 100 + '%' }"
          />
        </div>

        <!-- Answer details -->
        <button
          class="text-sm text-gray-400 hover:text-gray-300"
          @click="expandedPlayer = expandedPlayer === idx ? -1 : idx"
        >
          {{ expandedPlayer === idx ? 'Ukryj szczegóły' : 'Pokaż szczegóły' }}
        </button>
        <div v-if="expandedPlayer === idx" class="mt-3 space-y-1">
          <div
            v-for="(answer, aIdx) in player.answers"
            :key="aIdx"
            class="flex items-center gap-2 text-sm"
          >
            <span :class="answer.correct ? 'text-green-400' : 'text-red-400'">
              {{ answer.correct ? '✓' : '✗' }}
            </span>
            <span class="text-gray-300">{{ answer.word }}</span>
          </div>
        </div>
      </div>
    </div>

    <button
      class="w-full max-w-md py-4 rounded-xl text-xl font-bold bg-indigo-600 hover:bg-indigo-700 text-white transition-colors"
      @click="handlePlayAgain"
    >
      Zagraj ponownie
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useGameState } from '~/composables/useGameState'

const { state, resetGame } = useGameState()

const expandedPlayer = ref(-1)

const sortedPlayers = computed(() =>
  [...state.players].sort((a, b) => b.score - a.score)
)

function handlePlayAgain() {
  // Exit fullscreen if active
  try {
    document.exitFullscreen?.()
  } catch { /* ignore */ }
  try {
    (screen.orientation as any).unlock?.()
  } catch { /* ignore */ }
  resetGame()
}
</script>
