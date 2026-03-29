import { watch, ref, type Ref } from 'vue'

export function useWakeLock(enabled: Ref<boolean>) {
  const wakeLock = ref<WakeLockSentinel | null>(null)

  watch(enabled, async (val) => {
    if (val) {
      try {
        if ('wakeLock' in navigator) {
          wakeLock.value = await navigator.wakeLock.request('screen')
        }
      } catch { /* not supported */ }
    } else {
      wakeLock.value?.release()
      wakeLock.value = null
    }
  }, { immediate: true })
}
