<template>
  <div v-if="!isAuthenticated">
    <!-- Landing page content for non-logged-in users -->
    <div
      class="min-h-screen bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50"
    >
      <!-- Hero Section -->
      <section id="home" class="relative py-20 px-4 overflow-hidden">
        <div
          class="absolute inset-0 bg-gradient-to-r from-yellow-200/30 to-amber-200/30 transform -skew-y-6"
        ></div>
        <div class="max-w-7xl mx-auto relative">
          <div class="grid md:grid-cols-2 gap-12 items-center">
            <div class="space-y-6">
              <h1
                class="text-5xl md:text-6xl font-bold text-gray-800 leading-tight"
              >
                Transform Your
                <span
                  class="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-amber-600"
                >
                  Digital Vision</span
                >
              </h1>
              <p class="text-lg text-gray-600">
                We deliver innovative solutions that help businesses thrive in the
                digital age. From concept to execution, we bring your ideas to
                life with cutting-edge technology and creative excellence.
              </p>
              <div class="flex flex-wrap gap-4">
                <NuxtLink
                  to="/auth/register"
                  class="bg-gradient-to-r from-yellow-400 to-amber-500 text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-lg transition transform hover:scale-105"
                >
                  Get Started
                </NuxtLink>
                <NuxtLink
                  to="/auth/login"
                  class="border-2 border-yellow-400 text-yellow-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-yellow-50 transition"
                >
                  Sign In
                </NuxtLink>
              </div>
            </div>
            <div class="relative">
              <div
                class="w-full h-96 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-2xl shadow-2xl transform rotate-3"
              ></div>
              <div
                class="absolute inset-0 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl shadow-2xl transform -rotate-3"
              ></div>
              <div
                class="absolute inset-0 bg-gradient-to-br from-orange-400 to-red-500 rounded-2xl shadow-2xl transform rotate-1"
              ></div>
            </div>
          </div>
        </div>
      </section>

      <!-- Features Section -->
      <section class="py-20 px-4">
        <div class="max-w-7xl mx-auto">
          <div class="text-center mb-16">
            <h2 class="text-4xl font-bold text-gray-800 mb-4">
              Why Choose Our Platform?
            </h2>
            <p class="text-xl text-gray-600">
              Discover the features that make us the perfect choice for your digital journey
            </p>
          </div>
          <div class="grid md:grid-cols-3 gap-8">
            <div class="text-center p-6">
              <div class="w-16 h-16 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 class="text-xl font-semibold text-gray-800 mb-2">Fast & Reliable</h3>
              <p class="text-gray-600">Lightning-fast performance with 99.9% uptime guarantee</p>
            </div>
            <div class="text-center p-6">
              <div class="w-16 h-16 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 class="text-xl font-semibold text-gray-800 mb-2">Secure</h3>
              <p class="text-gray-600">Enterprise-grade security to protect your data and privacy</p>
            </div>
            <div class="text-center p-6">
              <div class="w-16 h-16 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 class="text-xl font-semibold text-gray-800 mb-2">User Friendly</h3>
              <p class="text-gray-600">Intuitive interface designed for the best user experience</p>
            </div>
          </div>
        </div>
      </section>

      <!-- CTA Section -->
      <section class="py-20 px-4 bg-gradient-to-r from-yellow-400 to-amber-500">
        <div class="max-w-4xl mx-auto text-center">
          <h2 class="text-4xl font-bold text-white mb-4">
            Ready to Get Started?
          </h2>
          <p class="text-xl text-white/90 mb-8">
            Join thousands of users who trust our platform for their digital needs
          </p>
          <div class="flex flex-wrap justify-center gap-4">
            <NuxtLink
              to="/auth/register"
              class="bg-white text-yellow-600 px-8 py-4 rounded-full text-lg font-semibold hover:shadow-lg transition transform hover:scale-105"
            >
              Create Account
            </NuxtLink>
            <NuxtLink
              to="/auth/login"
              class="border-2 border-white text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white/10 transition"
            >
              Sign In
            </NuxtLink>
          </div>
        </div>
      </section>
    </div>
  </div>
  <div v-else>
    <!-- Redirect logged-in users to home page -->
    <div class="min-h-screen flex items-center justify-center">
      <div class="text-center">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500 mx-auto mb-4"></div>
        <p class="text-gray-600">Redirecting to home page...</p>
      </div>
    </div>
  </div>
</template>

<script setup>
// Check authentication status
const { isAuthenticated } = useAuth()

// Redirect logged-in users to home page (landing page)
onMounted(() => {
  if (isAuthenticated.value) {
    navigateTo('/landingpage', { replace: true })
  }
})
</script>