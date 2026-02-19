<template>
    <div class="min-h-screen bg-gradient-to-br from-yellow-50 via-amber-50 to-orange-50">
   
  
      <!-- Hero Section -->
      <section class="relative overflow-hidden pt-12 sm:pt-16 pb-16 sm:pb-20 md:pb-24 px-4 sm:px-6 lg:px-8">
        <div class="absolute inset-0 bg-gradient-to-br from-yellow-200/30 via-amber-200/20 to-orange-200/30 animate-pulse"></div>
        <div class="max-w-7xl mx-auto relative z-10">
          <div class="text-center">
            <h1 class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-gray-900 mb-4 sm:mb-6">
              Showcase Your Portfolio Excellence
            </h1>
            <p class="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 mb-6 sm:mb-8 max-w-3xl mx-auto leading-relaxed px-4 sm:px-0">
              Platform for managing portfolios for Software Engineering students at CMTC
              <span class="block mt-2">Collect your work, experience, and skills in one place</span>
            </p>
            <div class="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 mb-8 sm:mb-12 px-4 sm:px-0">
              <NuxtLink to="/auth/register" class="bg-gradient-to-r from-yellow-400 to-amber-500 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full text-base sm:text-lg font-semibold hover:shadow-2xl transition transform hover:scale-105">
                Create Portfolio Free
              </NuxtLink>
              <NuxtLink to="/dashboard/portfolio" class="bg-white text-gray-800 px-6 sm:px-8 py-3 sm:py-4 rounded-full text-base sm:text-lg font-semibold border-2 border-yellow-400 hover:bg-yellow-50 transition">
                View Examples
              </NuxtLink>
            </div>
            
            <div class="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6 lg:gap-8 max-w-4xl mx-auto px-4 sm:px-0">
              <div v-for="(stat, i) in stats" :key="i" class="bg-white/80 backdrop-blur-sm rounded-2xl p-3 sm:p-4 md:p-6 shadow-lg hover:shadow-xl transition">
                <div class="text-xl sm:text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-amber-600">
                  {{ stat.count }}
                </div>
                <div class="text-xs sm:text-sm md:text-base text-gray-600 mt-1">{{ stat.label }}</div>
              </div>
            </div>
          </div>
        </div>
      </section>
  
      <!-- Features Section -->
      <section id="features" class="py-12 sm:py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div class="max-w-7xl mx-auto">
          <div class="text-center mb-12 sm:mb-16">
            <h2 class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              ฟีเจอร์ที่<span class="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-amber-600">โดดเด่น</span>
            </h2>
            <p class="text-base sm:text-lg md:text-xl text-gray-600">ครบครันทุกฟังก์ชันสำหรับการจัดการผลงานของคุณ</p>
          </div>
          
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            <div v-for="(feature, i) in features" :key="i" class="group bg-gradient-to-br from-yellow-50 to-amber-50 rounded-2xl p-4 sm:p-6 md:p-8 hover:shadow-2xl transition transform hover:-translate-y-2">
              <div class="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-xl flex items-center justify-center text-white mb-4 group-hover:scale-110 transition">
                <component :is="feature.icon" class="w-6 h-6 sm:w-8 sm:h-8" />
              </div>
              <h3 class="text-lg sm:text-xl font-bold text-gray-900 mb-3">{{ feature.title }}</h3>
              <p class="text-sm sm:text-base text-gray-600 leading-relaxed">{{ feature.desc }}</p>
            </div>
          </div>
        </div>
      </section>
  
      <!-- Roles Section -->
      <section id="roles" class="py-12 sm:py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-yellow-50 to-amber-50">
        <div class="max-w-7xl mx-auto">
          <div class="text-center mb-12 sm:mb-16">
            <h2 class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              บทบาทใน<span class="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-amber-600">ระบบ</span>
            </h2>
            <p class="text-base sm:text-lg md:text-xl text-gray-600">4 บทบาทหลักที่ออกแบบมาเพื่อตอบสนองความต้องการทุกกลุ่ม</p>
          </div>
          
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <div v-for="(role, i) in roles" :key="i" class="bg-white rounded-2xl p-4 sm:p-6 shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2">
              <div :class="`w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br ${role.color} rounded-xl flex items-center justify-center text-white mb-4 mx-auto`">
                <component :is="role.icon" class="w-8 h-8 sm:w-12 sm:h-12" />
              </div>
              <h3 class="text-xl sm:text-2xl font-bold text-gray-900 text-center mb-4">{{ role.role }}</h3>
              <ul class="space-y-2">
                <li v-for="(feature, j) in role.features" :key="j" class="flex items-start">
                  <svg class="w-4 h-4 sm:w-5 sm:h-5 text-yellow-500 mt-0.5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                  </svg>
                  <span class="text-sm sm:text-base text-gray-600">{{ feature }}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
  
      <!-- Future Features -->
      <section class="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div class="max-w-7xl mx-auto">
          <div class="text-center mb-16">
            <h2 class="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              ฟีเจอร์ที่<span class="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-amber-600">กำลังมา</span>
            </h2>
            <p class="text-lg md:text-xl text-gray-600">ความคิดสร้างสรรค์ที่เรากำลังพัฒนาเพื่อคุณ</p>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div v-for="(feature, i) in futureFeatures" :key="i" class="bg-gradient-to-br from-yellow-50 to-amber-50 rounded-2xl p-6 border-2 border-dashed border-yellow-300 hover:border-yellow-500 transition">
              <div class="w-14 h-14 bg-yellow-200 rounded-lg flex items-center justify-center text-yellow-700 mb-4">
                <component :is="feature.icon" class="w-8 h-8" />
              </div>
              <h3 class="text-xl font-bold text-gray-900 mb-2">{{ feature.title }}</h3>
              <p class="text-gray-600">{{ feature.desc }}</p>
            </div>
          </div>
        </div>
      </section>
  
      <!-- Services Section -->
      <section id="services" class="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-yellow-100 to-amber-100">
        <div class="max-w-7xl mx-auto">
          <div class="text-center mb-16">
            <h2 class="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              บริการของ<span class="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-amber-600">เรา</span>
            </h2>
            <p class="text-lg md:text-xl text-gray-600">เราพร้อมสนับสนุนคุณในทุกขั้นตอน</p>
          </div>
          
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div v-for="(service, i) in services" :key="i" class="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2 text-center">
              <div class="w-20 h-20 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-full flex items-center justify-center text-white mb-4 mx-auto">
                <component :is="service.icon" class="w-10 h-10" />
              </div>
              <h3 class="text-xl font-bold text-gray-900 mb-2">{{ service.title }}</h3>
              <p class="text-gray-600">{{ service.desc }}</p>
            </div>
          </div>
        </div>
      </section>
  
      <!-- Tech Stack -->
      <section id="about" class="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div class="max-w-7xl mx-auto">
          <div class="text-center mb-16">
            <h2 class="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              เทคโนโลยีที่<span class="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-amber-600">ใช้พัฒนา</span>
            </h2>
            <p class="text-lg md:text-xl text-gray-600">สร้างด้วยเทคโนโลยีที่ทันสมัยและมั่นคง</p>
          </div>
          
          <div class="bg-gradient-to-br from-yellow-50 to-amber-50 rounded-3xl p-8 md:p-12 shadow-xl">
            <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 md:gap-8">
              <div v-for="(tech, i) in techStack" :key="i" class="bg-white rounded-xl p-4 text-center hover:shadow-lg transition transform hover:-translate-y-1">
                <div class="w-12 h-12 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-lg mx-auto mb-3 flex items-center justify-center text-white font-bold text-xl">
                  {{ tech.name[0] }}
                </div>
                <h4 class="font-bold text-gray-900 text-sm md:text-base">{{ tech.name }}</h4>
                <p class="text-xs md:text-sm text-gray-500">{{ tech.desc }}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
  
      <!-- CTA Section -->
      <section class="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-yellow-400 via-amber-500 to-orange-500">
        <div class="max-w-4xl mx-auto text-center">
          <h2 class="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
            พร้อมที่จะเริ่มต้นแล้วหรือยัง?
          </h2>
          <p class="text-lg md:text-xl text-white/90 mb-8">
            สร้าง Portfolio ของคุณวันนี้ และก้าวสู่โอกาสใหม่ในอาชีพการงาน
          </p>
          <div class="flex flex-col sm:flex-row justify-center gap-4">
            <NuxtLink to="/auth/register" class="bg-white text-yellow-600 px-8 py-4 rounded-full text-lg font-semibold hover:shadow-2xl transition transform hover:scale-105">
              สมัครใช้งานฟรี
            </NuxtLink>
            <NuxtLink to="/dashboard/aboutUs" class="bg-transparent border-2 border-white text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white hover:text-yellow-600 transition">
              ดูเพิ่มเติม
            </NuxtLink>
          </div>
        </div>
      </section>
  
      <!-- Footer -->
      <footer class="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div class="max-w-7xl mx-auto">
          <div class="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div class="flex items-center mb-4">
                <div class="w-10 h-10 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-lg flex items-center justify-center">
                  <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <span class="ml-3 text-xl font-bold">UPORT</span>
              </div>
              <p class="text-gray-400 text-sm">
                แพลตฟอร์มจัดการผลงานสำหรับนักศึกษาวิศวกรรมซอฟต์แวร์ CMTC
              </p>
            </div>
            
            <div>
              <h3 class="font-bold mb-4">Features</h3>
              <ul class="space-y-2 text-sm text-gray-400">
                <li><NuxtLink to="/dashboard/portfolio" class="hover:text-yellow-400 transition">Upload Portfolio</NuxtLink></li>
                <li><NuxtLink to="/dashboard/portfolio" class="hover:text-yellow-400 transition">Community</NuxtLink></li>
                <li><NuxtLink to="/dashboard/portfolio" class="hover:text-yellow-400 transition">Share & Comment</NuxtLink></li>
              </ul>
            </div>
            
            <div>
              <h3 class="font-bold mb-4">Support</h3>
              <ul class="space-y-2 text-sm text-gray-400">
                <li><NuxtLink to="/dashboard/aboutUs" class="hover:text-yellow-400 transition">Documentation</NuxtLink></li>
                <li><NuxtLink to="/dashboard/contact" class="hover:text-yellow-400 transition">Contact Us</NuxtLink></li>
                <li><NuxtLink to="/dashboard/aboutUs" class="hover:text-yellow-400 transition">FAQ</NuxtLink></li>
              </ul>
            </div>
            
            <div>
              <h3 class="font-bold mb-4">Connect</h3>
              <div class="flex space-x-4">
                <a href="https://github.com" target="_blank" class="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-yellow-500 transition">
                  <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
          
          <div class="border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2025 UPORT - Student Portfolio Management System. All rights reserved.</p>
            <p class="mt-2">Developed with MEAN Stack (MongoDB, NestJS, Vue 3, Node.js)</p>
          </div>
        </div>
      </footer>
    </div>
  </template>
  
