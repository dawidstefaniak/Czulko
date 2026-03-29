<template>
  <div>
    <!-- Portrait warning overlay during gameplay phases -->
    <div
      v-if="isGamePhase && isPortrait"
      class="fixed inset-0 bg-gray-900 z-50 flex flex-col items-center justify-center px-8 text-center"
    >
      <div class="text-6xl mb-6">📱</div>
      <h2 class="text-2xl font-bold text-white mb-3">Obróć telefon</h2>
      <p class="text-gray-400 text-lg">Gra działa tylko w trybie poziomym</p>
    </div>

    <MenuScreen v-if="state.phase === 'menu'" />
    <PlayerIntroScreen v-else-if="state.phase === 'playerIntro'" />
    <CountdownScreen v-else-if="state.phase === 'countdown'" />
    <PlayScreen v-else-if="state.phase === 'playing'" />
    <CardResultScreen v-else-if="state.phase === 'cardResult'" />
    <ResultsScreen v-else-if="state.phase === 'results'" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useGameState } from '~/composables/useGameState'

const { state } = useGameState()

const isPortrait = ref(true)

const isGamePhase = computed(() =>
  state.phase !== 'menu' && state.phase !== 'results'
)

function checkOrientation() {
  isPortrait.value = window.innerHeight > window.innerWidth
}

onMounted(() => {
  checkOrientation()
  window.addEventListener('resize', checkOrientation)
  window.addEventListener('orientationchange', checkOrientation)
})

onUnmounted(() => {
  window.removeEventListener('resize', checkOrientation)
  window.removeEventListener('orientationchange', checkOrientation)
})
</script>
