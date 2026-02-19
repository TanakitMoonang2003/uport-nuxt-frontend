import { ref } from 'vue'

export interface Toast {
  id: number
  type: 'success' | 'error'
  message: string
  duration?: number
}

const toasts = ref<Toast[]>([])
let nextId = 0

export const useToast = () => {
  const show = (type: 'success' | 'error', message: string, duration = 3500) => {
    const id = ++nextId
    toasts.value.push({ id, type, message, duration })
    setTimeout(() => remove(id), duration)
  }

  const success = (message: string, duration?: number) => show('success', message, duration)
  const error = (message: string, duration?: number) => show('error', message, duration)

  const remove = (id: number) => {
    const idx = toasts.value.findIndex(t => t.id === id)
    if (idx !== -1) toasts.value.splice(idx, 1)
  }

  return { toasts, success, error, remove }
}