<script setup>
import { ref } from 'vue'

const mobileMenuOpen = ref(false)

// Removed i18n functionality
  
  const stats = [
    { label: 'Students', count: '500+' },
    { label: 'Portfolios', count: '1,200+' },
    { label: 'Teachers', count: '50+' },
    { label: 'Companies', count: '100+' }
  ]
  
  const features = [
    {
      icon: 'Upload',
      title: 'อัปโหลดผลงานหลากหลาย',
      desc: 'รองรับไฟล์ PDF, รูปภาพ, พร้อมลิงก์ GitHub/GitLab'
    },
    {
      icon: 'BookOpen',
      title: 'จัดหมวดหมู่ผลงาน',
      desc: 'จัดระเบียบผลงานตามสายงานซอฟต์แวร์ที่คุณถนัด'
    },
    {
      icon: 'MessageCircle',
      title: 'Community & Comments',
      desc: 'แลกเปลี่ยนความคิดเห็นและรับ feedback จากเพื่อนและอาจารย์'
    },
    {
      icon: 'Users',
      title: 'แชร์ Portfolio',
      desc: 'แชร์ผลงานให้กับบริษัทหรืออาจารย์ที่ปรึกษาได้ง่ายๆ'
    },
    {
      icon: 'Shield',
      title: 'OTP Verification',
      desc: 'ระบบยืนยันตัวตนผ่าน OTP ด้วย Brevo ปลอดภัยสูง'
    },
    {
      icon: 'Award',
      title: 'Profile Customization',
      desc: 'ปรับแต่งโปรไฟล์ส่วนตัว พร้อมอัปโหลด Avatar'
    }
  ]
  
  const roles = [
    {
      role: 'Admin',
      icon: 'Shield',
      color: 'from-red-400 to-red-600',
      features: ['เข้าถึงทุกฟีเจอร์', 'จัดการผู้ใช้', 'สร้าง Company Account', 'ดูแลระบบทั้งหมด']
    },
    {
      role: 'Student',
      icon: 'Users',
      color: 'from-yellow-400 to-amber-500',
      features: ['สมัครสมาชิก', 'อัปโหลด Portfolio', 'ดูผลงานทั้งหมด', 'แสดงความคิดเห็น']
    },
    {
      role: 'Teacher',
      icon: 'BookOpen',
      color: 'from-blue-400 to-blue-600',
      features: ['สมัครสมาชิก', 'ดูผลงานนักศึกษา', 'ให้ Feedback', 'ติดตามความก้าวหน้า']
    },
    {
      role: 'Company',
      icon: 'Award',
      color: 'from-green-400 to-green-600',
      features: ['ค้นหาผลงานนักศึกษา', 'ดู Portfolio', 'ติดต่อนักศึกษา', 'รับสมัครงาน/ฝึกงาน']
    }
  ]
  
  const futureFeatures = [
    { icon: 'TrendingUp', title: 'Portfolio Ranking', desc: 'จัดอันดับผลงานที่ได้รับความนิยมสูงสุดในแต่ละเดือน' },
    { icon: 'Heart', title: 'Like System', desc: 'ระบบกดไลค์และจัดอันดับผลงานที่ได้รับความนิยม' },
    { icon: 'Bell', title: 'Notification System', desc: 'แจ้งเตือนเมื่อมี Comment, Like หรือผลงานขึ้นอันดับ' }
  ]
  
  const services = [
    { icon: 'BookOpen', title: 'Documentation', desc: 'เอกสารคู่มือที่ครบถ้วนและเข้าใจง่าย' },
    { icon: 'MessageCircle', title: 'User Feedback', desc: 'รับฟังความคิดเห็นเพื่อพัฒนาอย่างต่อเนื่อง' },
    { icon: 'Users', title: 'Community', desc: 'ชุมชนแลกเปลี่ยนความรู้และประสบการณ์' },
    { icon: 'Headphones', title: 'Support Team', desc: 'ทีมนักพัฒนาพร้อมช่วยเหลือตลอด 24/7' }
  ]
  
  const techStack = [
    { name: 'MongoDB', desc: 'Database' },
    { name: 'NestJS', desc: 'Backend' },
    { name: 'Vue 3', desc: 'Frontend' },
    { name: 'Nuxt 3', desc: 'Framework' },
    { name: 'Tailwind CSS', desc: 'Styling' },
    { name: 'Brevo', desc: 'Email OTP' }
  ]
  
  // Define icon components
  const iconComponents = {
    Upload: {
      template: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>'
    },
    BookOpen: {
      template: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>'
    },
    MessageCircle: {
      template: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>'
    },
    Users: {
      template: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>'
    },
    Shield: {
      template: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>'
    },
    Award: {
      template: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="7"></circle><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline></svg>'
    },
    TrendingUp: {
      template: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline></svg>'
    },
    Heart: {
      template: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>'
    },
    Bell: {
      template: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>'
    },
    Headphones: {
      template: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 18v-6a9 9 0 0 1 18 0v6"></path><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"></path></svg>'
    }
  }
  
  // Register icon components globally
  Object.keys(iconComponents).forEach(name => {
    if (typeof window !== 'undefined') {
      const app = getCurrentInstance()
      if (app) {
        app.appContext.app.component(name, iconComponents[name])
      }
    }
  })
  </script>