<template>
  <footer
    class="bg-gradient-to-br from-gray-800 to-gray-900 text-white py-12 px-4"
  >
    <div class="max-w-7xl mx-auto">
      <div class="grid md:grid-cols-4 gap-8 mb-8">
        <div>
          <div class="flex items-center mb-4">
            <div
              class="w-10 h-10 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-lg flex items-center justify-center"
            >
              <svg
                class="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            <span class="ml-3 text-xl font-bold">UPORT</span>
          </div>
          <p class="text-gray-400">Transforming ideas into digital reality.</p>
        </div>
        <div>
          <h4 class="font-semibold mb-4 text-yellow-400">Quick Links</h4>
          <ul class="space-y-2 text-gray-400">
            <li>
              <NuxtLink to="/dashboard/aboutUs" class="hover:text-yellow-400 transition"
                >About Us</NuxtLink
              >
            </li>
            <li>
              <NuxtLink to="/dashboard/portfolio" class="hover:text-yellow-400 transition">Portfolio</NuxtLink>
            </li>
            <li>
              <NuxtLink to="/dashboard/contact" class="hover:text-yellow-400 transition">Contact</NuxtLink>
            </li>
            <li>
              <NuxtLink to="/profile" class="hover:text-yellow-400 transition">Profile</NuxtLink>
            </li>
          </ul>
        </div>
        <div>
          <h4 class="font-semibold mb-4 text-yellow-400">Services</h4>
          <ul class="space-y-2 text-gray-400">
            <li>
              <a href="#" class="hover:text-yellow-400 transition"
                >Web Development</a
              >
            </li>
            <li>
              <a href="#" class="hover:text-yellow-400 transition"
                >UI/UX Design</a
              >
            </li>
            <li>
              <a href="#" class="hover:text-yellow-400 transition">Marketing</a>
            </li>
            <li>
              <a href="#" class="hover:text-yellow-400 transition"
                >Consulting</a
              >
            </li>
          </ul>
        </div>
        <div>
          <h4 class="font-semibold mb-4 text-yellow-400">Contact</h4>
          <ul class="space-y-2 text-gray-400">
            <li class="flex items-center">
              <svg
                class="w-4 h-4 mr-2"
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
              info@yourbrand.com
            </li>
            <li class="flex items-center">
              <svg
                class="w-4 h-4 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
              +66 123 456 789
            </li>
            <li class="flex items-center">
              <svg
                class="w-4 h-4 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              Chiang Mai, Thailand
            </li>
          </ul>
        </div>
      </div>
      <div class="border-t border-gray-700 pt-8 text-center text-gray-400">
        <p>&copy; 2025 YourBrand. All rights reserved.</p>
      </div>
    </div>
  </footer>
</template>
