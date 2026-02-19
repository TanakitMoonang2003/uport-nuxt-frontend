<template>
  <Teleport to="body">
    <div class="fixed top-5 right-5 z-[99999] flex flex-col gap-3 pointer-events-none" style="min-width:320px;max-width:420px">
      <TransitionGroup name="toast">
        <div
          v-for="toast in toasts"
          :key="toast.id"
          class="pointer-events-auto flex items-start gap-3 px-5 py-4 rounded-2xl shadow-2xl border text-sm font-medium"
          :class="toast.type === 'success'
            ? 'bg-white border-green-200 text-green-800'
            : 'bg-white border-red-200 text-red-800'"
        >
          <!-- Icon -->
          <div
            class="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center"
            :class="toast.type === 'success' ? 'bg-green-100' : 'bg-red-100'"
          >
            <!-- Success -->
            <svg v-if="toast.type === 'success'" class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7" />
            </svg>
            <!-- Error -->
            <svg v-else class="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>

          <!-- Message -->
          <div class="flex-1 pt-0.5 leading-snug">{{ toast.message }}</div>

          <!-- Close -->
          <button
            @click="remove(toast.id)"
            class="flex-shrink-0 mt-0.5 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <!-- Progress bar -->
          <div
            class="absolute bottom-0 left-0 h-1 rounded-b-2xl"
            :class="toast.type === 'success' ? 'bg-green-400' : 'bg-red-400'"
            :style="{ animation: `toast-progress ${toast.duration || 3500}ms linear forwards` }"
          />
        </div>
      </TransitionGroup>
    </div>
  </Teleport>
</template>

<script setup>
import { useToast } from '~/composables/useToast'
const { toasts, remove } = useToast()
</script>

<style scoped>
.toast-enter-active {
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.toast-leave-active {
  transition: all 0.25s ease-in;
}
.toast-enter-from {
  opacity: 0;
  transform: translateX(60px) scale(0.9);
}
.toast-leave-to {
  opacity: 0;
  transform: translateX(60px) scale(0.9);
}

@keyframes toast-progress {
  from { width: 100%; }
  to   { width: 0%; }
}
</style>
