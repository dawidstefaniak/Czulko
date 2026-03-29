<template>
  <div class="min-h-screen bg-gray-900 flex flex-col items-center px-4 py-8">
    <h1 class="text-5xl font-extrabold text-indigo-400 mb-8 tracking-tight">Czółko</h1>

    <!-- Category Selection -->
    <div class="w-full max-w-md mb-6">
      <h2 class="text-lg font-semibold text-gray-300 mb-3">Wybierz kategorię</h2>
      <div class="grid grid-cols-2 gap-3">
        <button
          v-for="(cat, key) in CATEGORIES"
          :key="key"
          :class="[
            'p-4 rounded-xl text-lg font-bold transition-all border-2',
            state.category === key
              ? 'bg-indigo-600 border-indigo-400 text-white scale-105'
              : 'bg-gray-800 border-gray-700 text-gray-300 hover:border-indigo-500',
          ]"
          @click="setCategory(key as Category)"
        >
          {{ cat.label }}
        </button>
      </div>
    </div>

    <!-- Players -->
    <div class="w-full max-w-md mb-6">
      <h2 class="text-lg font-semibold text-gray-300 mb-3">Gracze</h2>
      <div class="space-y-2">
        <input
          v-for="(_, idx) in playerFields"
          :key="idx"
          v-model="playerFields[idx]"
          type="text"
          :placeholder="'Gracz ' + (idx + 1)"
          class="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500"
        />
      </div>
    </div>

    <!-- Settings -->
    <div class="w-full max-w-md mb-8">
      <h2 class="text-lg font-semibold text-gray-300 mb-3">Ustawienia</h2>
      <div class="grid grid-cols-2 gap-4">
        <div>
          <label class="text-sm text-gray-400 block mb-1">Czas na odpowiedź (s)</label>
          <select
            :value="state.timePerTurn"
            class="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-3 text-white focus:outline-none focus:border-indigo-500"
            @change="setTime(Number(($event.target as HTMLSelectElement).value))"
          >
            <option :value="15">15</option>
            <option :value="30">30</option>
            <option :value="45">45</option>
            <option :value="60">60</option>
          </select>
        </div>
        <div>
          <label class="text-sm text-gray-400 block mb-1">Karty na gracza</label>
          <select
            :value="state.cardsPerPlayer"
            class="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-3 text-white focus:outline-none focus:border-indigo-500"
            @change="setCards(Number(($event.target as HTMLSelectElement).value))"
          >
            <option :value="5">5</option>
            <option :value="10">10</option>
            <option :value="15">15</option>
            <option :value="20">20</option>
          </select>
        </div>
      </div>
    </div>

    <!-- Start Button -->
    <button
      :disabled="!canStart"
      :class="[
        'w-full max-w-md py-4 rounded-xl text-xl font-bold transition-all',
        canStart
          ? 'bg-green-600 hover:bg-green-700 text-white'
          : 'bg-gray-700 text-gray-500 cursor-not-allowed',
      ]"
      @click="handleStart"
    >
      Rozpocznij grę!
    </button>
    <p v-if="!canStart" class="text-gray-500 text-sm mt-2">
      Wybierz kategorię i wpisz co najmniej jednego gracza
    </p>
  </div>
</template>

<script setup lang="ts">
import { reactive, computed, watch } from 'vue'
import { CATEGORIES, type Category } from '~/data/categories'
import { useGameState } from '~/composables/useGameState'

const { state, setCategory, setTime, setCards, startGameWithPlayers } = useGameState()

const playerFields = reactive<string[]>(['', '', '', ''])

// Auto-expand: if all fields have text, add a new empty one
watch(playerFields, (fields) => {
  const allFilled = fields.every(f => f.trim() !== '')
  if (allFilled) {
    playerFields.push('')
  }
}, { deep: true })

const filledPlayers = computed(() =>
  playerFields.filter(f => f.trim() !== '').map(f => f.trim())
)

const canStart = computed(() => state.category !== null && filledPlayers.value.length > 0)

function handleStart() {
  if (!canStart.value) return
  startGameWithPlayers(filledPlayers.value)
}
</script>
