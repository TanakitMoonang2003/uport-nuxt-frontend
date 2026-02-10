<template>
  <div
    class="min-h-screen bg-gradient-to-br from-yellow-50 via-amber-50 to-orange-50"
  >
    <!-- Navigation is handled by layout -->
    <!-- Header Section -->
    <div class="container mx-auto px-4 py-16">
      <div class="text-center mb-12">
        <h1 class="text-5xl font-bold text-amber-900 mb-4">ติดต่อเรา</h1>
        <p class="text-xl text-amber-700">เรายินดีรับฟังความคิดเห็นจากคุณ</p>
      </div>

      <div class="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
        <!-- Contact Form -->
        <div
          class="bg-white rounded-2xl shadow-xl p-8 border-2 border-yellow-200"
        >
          <h2 class="text-2xl font-semibold text-amber-900 mb-6">
            ส่งข้อความถึงเรา
          </h2>

          <form class="space-y-6">
            <div>
              <label class="block text-amber-800 font-medium mb-2"
                >ชื่อ - นามสกุล</label
              >
              <input
                type="text"
                class="w-full px-4 py-3 rounded-lg border-2 border-yellow-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition-all"
                placeholder="กรอกชื่อของคุณ"
              />
            </div>

            <div>
              <label class="block text-amber-800 font-medium mb-2">อีเมล</label>
              <input
                type="email"
                class="w-full px-4 py-3 rounded-lg border-2 border-yellow-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition-all"
                placeholder="example@email.com"
              />
            </div>

            <div>
              <label class="block text-amber-800 font-medium mb-2"
                >เบอร์โทรศัพท์</label
              >
              <input
                type="tel"
                class="w-full px-4 py-3 rounded-lg border-2 border-yellow-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition-all"
                placeholder="0xx-xxx-xxxx"
              />
            </div>

            <div>
              <label class="block text-amber-800 font-medium mb-2"
                >ข้อความ</label
              >
              <textarea
                rows="4"
                class="w-full px-4 py-3 rounded-lg border-2 border-yellow-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition-all resize-none"
                placeholder="เขียนข้อความของคุณที่นี่..."
              ></textarea>
            </div>

            <button
              type="submit"
              class="w-full bg-gradient-to-r from-yellow-400 to-amber-500 text-white font-semibold py-3 rounded-lg hover:from-yellow-500 hover:to-amber-600 transform hover:scale-105 transition-all shadow-lg"
            >
              ส่งข้อความ
            </button>
          </form>
        </div>

        <!-- Contact Information -->
        <div class="space-y-6">
          <!-- Map Card -->
          <div
            class="bg-white rounded-2xl shadow-xl p-8 border-2 border-yellow-200"
          >
            <h2 class="text-2xl font-semibold text-amber-900 mb-6">
              ข้อมูลติดต่อ
            </h2>

            <div class="space-y-6">
              <div class="flex items-start space-x-4">
                <div class="bg-yellow-100 p-3 rounded-lg">
                  <svg
                    class="w-6 h-6 text-amber-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 class="font-semibold text-amber-900 mb-1">ที่อยู่</h3>
                  <p class="text-amber-700">
                     เลขที่ 9 ถ.เวียงแก้ว ต.ศรีภูมิ อ.เมืองเชียงใหม่ <br />จ.เชียงใหม่ 50200
                  </p>
                </div>
              </div>

              <div class="flex items-start space-x-4">
                <div class="bg-yellow-100 p-3 rounded-lg">
                  <svg
                    class="w-6 h-6 text-amber-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 class="font-semibold text-amber-900 mb-1">โทรศัพท์</h3>
                  <p class="text-amber-700">053-217-708-9<br>089-123-4567</p>
                </div>
              </div>

              <div class="flex items-start space-x-4">
                <div class="bg-yellow-100 p-3 rounded-lg">
                  <svg
                    class="w-6 h-6 text-amber-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  
                </div>
                   <div>
                  <h3 class="font-semibold text-amber-900 mb-1">อีเมล</h3>
                  <p class="text-amber-700">uport.collate@gmail.com</p>
                </div>
                
              </div>

              <div class="flex items-start space-x-4">
                <div class="bg-yellow-100 p-3 rounded-lg">
                  <svg
                    class="w-6 h-6 text-amber-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 class="font-semibold text-amber-900 mb-1">เวลาทำการ</h3>
                  <p class="text-amber-700">
                    จันทร์ - ศุกร์: 09:00 - 18:00<br />เสาร์ - อาทิตย์: 10:00 -
                    16:00
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- Social Media -->
          <div
            class="bg-white rounded-2xl shadow-xl p-8 border-2 border-yellow-200"
          >
            <h2 class="text-2xl font-semibold text-amber-900 mb-6">
              ติดตามเรา
            </h2>
            <div class="flex space-x-4">
              <a
                href="https://www.facebook.com/profile.php?id=100057493567949"
                class="bg-yellow-100 hover:bg-yellow-200 p-3 rounded-lg transition-all transform hover:scale-110"
              >
                <svg
                  class="w-6 h-6 text-amber-600"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
                  />
                </svg>
              </a>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- Footer is handled by layout -->
</template>

<script setup>
// Set layout to dashboard to ensure navbar is shown
definePageMeta({
  layout: 'dashboard'
})
</script>
