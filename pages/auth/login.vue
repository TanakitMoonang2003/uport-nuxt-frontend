<template>
  <div class="min-h-screen flex">
    <!-- Left Side - Dark Section -->
    <div
      class="w-1/2 bg-gradient-to-br from-amber-900 via-yellow-900 to-amber-950 flex items-center justify-center p-12"
    >
      <div class="text-white">
        <h1 class="text-6xl font-bold mb-6">UPORT</h1>
        <p class="text-xl text-amber-100 leading-relaxed">
          Showcase your portfolio, experience, and skills<br />
          all in one place to apply for jobs or internships with confidence.
        </p>
      </div>
    </div>

    <!-- Right Side - Login Form -->
    <div class="w-1/2 bg-white flex items-center justify-center p-12">
      <div class="w-full max-w-md">
        <!-- Logo -->
        <div class="flex items-center justify-center mb-12">
          <div class="flex items-center gap-2">
            <div class="flex gap-1">
              <div
                class="w-3 h-8 bg-gradient-to-b from-amber-400 to-yellow-500 rounded-sm"
              ></div>
              <div
                class="w-3 h-8 bg-gradient-to-b from-yellow-400 to-amber-500 rounded-sm"
              ></div>
              <div
                class="w-3 h-8 bg-gradient-to-b from-yellow-300 to-yellow-400 rounded-sm"
              ></div>
            </div>
            <span class="text-2xl font-bold text-gray-900">UPORT</span>
          </div>
        </div>

        <!-- Title -->
        <h2 class="text-center text-gray-800 text-lg mb-8">
          Sign in to access your account
        </h2>

        <!-- Form -->
        <form @submit.prevent="handleSubmit" class="space-y-6">
          <!-- Email Field -->
          <div>
            <label for="email" class="block text-sm text-gray-700 mb-2">
              Email
            </label>
            <input
              id="email"
              v-model="email"
              type="email"
              placeholder="balomta@cmtc.ac.th"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition"
            />
          </div>

          <!-- Password Field -->
          <div>
            <div class="flex justify-between items-center mb-2">
              <label for="password" class="block text-sm text-gray-700">
                Password
              </label>
            </div>
            <div class="relative">
              <input
                id="password"
                v-model="password"
                :type="showPassword ? 'text' : 'password'"
                placeholder="Enter your password"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition pr-12"
              />
              <div class="justify-end flex mb-1">
                <a
                  href="#"
                  class="text-sm text-gray-500 hover:text-amber-600 transition"
                >
                  Forgot ?
                </a>
              </div>

              <button
                type="button"
                @click="showPassword = !showPassword"
                class="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
              >
                <svg
                  v-if="!showPassword"
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
                <svg
                  v-else
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                  />
                </svg>
              </button>
            </div>
          </div>

          <!-- Error Message -->
          <div v-if="errorMessage" class="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
            {{ errorMessage }}
          </div>

          <!-- Submit Button -->
          <a href="" class="mt-2">
            <button
              type="submit"
              :disabled="isLoading"
              class="w-full bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-500 hover:to-yellow-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium py-3 px-4 rounded-lg transition shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            >
              <span v-if="isLoading" class="flex items-center justify-center">
                <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Logging in...
              </span>
              <span v-else>Log In</span>
            </button>
          </a>

          <!-- Login Link -->
          <div class="text-center text-sm text-gray-600">
            Don't Have An Account ?
            <NuxtLink
              to="/auth/register"
              class="text-amber-600 hover:text-amber-700 font-medium transition"
            >
              Register
            </NuxtLink>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

// Use auth layout (no navbar)
definePageMeta({
  layout: 'auth'
});

const email = ref("test@cmtc.ac.th"); // Admin user email
const password = ref("");
const showPassword = ref(false);

const errorMessage = ref('');
const isLoading = ref(false);

// Get cookie consent status and auth composable
const { hasConsent } = useCookieConsent();
const { setToken, forceUpdate, token, isAuthenticated, user } = useAuth();

// Debug auth instance
console.log('=== LOGIN AUTH INSTANCE ===');
console.log('Token value in login:', token.value);
console.log('Force update value in login:', forceUpdate.value);

