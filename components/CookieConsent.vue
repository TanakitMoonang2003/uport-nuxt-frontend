<template>
  <div
    v-if="showConsent"
    class="fixed bottom-0 left-0 right-0 z-[100] p-4 bg-white/95 backdrop-blur-lg border-t border-gray-200 shadow-2xl transform transition-transform duration-300"
    :class="showConsent ? 'translate-y-0' : 'translate-y-full'"
  >
    <div class="max-w-7xl mx-auto">
      <div class="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <!-- Cookie Icon and Message -->
        <div class="flex items-start gap-4 flex-1">
          <div class="flex-shrink-0">
            <svg class="w-12 h-12 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              <circle cx="12" cy="12" r="1" fill="currentColor" />
              <circle cx="8" cy="10" r="1" fill="currentColor" />
              <circle cx="16" cy="14" r="1" fill="currentColor" />
              <circle cx="9" cy="15" r="1" fill="currentColor" />
            </svg>
          </div>
          <div class="flex-1">
            <h3 class="text-lg font-semibold text-gray-900 mb-1">🍪 We use cookies</h3>
            <p class="text-sm text-gray-600 leading-relaxed">
              We use cookies to keep you logged in and improve your experience. 
              By clicking "Accept", you consent to our use of cookies for authentication and functionality.
              <a href="#" class="text-amber-600 hover:text-amber-700 underline ml-1">Learn more</a>
            </p>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="flex items-center gap-3 w-full md:w-auto">
          <button
            @click="declineCookies"
            class="flex-1 md:flex-none px-6 py-2.5 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition font-medium"
          >
            Decline
          </button>
          <button
            @click="acceptCookies"
            class="flex-1 md:flex-none px-6 py-2.5 bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-500 hover:to-yellow-600 text-white rounded-lg transition font-medium shadow-md hover:shadow-lg transform hover:scale-105"
          >
            Accept All
          </button>
        </div>
      </div>

      <!-- Privacy Options (Collapsed by default) -->
      <div v-if="showDetails" class="mt-4 pt-4 border-t border-gray-200">
        <div class="space-y-3">
          <div class="flex items-center justify-between">
            <div>
              <h4 class="font-medium text-gray-900">Essential Cookies</h4>
              <p class="text-sm text-gray-600">Required for authentication and basic functionality</p>
            </div>
            <div class="text-green-600 font-medium">Always Active</div>
          </div>
        </div>
      </div>

      <!-- Toggle Details Button -->
      <button
        @click="showDetails = !showDetails"
        class="mt-3 text-sm text-gray-600 hover:text-gray-900 underline"
      >
        {{ showDetails ? 'Hide details' : 'Show details' }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const showConsent = ref(false)
const showDetails = ref(false)

// Cookie consent state
const cookieConsent = useCookie('cookie_consent', {
  maxAge: 60 * 60 * 24 * 365, // 1 year
  sameSite: 'lax',
  path: '/'
})

onMounted(() => {
  
  // Check both cookie and localStorage for consent
  let hasConsent = false
  
  // Check cookie first
  if (cookieConsent.value && cookieConsent.value !== '' && cookieConsent.value !== 'undefined' && cookieConsent.value !== 'null') {
    hasConsent = true
  }
  
  // Check localStorage as backup
  if (import.meta.client && !hasConsent) {
    const localStorageConsent = localStorage.getItem('cookie_consent')
    if (localStorageConsent && localStorageConsent === 'accepted') {
      hasConsent = true
      // Restore cookie from localStorage
      cookieConsent.value = 'accepted'
    }
  }
  
  if (hasConsent) {
    showConsent.value = false
  } else {
    setTimeout(() => {
      showConsent.value = true
    }, 500) // Small delay for better UX
  }
})

const acceptCookies = () => {
  
  // Set cookie consent
  cookieConsent.value = 'accepted'
  
  // Also set in localStorage as backup
  if (import.meta.client) {
    localStorage.setItem('cookie_consent', 'accepted')
  }
  
  // Hide popup
  showConsent.value = false
  
  
  // Emit event so other components know consent was given
  if (import.meta.client) {
    window.dispatchEvent(new CustomEvent('cookie-consent', { detail: 'accepted' }))
  }
  
  // Force page refresh to ensure state is properly updated
  setTimeout(() => {
    if (import.meta.client) {
      window.location.reload()
    }
  }, 100)
}

const declineCookies = () => {
  
  cookieConsent.value = 'declined'
  
  // Also set in localStorage as backup
  if (import.meta.client) {
    localStorage.setItem('cookie_consent', 'declined')
  }
  
  showConsent.value = false
  
  // Clear any existing auth tokens
  const token = useCookie('token')
  token.value = null
  
  // Emit event
  if (import.meta.client) {
    window.dispatchEvent(new CustomEvent('cookie-consent', { detail: 'declined' }))
  }
  
  // Force page refresh to ensure state is properly updated
  setTimeout(() => {
    if (import.meta.client) {
      window.location.reload()
    }
  }, 100)
}

// Expose method to check consent
const hasConsent = () => {
  return cookieConsent.value === 'accepted'
}

// Expose consent state
defineExpose({
  hasConsent
})
</script>

<style scoped>
/* Additional animations */
@keyframes slideUp {
  from {
    transform: translateY(100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.transform.transition-transform {
  animation: slideUp 0.3s ease-out;
}
</style>

