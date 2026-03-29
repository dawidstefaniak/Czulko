import { reactive, computed } from 'vue'
import { type Category, type Difficulty, getWordsForDifficulty, shuffleArray } from '~/data/categories'

export type GamePhase =
  | 'menu'
  | 'playerIntro'
  | 'countdown'
  | 'playing'
  | 'cardResult'
  | 'results'

export interface PlayerAnswer {
  word: string
  correct: boolean
}

export interface Player {
  name: string
  score: number
  answers: PlayerAnswer[]
}

interface GameState {
  phase: GamePhase
  category: Category | null
  difficulty: Difficulty | "all"
  players: Player[]
  currentPlayerIndex: number
  currentCardIndex: number
  cardsPerPlayer: number
  timePerTurn: number
  words: string[]
  lastAnswerCorrect: boolean | null
}

const state = reactive<GameState>({
  phase: 'menu',
  category: null,
  difficulty: 'all',
  players: [],
  currentPlayerIndex: 0,
  currentCardIndex: 0,
  cardsPerPlayer: 10,
  timePerTurn: 30,
  words: [],
  lastAnswerCorrect: null,
})

export function useGameState() {
  const currentPlayer = computed(() => state.players[state.currentPlayerIndex])

  const currentWord = computed(() => {
    const idx = state.currentPlayerIndex * state.cardsPerPlayer + state.currentCardIndex
    return state.words[idx] || ''
  })

  function setCategory(category: Category) {
    state.category = category
  }

  function setDifficulty(difficulty: Difficulty | "all") {
    state.difficulty = difficulty
  }

  function setTime(time: number) {
    state.timePerTurn = time
  }

  function setCards(cards: number) {
    state.cardsPerPlayer = cards
  }

  function startGameWithPlayers(playerNames: string[]) {
    if (!state.category || playerNames.length === 0) return
    state.players = playerNames.map(name => ({ name, score: 0, answers: [] }))
    const totalCards = state.players.length * state.cardsPerPlayer
    const categoryWords = getWordsForDifficulty(state.category, state.difficulty)
    let words: string[]
    if (categoryWords.length >= totalCards) {
      words = shuffleArray(categoryWords).slice(0, totalCards)
    } else {
      const repeated: string[] = []
      while (repeated.length < totalCards) {
        repeated.push(...shuffleArray(categoryWords))
      }
      words = repeated.slice(0, totalCards)
    }
    state.words = words
    state.currentPlayerIndex = 0
    state.currentCardIndex = 0
    state.phase = 'playerIntro'
  }

  function startCountdown() {
    state.phase = 'countdown'
  }

  function startPlaying() {
    state.phase = 'playing'
  }

  function answerCorrect() {
    const idx = state.currentPlayerIndex * state.cardsPerPlayer + state.currentCardIndex
    const word = state.words[idx] || ''
    const player = state.players[state.currentPlayerIndex]
    player.score++
    player.answers.push({ word, correct: true })
    state.lastAnswerCorrect = true
    state.phase = 'cardResult'
  }

  function answerWrong() {
    const idx = state.currentPlayerIndex * state.cardsPerPlayer + state.currentCardIndex
    const word = state.words[idx] || ''
    const player = state.players[state.currentPlayerIndex]
    player.answers.push({ word, correct: false })
    state.lastAnswerCorrect = false
    state.phase = 'cardResult'
  }

  function nextCard() {
    const nextCardIdx = state.currentCardIndex + 1
    if (nextCardIdx >= state.cardsPerPlayer) {
      const nextPlayer = state.currentPlayerIndex + 1
      if (nextPlayer >= state.players.length) {
        state.phase = 'results'
        return
      }
      state.currentPlayerIndex = nextPlayer
      state.currentCardIndex = 0
      state.phase = 'playerIntro'
      return
    }
    state.currentCardIndex = nextCardIdx
    state.phase = 'playing'
  }

  function resetGame() {
    state.phase = 'menu'
    state.category = null
    state.difficulty = 'all'
    state.players = []
    state.currentPlayerIndex = 0
    state.currentCardIndex = 0
    state.cardsPerPlayer = 10
    state.timePerTurn = 30
    state.words = []
    state.lastAnswerCorrect = null
  }

  return {
    state,
    currentPlayer,
    currentWord,
    setCategory,
    setDifficulty,
    setTime,
    setCards,
    startGameWithPlayers,
    startCountdown,
    startPlaying,
    answerCorrect,
    answerWrong,
    nextCard,
    resetGame,
  }
}
