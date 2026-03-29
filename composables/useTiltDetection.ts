import { onMounted, onUnmounted, ref } from 'vue'

// Angular velocity threshold in deg/s - a deliberate nod produces 50-150 deg/s
const VELOCITY_THRESHOLD = 50
// Minimum time between triggers
const COOLDOWN_MS = 1200

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

  // Use devicemotion rotationRate instead of deviceorientation.
  // rotationRate.beta = angular velocity around the X-axis (deg/s).
  // In landscape, a nod is rotation around the axis that runs along
  // the long edge of the phone. We check both beta and gamma rotation
  // rates and use whichever is larger — this works regardless of
  // portrait/landscape/which-landscape.
  function handleMotion(event: DeviceMotionEvent) {
    if (!enabled()) return

    const now = Date.now()
    if (now - lastTrigger < COOLDOWN_MS) return

    const rate = event.rotationRate
    if (!rate) return

    const betaRate = rate.beta ?? 0  // deg/s around X-axis
    const gammaRate = rate.gamma ?? 0 // deg/s around Y-axis

    // Pick the axis with the stronger rotation — that's the nod axis
    const absBeta = Math.abs(betaRate)
    const absGamma = Math.abs(gammaRate)

    let nodVelocity: number
    if (absBeta > absGamma) {
      nodVelocity = betaRate
    } else {
      nodVelocity = gammaRate
    }

    if (Math.abs(nodVelocity) < VELOCITY_THRESHOLD) return

    lastTrigger = now
    // Positive rotation rate = tilting forward/down = correct
    // Negative rotation rate = tilting backward/up = wrong
    if (nodVelocity > 0) {
      onCorrect()
    } else {
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

  // calibrate() kept for API compat with PlayScreen — no-op now since
  // rotationRate doesn't need calibration
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