const handleSubmit = async () => {
  console.log("=== LOGIN ATTEMPT ===");
  console.log("Email:", email.value);
  console.log("Password length:", password.value?.length);
  
  if (!email.value || !password.value) {
    errorMessage.value = 'Please fill in all fields';
    return;
  }

  if (isLoading.value) {
    return; // Prevent multiple submissions
  }

  errorMessage.value = '';
  isLoading.value = true;
  
  try {
    // Make API call to backend using axios
    const { $api } = useNuxtApp();
    const response = await $api.post('/auth/login', {
      email: email.value,
      password: password.value
    });

    console.log("Login response:", response);
    console.log("Login response.data:", response.data);
    console.log("Response success check:", response.data?.success);
    console.log("Response data type:", typeof response.data);

    if (response.data.success) {
      console.log('=== COOKIE CONSENT CHECK ===');
      console.log('hasConsent.value:', hasConsent.value);
      
      // Check if user has given cookie consent
      console.log('=== COOKIE CONSENT DETAILED CHECK ===');
      console.log('hasConsent.value:', hasConsent.value);
      console.log('Cookie consent cookie value:', useCookie('cookie_consent').value);
      
      if (!hasConsent.value) {
        console.log('❌ No cookie consent - cannot store token');
        console.log('⚠️ TEMPORARY BYPASS FOR TESTING - storing token anyway');
        // errorMessage.value = 'Please accept cookies to stay logged in. Check the cookie notice at the bottom of the page.';
        // return;
      } else {
        console.log('✅ Cookie consent given - proceeding with token storage');
      }

      // Store token using the setToken method from useAuth
      console.log('=== TOKEN STORAGE ===');
      console.log('Using setToken method from useAuth...');
      
      console.log('Token before setting:', response.data.token);
      console.log('Full response.data structure:', JSON.stringify(response.data, null, 2));
      console.log('response.data.data:', response.data.data);
      console.log('response.data.data.token:', response.data.data?.token);
      
      // Try to get token from nested data structure
      const tokenToStore = response.data.data?.token || response.data.token;
      console.log('Token to store:', tokenToStore);
      
      setToken(tokenToStore);
      console.log('Token set successfully via useAuth');
      console.log('Force update value after setToken:', forceUpdate.value);
      console.log('Token value after setToken:', token.value);
      
      // Wait a moment for reactivity to update
      await new Promise(resolve => setTimeout(resolve, 100));
      
      // Check auth state after setting token
      console.log('=== AUTH STATE CHECK AFTER LOGIN ===');
      console.log('isAuthenticated:', isAuthenticated.value);
      console.log('user:', user.value);
      console.log('token:', token.value);
      console.log('Is authenticated after setToken:', !!token.value);
      
      // Verify token is stored in cookie and localStorage
      const cookieToken = useCookie('token');
      console.log('Token in cookie after setToken:', cookieToken.value);
      console.log('Token in localStorage after setToken:', localStorage.getItem('auth_token'));
      console.log('localStorage keys after setToken:', Object.keys(localStorage));
      
      console.log('=== LOGIN SUCCESS ===');
      console.log('Full response:', response);
      console.log('Response data:', response.data);
      console.log('Token stored:', response.data.token);
      console.log('User role from response:', response.data.role);
      
      // Decode JWT token to check role
      try {
        const tokenParts = response.data.token.split('.');
        if (tokenParts.length === 3) {
          const payload = JSON.parse(atob(tokenParts[1]));
          console.log('=== USER ROLE INFO ===');
          console.log('User ID:', payload.userId);
          console.log('Username:', payload.username);
          console.log('Email:', payload.email);
          console.log('Role:', payload.role);
          console.log('Token expires:', new Date(payload.exp * 1000));
          
          // Log role-specific information
          if (payload.role === 'admin') {
            console.log('🎯 ADMIN USER DETECTED - Full access granted');
          } else if (payload.role === 'teacher') {
            console.log('👨‍🏫 TEACHER USER DETECTED - Teacher access granted');
          } else if (payload.role === 'user') {
            console.log('👤 REGULAR USER DETECTED - Standard access granted');
          } else {
            console.log('❓ UNKNOWN ROLE:', payload.role);
          }
        }
      } catch (error) {
        console.error('Error decoding JWT token:', error);
      }
      
      // Show success message
      errorMessage.value = '';
      
      // Redirect to dashboard page
      console.log('Redirecting to dashboard...');
      
      // Add small delay to ensure reactivity updates
      await new Promise(resolve => setTimeout(resolve, 100));
      
      // Use navigateTo for better SPA navigation
      await navigateTo('/dashboard', { replace: true });
    } else {
      console.error('Login failed:', response.data.error);
      errorMessage.value = response.data.error || 'Login failed';
    }
  } catch (error) {
    console.error('Login error:', error);
    
    // Handle specific error responses based on status codes
    if (error.response) {
      const status = error.response.status;
      const errorData = error.response.data;
      
      if (status === 401) {
        errorMessage.value = 'Email or Password something Wrong.';
      } else if (status === 403) {
        errorMessage.value = 'Wait for the teacher or administrator to click Agree.';
      } else {
        errorMessage.value = errorData?.error || 'An error occurred during login';
      }
    } else {
      errorMessage.value = error.message || 'An error occurred during login';
    }
  } finally {
    isLoading.value = false;
  }
};
</script>

<style scoped>
/* Additional custom styles if needed */
</style>
