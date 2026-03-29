<template>
  <div>
    <MenuScreen v-if="state.phase === 'menu'" />
    <PlayerIntroScreen v-else-if="state.phase === 'playerIntro'" />
    <CountdownScreen v-else-if="state.phase === 'countdown'" />
    <PlayScreen v-else-if="state.phase === 'playing'" />
    <CardResultScreen v-else-if="state.phase === 'cardResult'" />
    <ResultsScreen v-else-if="state.phase === 'results'" />
  </div>
</template>

<script setup lang="ts">
import { useGameState } from '~/composables/useGameState'

const { state } = useGameState()
</script>
