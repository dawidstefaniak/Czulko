import { onMounted, onUnmounted, ref } from 'vue'

// A deliberate nod peak is typically 100-300 deg/s; raise threshold to ignore noise
const VELOCITY_THRESHOLD = 180
// Minimum time between triggers
const COOLDOWN_MS = 1500
// Need this many consecutive readings above threshold in the same direction
const CONFIRM_COUNT = 4

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

  // Track consecutive strong readings in the same direction
  let consecutivePositive = 0
  let consecutiveNegative = 0

  function handleMotion(event: DeviceMotionEvent) {
    if (!enabled()) return

    const now = Date.now()
    if (now - lastTrigger < COOLDOWN_MS) {
      consecutivePositive = 0
      consecutiveNegative = 0
      return
    }

    const rate = event.rotationRate
    if (!rate) return

    const betaRate = rate.beta ?? 0
    const gammaRate = rate.gamma ?? 0

    // Pick the axis with the stronger rotation
    const absBeta = Math.abs(betaRate)
    const absGamma = Math.abs(gammaRate)
    const nodVelocity = absBeta > absGamma ? betaRate : gammaRate

    // Below threshold — reset streaks
    if (Math.abs(nodVelocity) < VELOCITY_THRESHOLD) {
      consecutivePositive = 0
      consecutiveNegative = 0
      return
    }

    // Count consecutive readings in the same direction
    if (nodVelocity > 0) {
      consecutivePositive++
      consecutiveNegative = 0
    } else {
      consecutiveNegative++
      consecutivePositive = 0
    }

    // Only trigger after CONFIRM_COUNT consecutive readings agree
    if (consecutivePositive >= CONFIRM_COUNT) {
      lastTrigger = now
      consecutivePositive = 0
      consecutiveNegative = 0
      onCorrect()
    } else if (consecutiveNegative >= CONFIRM_COUNT) {
      lastTrigger = now
      consecutivePositive = 0
      consecutiveNegative = 0
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

  function calibrate() {}

  onMounted(() => {
    window.addEventListener('devicemotion', handleMotion)
    window.addEventListener('keydown', handleKeyDown)
    tiltActive.value = true
  })

  onUnmounted(() => {
    window.removeEventListener('devicemotion', handleMotion)
    window.removeEventListener('keydown', handleKeyDown)
    tiltActive.value = false
  })

  return { tiltActive, calibrate }
}
