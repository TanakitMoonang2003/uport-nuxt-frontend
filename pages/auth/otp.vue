<template>
  <div
    class="min-h-screen bg-gradient-to-br from-amber-50 to-yellow-50 flex items-center justify-center p-6"
  >
    <div class="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
      <!-- Logo -->
      <div class="flex items-center justify-center mb-6">
        <div class="flex items-center gap-2">
          <div class="flex gap-1">
            <div
              class="w-2.5 h-7 bg-gradient-to-b from-amber-400 to-yellow-500 rounded-sm"
            ></div>
            <div
              class="w-2.5 h-7 bg-gradient-to-b from-yellow-400 to-amber-500 rounded-sm"
            ></div>
            <div
              class="w-2.5 h-7 bg-gradient-to-b from-yellow-300 to-yellow-400 rounded-sm"
            ></div>
          </div>
          <span class="text-2xl font-bold text-gray-900">UPORT</span>
        </div>
      </div>

      <!-- Icon -->
      <div class="flex justify-center mb-6">
        <div
          class="w-20 h-20 bg-gradient-to-br from-amber-100 to-yellow-100 rounded-full flex items-center justify-center"
        >
          <svg
            class="w-10 h-10 text-amber-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
        </div>
      </div>

      <!-- Title and Description -->
      <div class="text-center mb-8">
        <h2 class="text-2xl font-bold text-gray-900 mb-2">OTP Verification</h2>
        <p class="text-sm text-gray-600">
          Enter the OTP code sent to<br />
          <span class="font-medium text-gray-900">{{ email }}</span>
        </p>
      </div>

      <!-- OTP Input -->
      <form @submit.prevent="handleVerify" class="space-y-6">
        <div>
          <label class="block text-sm text-gray-700 mb-3 text-center"
            >Enter OTP Code</label
          >
          <div class="flex gap-3 justify-center">
            <input
              v-for="(digit, index) in otp"
              :key="index"
              :ref="(el) => (otpRefs[index] = el)"
              v-model="otp[index]"
              @input="handleInput(index, $event)"
              @keydown="handleKeyDown(index, $event)"
              @paste="handlePaste"
              type="text"
              maxlength="1"
              class="w-14 h-14 text-center text-2xl font-bold border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition"
            />
          </div>
        </div>

        <!-- Timer -->
        <div class="text-center">
          <p class="text-sm text-gray-600">
            <span v-if="timeLeft > 0">
              Code expires in
              <span class="font-bold text-amber-600">{{
                formatTime(timeLeft)
              }}</span>
            </span>
            <span v-else class="text-red-500 font-medium"> Code expired </span>
          </p>
        </div>

        <!-- Resend Button -->
        <div class="text-center">
          <button
            type="button"
            @click="resendOTP"
            :disabled="timeLeft > 0 || isResending"
            :class="[
              'text-sm font-medium transition',
              timeLeft > 0 || isResending
                ? 'text-gray-400 cursor-not-allowed'
                : 'text-amber-600 hover:text-amber-700',
            ]"
          >
            {{ isResending ? "Sending..." : "Didn't receive code? Resend" }}
          </button>
        </div>

        <!-- Verify Button -->
        <button
          type="submit"
          :disabled="!isOTPComplete || isVerifying"
          :class="[
            'w-full py-3 rounded-lg font-medium transition shadow-md transform',
            isOTPComplete && !isVerifying
              ? 'bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-500 hover:to-yellow-600 text-white hover:shadow-lg hover:-translate-y-0.5'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed',
          ]"
        >
          {{ isVerifying ? "Verifying..." : "Verify OTP" }}
        </button>

        <!-- Back to Login -->
        <div class="text-center">
          <a
            href="#"
            class="text-sm text-gray-600 hover:text-amber-600 transition"
          >
            ← Back to Login
          </a>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";

// Use auth layout (no navbar)
definePageMeta({
  layout: 'auth'
});

const email = ref("balomta@cmtc.ac.th");
const otp = ref(["", "", "", "", "", ""]);
const otpRefs = ref([]);
const timeLeft = ref(300); // 5 minutes in seconds
const isVerifying = ref(false);
const isResending = ref(false);
let timer = null;

const isOTPComplete = computed(() => {
  return otp.value.every((digit) => digit !== "");
});

const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, "0")}`;
};

const startTimer = () => {
  if (timer) clearInterval(timer);
  timeLeft.value = 300;
  timer = setInterval(() => {
    if (timeLeft.value > 0) {
      timeLeft.value--;
    } else {
      clearInterval(timer);
    }
  }, 1000);
};

const handleInput = (index, event) => {
  const value = event.target.value;

  // Only allow numbers
  if (value && !/^\d$/.test(value)) {
    otp.value[index] = "";
    return;
  }

  otp.value[index] = value;

  // Move to next input if value is entered
  if (value && index < 5) {
    otpRefs.value[index + 1]?.focus();
  }
};

const handleKeyDown = (index, event) => {
  // Move to previous input on backspace
  if (event.key === "Backspace" && !otp.value[index] && index > 0) {
    otpRefs.value[index - 1]?.focus();
  }

  // Move to next input on arrow right
  if (event.key === "ArrowRight" && index < 5) {
    otpRefs.value[index + 1]?.focus();
  }

  // Move to previous input on arrow left
  if (event.key === "ArrowLeft" && index > 0) {
    otpRefs.value[index - 1]?.focus();
  }
};

const handlePaste = (event) => {
  event.preventDefault();
  const pastedData = event.clipboardData.getData("text").trim();

  // Only process if pasted data is 6 digits
  if (/^\d{6}$/.test(pastedData)) {
    const digits = pastedData.split("");
    digits.forEach((digit, index) => {
      otp.value[index] = digit;
    });
    otpRefs.value[5]?.focus();
  }
};

const handleVerify = async () => {
  if (!isOTPComplete.value) return;

  isVerifying.value = true;

  try {
    const otpCode = otp.value.join("");
    
    const { $api } = useNuxtApp();
    const response = await $api.post('/auth/verify-otp', {
      email: email.value,
      otp: otpCode
    });

    if (response.success) {

      // Redirect to login page
      await navigateTo('/auth/login');
    } else {
      throw new Error(response.error || 'OTP verification failed');
    }
  } catch (error) {
    console.error("OTP verification error:", error);
    alert(`OTP verification failed: ${error.message}`);
  } finally {
    isVerifying.value = false;
  }
};

const resendOTP = async () => {
  if (timeLeft.value > 0 || isResending.value) return;

  isResending.value = true;

  try {

    
    const { $api } = useNuxtApp();
    const response = await $api.post('/auth/send-otp', {
      email: email.value
    });

    if (response.success) {
      // Clear current OTP
      otp.value = ["", "", "", "", "", ""];
      otpRefs.value[0]?.focus();
      
      alert("New OTP code has been sent!");
      startTimer();
    } else {
      throw new Error(response.error || 'Failed to resend OTP');
    }
  } catch (error) {
    console.error("Resend OTP error:", error);
    alert(`Failed to resend OTP: ${error.message}`);
  } finally {
    isResending.value = false;
  }
};

onMounted(() => {
  startTimer();
  otpRefs.value[0]?.focus();
});

onUnmounted(() => {
  if (timer) clearInterval(timer);
});
</script>
