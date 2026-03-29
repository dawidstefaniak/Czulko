import { ref, onMounted, onUnmounted } from 'vue'

const isPortrait = ref(true)
let listenersAttached = false

function checkOrientation() {
  isPortrait.value = window.innerHeight > window.innerWidth
}

export function useOrientation() {
  onMounted(() => {
    checkOrientation()
    if (!listenersAttached) {
      window.addEventListener('resize', checkOrientation)
      window.addEventListener('orientationchange', checkOrientation)
      listenersAttached = true
    }
  })

  return { isPortrait }
}
