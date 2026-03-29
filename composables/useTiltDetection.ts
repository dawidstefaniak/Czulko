import { onMounted, onUnmounted, ref } from 'vue'

const TILT_THRESHOLD = 40
const COOLDOWN_MS = 800

export async function requestOrientationPermission(): Promise<boolean> {
  const DOE = (window as any).DeviceOrientationEvent
  if (typeof DOE?.requestPermission === 'function') {
    try {
      const result = await DOE.requestPermission()
      return result === 'granted'
    } catch {
      return false
    }
  }
  return true
}

export function useTiltDetection(
  onCorrect: () => void,
  onWrong: () => void,
  enabled: () => boolean,
) {
  let lastTrigger = 0
  const tiltActive = ref(false)

  function handleOrientation(event: DeviceOrientationEvent) {
    if (!enabled()) return
    const now = Date.now()
    if (now - lastTrigger < COOLDOWN_MS) return

    const beta = event.beta
    const gamma = event.gamma

    const orientation = screen.orientation?.type || ''
    let tiltValue: number

    if (orientation.includes('landscape')) {
      if (orientation === 'landscape-secondary') {
        tiltValue = -(gamma ?? 0)
      } else {
        tiltValue = gamma ?? 0
      }
    } else {
      tiltValue = (beta ?? 90) - 90
    }

    if (tiltValue > TILT_THRESHOLD) {
      lastTrigger = now
      onCorrect()
    } else if (tiltValue < -TILT_THRESHOLD) {
      lastTrigger = now
      onWrong()
    }
  }

  function handleKeyDown(e: KeyboardEvent) {
    if (!enabled()) return
    const now = Date.now()
    if (now - lastTrigger < COOLDOWN_MS) return

    if (e.key === 'ArrowDown') {
      lastTrigger = now
      onCorrect()
    } else if (e.key === 'ArrowUp') {
      lastTrigger = now
      onWrong()
    }
  }

  onMounted(() => {
    window.addEventListener('deviceorientation', handleOrientation)
    window.addEventListener('keydown', handleKeyDown)
    tiltActive.value = true
  })

  onUnmounted(() => {
    window.removeEventListener('deviceorientation', handleOrientation)
    window.removeEventListener('keydown', handleKeyDown)
    tiltActive.value = false
  })

  return { tiltActive }
}
