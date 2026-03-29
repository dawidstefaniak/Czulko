import { onMounted, onUnmounted, ref } from 'vue'

// Tilt must deviate this many degrees from calibrated baseline to trigger
const TRIGGER_THRESHOLD = 30
// Minimum time between triggers
const COOLDOWN_MS = 1000
// Number of samples to average for calibration
const CALIBRATION_SAMPLES = 15

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
  let baselineBeta: number | null = null
  let baselineGamma: number | null = null
  let useGamma = false    // true if phone is landscape → nod axis is gamma
  let gammaInvert = false // true if gamma sign is inverted for this landscape direction
  let calibrationBeta: number[] = []
  let calibrationGamma: number[] = []
  let isCalibrating = false
  const tiltActive = ref(false)

  function calibrate() {
    baselineBeta = null
    baselineGamma = null
    calibrationBeta = []
    calibrationGamma = []
    isCalibrating = true
    isInNeutral = true
  }

  function handleOrientation(event: DeviceOrientationEvent) {
    if (!enabled()) return

    const beta = event.beta ?? 0
    const gamma = event.gamma ?? 0

    // --- Calibration: collect samples for both axes ---
    if (isCalibrating) {
      calibrationBeta.push(beta)
      calibrationGamma.push(gamma)
      if (calibrationBeta.length >= CALIBRATION_SAMPLES) {
        baselineBeta = calibrationBeta.reduce((a, b) => a + b, 0) / calibrationBeta.length
        baselineGamma = calibrationGamma.reduce((a, b) => a + b, 0) / calibrationGamma.length

        // Detect phone orientation from sensor values:
        // Portrait at forehead: beta ≈ 90°, gamma ≈ 0° → nod axis is beta
        // Landscape at forehead: beta ≈ 0°, |gamma| ≈ 90° → nod axis is gamma
        const betaFromUpright = Math.abs(Math.abs(baselineBeta) - 90)
        const gammaFromUpright = Math.abs(Math.abs(baselineGamma) - 90)

        if (betaFromUpright < 40) {
          // Beta is near ±90° → phone is portrait → nod changes beta
          useGamma = false
        } else {
          // Beta is far from 90° → phone is landscape → nod changes gamma
          useGamma = true
          // When baselineGamma > 0 (landscape-primary): nod down → gamma decreases → invert
          // When baselineGamma < 0 (landscape-secondary): nod down → gamma increases → don't invert
          gammaInvert = (baselineGamma ?? 0) > 0
        }

        isCalibrating = false
        calibrationBeta = []
        calibrationGamma = []
      }
      return
    }

    if (baselineBeta === null || baselineGamma === null) return

    // Compute tilt deviation from baseline on the detected nod axis
    let tiltFromBaseline: number
    if (useGamma) {
      tiltFromBaseline = gamma - baselineGamma!
      if (gammaInvert) tiltFromBaseline = -tiltFromBaseline
    } else {
      tiltFromBaseline = beta - baselineBeta!
    }

    // Hysteresis: must return near neutral before triggering again
    if (!isInNeutral) {
      if (Math.abs(tiltFromBaseline) < 12) {
        isInNeutral = true
      }
      return
    }

    const now = Date.now()
    if (now - lastTrigger < COOLDOWN_MS) return

    // Positive tilt = nod down = correct, negative = nod up = wrong
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
    calibrate()
  })

  onUnmounted(() => {
    window.removeEventListener('deviceorientation', handleOrientation)
    window.removeEventListener('keydown', handleKeyDown)
    tiltActive.value = false
  })

  return { tiltActive, calibrate }
}
