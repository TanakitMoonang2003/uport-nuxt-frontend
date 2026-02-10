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
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 class="text-2xl font-bold text-gray-800 mb-2">Verify Your Email</h3>
            <p class="text-gray-600">We've sent a 6-digit code to</p>
            <p class="text-yellow-600 font-semibold">{{ email }}</p>
          </div>
          
          <!-- OTP Input -->
          <div class="mb-6">
            <label class="block text-sm font-medium text-gray-700 mb-3">Enter verification code</label>
            <div class="flex justify-center space-x-3">
              <input
                v-for="(digit, index) in otpDigits"
                :key="index"
                v-model="otpDigits[index]"
                @input="handleOtpInput(index, $event)"
                @keydown="handleKeydown(index, $event)"
                type="text"
                maxlength="1"
                class="w-12 h-12 text-center text-2xl font-bold border-2 border-gray-300 rounded-lg focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 transition"
                :class="{ 'border-red-500': errorMessage }"
              />
            </div>
            <p v-if="errorMessage" class="text-red-500 text-sm mt-2 text-center">{{ errorMessage }}</p>
          </div>
          
          <!-- Action Buttons -->
          <div class="space-y-4">
            <button
              @click="verifyOTP"
              :disabled="!isOtpComplete || isLoading"
              class="w-full bg-gradient-to-r from-yellow-400 to-amber-500 text-white font-semibold py-3 px-6 rounded-lg hover:from-yellow-500 hover:to-amber-600 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              <span v-if="isLoading" class="flex items-center justify-center">
                <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Verifying...
              </span>
              <span v-else>Verify Email</span>
            </button>
            
            <button
              @click="resendOTP"
              :disabled="isResending"
              class="w-full border-2 border-yellow-400 text-yellow-600 font-semibold py-3 px-6 rounded-lg hover:bg-yellow-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span v-if="isResending" class="flex items-center justify-center">
                <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-yellow-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Resending...
              </span>
              <span v-else>Resend Code</span>
            </button>
          </div>
          
          <!-- Timer -->
          <div v-if="resendTimer > 0" class="mt-4 text-center">
            <p class="text-sm text-gray-500">
              Resend code in {{ resendTimer }}s
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false
  },
  email: {
    type: String,
    required: true
  }
})

const emit = defineEmits(['close', 'verified'])

const otpDigits = ref(['', '', '', '', '', ''])
const isLoading = ref(false)
const isResending = ref(false)
const errorMessage = ref('')
const resendTimer = ref(0)

const isOtpComplete = computed(() => {
  return otpDigits.value.every(digit => digit !== '')
})

const handleOtpInput = (index, event) => {
  const value = event.target.value
  if (value && !/^\d$/.test(value)) {
    event.target.value = ''
    return
  }
  
  otpDigits.value[index] = value
  
  if (value && index < 5) {
    // Move to next input
    const nextInput = event.target.parentElement.children[index + 1]
    if (nextInput) nextInput.focus()
  }
}

const handleKeydown = (index, event) => {
  if (event.key === 'Backspace' && !otpDigits.value[index] && index > 0) {
    // Move to previous input
    const prevInput = event.target.parentElement.children[index - 1]
    if (prevInput) prevInput.focus()
  }
}

const verifyOTP = async () => {
  if (!isOtpComplete.value) return
  
  isLoading.value = true
  errorMessage.value = ''
  
  try {
    const otp = otpDigits.value.join('')
    
    // Call OTP verification API
    const response = await $fetch('/api/auth/verify-otp', {
      method: 'POST',
      baseURL: 'http://localhost:3001',
      body: {
        email: props.email,
        otp: otp
      }
    })
    
    if (response.success) {
      emit('verified', response.data)
      closeModal()
    } else {
      errorMessage.value = response.error || 'Invalid verification code'
    }
  } catch (error) {
    console.error('OTP verification error:', error)
    errorMessage.value = 'Verification failed. Please try again.'
  } finally {
    isLoading.value = false
  }
}

const resendOTP = async () => {
  isResending.value = true
  
  try {
    const response = await $fetch('/api/auth/send-otp', {
      method: 'POST',
      baseURL: 'http://localhost:3001',
      body: {
        email: props.email
      }
    })
    
    if (response.success) {
      startResendTimer()
      errorMessage.value = ''
    } else {
      errorMessage.value = response.error || 'Failed to resend code'
    }
  } catch (error) {
    console.error('Resend OTP error:', error)
    errorMessage.value = 'Failed to resend code. Please try again.'
  } finally {
    isResending.value = false
  }
}

const startResendTimer = () => {
  resendTimer.value = 60
  const timer = setInterval(() => {
    resendTimer.value--
    if (resendTimer.value <= 0) {
      clearInterval(timer)
    }
  }, 1000)
}

const closeModal = () => {
  emit('close')
}

// Reset OTP when modal opens
watch(() => props.isOpen, (isOpen) => {
  if (isOpen) {
    otpDigits.value = ['', '', '', '', '', '']
    errorMessage.value = ''
    resendTimer.value = 0
  }
})
</script>
