import { onMounted, onUnmounted, ref } from 'vue'

// Tilt must deviate this many degrees from calibrated baseline to trigger
const TRIGGER_THRESHOLD = 45
// Minimum time between triggers
const COOLDOWN_MS = 1000
// Number of samples to average for calibration
const CALIBRATION_SAMPLES = 10

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
  let isInNeutral = true
  let baseline: number | null = null
  let calibrationBuffer: number[] = []
  let isCalibrating = false
  const tiltActive = ref(false)

  // Always use beta for nod detection. Beta measures front-to-back tilt
  // in the device's frame: ~90° when upright at forehead, increases on
  // nod down, decreases on nod up. This works regardless of portrait/landscape
  // because the phone is always roughly vertical against the forehead.
  function getRawTiltValue(event: DeviceOrientationEvent): number {
    return event.beta ?? 90
  }

  /** Call this to recalibrate the baseline for a new word */
  function calibrate() {
    baseline = null
    calibrationBuffer = []
    isCalibrating = true
    isInNeutral = true
  }

  function handleOrientation(event: DeviceOrientationEvent) {
    if (!enabled()) return

    const raw = getRawTiltValue(event)

    // Calibration phase: collect samples to establish the "neutral" position
    if (isCalibrating) {
      calibrationBuffer.push(raw)
      if (calibrationBuffer.length >= CALIBRATION_SAMPLES) {
        baseline = calibrationBuffer.reduce((a, b) => a + b, 0) / calibrationBuffer.length
        isCalibrating = false
        calibrationBuffer = []
      }
      return
    }

    if (baseline === null) return

    const tiltFromBaseline = raw - baseline

    // Hysteresis: must return near neutral before triggering again
    if (!isInNeutral) {
      if (Math.abs(tiltFromBaseline) < 15) {
        isInNeutral = true
      }
      return
    }

    const now = Date.now()
    if (now - lastTrigger < COOLDOWN_MS) return

    if (tiltFromBaseline > TRIGGER_THRESHOLD) {
      lastTrigger = now
      isInNeutral = false
      onCorrect()
    } else if (tiltFromBaseline < -TRIGGER_THRESHOLD) {
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
    // Start initial calibration
    calibrate()
  })

  onUnmounted(() => {
    window.removeEventListener('deviceorientation', handleOrientation)
    window.removeEventListener('keydown', handleKeyDown)
    tiltActive.value = false
  })

  return { tiltActive, calibrate }
}
