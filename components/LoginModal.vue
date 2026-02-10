<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 overflow-y-auto">
    <!-- Backdrop -->
    <div class="fixed inset-0 bg-black bg-opacity-50 transition-opacity" @click="closeModal"></div>
    
    <!-- Modal -->
    <div class="flex min-h-full items-center justify-center p-4">
      <div class="relative bg-white rounded-2xl shadow-xl max-w-md w-full transform transition-all">
        <!-- Close Button -->
        <button
          @click="closeModal"
          class="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        
        <!-- Modal Content -->
        <div class="p-8">
          <!-- Header -->
          <div class="text-center mb-6">
            <div class="w-16 h-16 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h3 class="text-2xl font-bold text-gray-800 mb-2">Please Log In</h3>
            <p class="text-gray-600">You need to be logged in to view your profile</p>
          </div>
          
          <!-- Action Buttons -->
          <div class="space-y-4">
            <NuxtLink
              to="/auth/login"
              @click="closeModal"
              class="w-full bg-gradient-to-r from-yellow-400 to-amber-500 text-white font-semibold py-3 px-6 rounded-lg hover:from-yellow-500 hover:to-amber-600 transition-all transform hover:scale-105 flex items-center justify-center"
            >
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
              </svg>
              Login
            </NuxtLink>
            
            <NuxtLink
              to="/auth/register"
              @click="closeModal"
              class="w-full border-2 border-yellow-400 text-yellow-600 font-semibold py-3 px-6 rounded-lg hover:bg-yellow-50 transition-all flex items-center justify-center"
            >
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
              Create Account
            </NuxtLink>
          </div>
          
          <!-- Footer -->
          <div class="mt-6 text-center">
            <p class="text-sm text-gray-500">
              Don't have an account? 
              <NuxtLink to="/auth/register" @click="closeModal" class="text-yellow-600 hover:text-yellow-700 font-medium">
                Sign up here
              </NuxtLink>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['close'])

const closeModal = () => {
  emit('close')
}
</script>
