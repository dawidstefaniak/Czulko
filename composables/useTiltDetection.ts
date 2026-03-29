import { onMounted, onUnmounted, ref } from 'vue'

// Phone must tilt past this angle (degrees from neutral) to trigger
const TRIGGER_THRESHOLD = 55
// Phone must return within this angle of neutral before it can trigger again
const NEUTRAL_ZONE = 20
// Minimum time between triggers
const COOLDOWN_MS = 1000

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
  // Must be in neutral position before a tilt can trigger
  let isInNeutral = true
  const tiltActive = ref(false)

  function getTiltValue(event: DeviceOrientationEvent): number {
    const beta = event.beta
    const gamma = event.gamma
    const orientation = screen.orientation?.type || ''

    if (orientation.includes('landscape')) {
      if (orientation === 'landscape-secondary') {
        return -(gamma ?? 0)
      }
      return gamma ?? 0
    }
    // Portrait: phone on forehead has beta ~90, so offset to 0 as neutral
    return (beta ?? 90) - 90
  }

  function handleOrientation(event: DeviceOrientationEvent) {
    if (!enabled()) return

    const tiltValue = getTiltValue(event)

    // If we already triggered, wait for user to return to neutral first
    if (!isInNeutral) {
      if (Math.abs(tiltValue) < NEUTRAL_ZONE) {
        isInNeutral = true
      }
      return
    }

    // Check cooldown
    const now = Date.now()
    if (now - lastTrigger < COOLDOWN_MS) return

    // Detect deliberate nod past threshold
    if (tiltValue > TRIGGER_THRESHOLD) {
      lastTrigger = now
      isInNeutral = false
      onCorrect()
    } else if (tiltValue < -TRIGGER_THRESHOLD) {
      lastTrigger = now
      isInNeutral = false
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
