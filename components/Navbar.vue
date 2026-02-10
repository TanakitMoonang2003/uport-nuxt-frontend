<template>
  <nav class="bg-gradient-to-r from-white/95 to-amber-50/95 backdrop-blur-lg shadow-lg border-b border-amber-100 sticky top-0 z-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-18">
        <!-- Logo -->
        <NuxtLink :to="isAuthenticated ? '/landingpage' : '/'" class="flex items-center flex-shrink-0 group">
          <div
            class="w-12 h-12 bg-gradient-to-br from-yellow-400 via-amber-500 to-orange-500 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 transform group-hover:scale-105"
          >
            <svg
              class="w-7 h-7 text-white"
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
          <span class="ml-4 text-2xl font-bold bg-gradient-to-r from-gray-800 to-amber-600 bg-clip-text text-transparent group-hover:from-amber-600 group-hover:to-orange-600 transition-all duration-300">UPORT</span>
        </NuxtLink>
        
        <!-- Desktop Navigation -->
        <div class="hidden md:flex space-x-6 flex-1 justify-center">
          <template v-if="isAuthenticated">
            <NuxtLink
              to="/landingpage"
              class="relative px-4 py-2 text-gray-700 hover:text-amber-600 font-medium transition-all duration-300 hover:bg-amber-50 rounded-lg group"
            >
              <span class="relative z-10">Home</span>
              <div class="absolute inset-0 bg-gradient-to-r from-amber-100 to-yellow-100 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </NuxtLink>
            <NuxtLink 
              to="/dashboard/portfolio" 
              class="relative px-4 py-2 text-gray-700 hover:text-amber-600 font-medium transition-all duration-300 hover:bg-amber-50 rounded-lg group"
            >
              <span class="relative z-10">Portfolio</span>
              <div class="absolute inset-0 bg-gradient-to-r from-amber-100 to-yellow-100 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </NuxtLink>
            <NuxtLink 
              to="/dashboard/aboutUs" 
              class="relative px-4 py-2 text-gray-700 hover:text-amber-600 font-medium transition-all duration-300 hover:bg-amber-50 rounded-lg group"
            >
              <span class="relative z-10">About</span>
              <div class="absolute inset-0 bg-gradient-to-r from-amber-100 to-yellow-100 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </NuxtLink>
            <NuxtLink 
              to="/dashboard/contact" 
              class="relative px-4 py-2 text-gray-700 hover:text-amber-600 font-medium transition-all duration-300 hover:bg-amber-50 rounded-lg group"
            >
              <span class="relative z-10">Contact</span>
              <div class="absolute inset-0 bg-gradient-to-r from-amber-100 to-yellow-100 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </NuxtLink>
            <!-- Admin-only navigation -->
            <NuxtLink 
              v-if="user?.role === 'admin'"
              to="/dashboard/admin/users" 
              class="relative px-4 py-2 text-gray-700 hover:text-amber-600 font-medium transition-all duration-300 hover:bg-amber-50 rounded-lg group"
            >
              <span class="relative z-10">Manage Users</span>
              <div class="absolute inset-0 bg-gradient-to-r from-amber-100 to-yellow-100 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </NuxtLink>
            <NuxtLink 
              v-if="user?.role === 'admin'"
              to="/dashboard/admin/settings" 
              class="relative px-4 py-2 text-gray-700 hover:text-amber-600 font-medium transition-all duration-300 hover:bg-amber-50 rounded-lg group"
            >
              <span class="relative z-10">Admin Settings</span>
              <div class="absolute inset-0 bg-gradient-to-r from-amber-100 to-yellow-100 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </NuxtLink>
            <button
              @click="handleProfileClick"
              class="relative px-4 py-2 text-gray-700 hover:text-amber-600 font-medium transition-all duration-300 hover:bg-amber-50 rounded-lg group"
            >
              <span class="relative z-10">Profile</span>
              <div class="absolute inset-0 bg-gradient-to-r from-amber-100 to-yellow-100 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          </template>
          <template v-else>
            <NuxtLink
              to="/"
              class="relative px-4 py-2 text-gray-700 hover:text-amber-600 font-medium transition-all duration-300 hover:bg-amber-50 rounded-lg group"
            >
              <span class="relative z-10">Home</span>
              <div class="absolute inset-0 bg-gradient-to-r from-amber-100 to-yellow-100 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </NuxtLink>
            <NuxtLink 
              to="/dashboard/aboutUs" 
              class="relative px-4 py-2 text-gray-700 hover:text-amber-600 font-medium transition-all duration-300 hover:bg-amber-50 rounded-lg group"
            >
              <span class="relative z-10">About</span>
              <div class="absolute inset-0 bg-gradient-to-r from-amber-100 to-yellow-100 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </NuxtLink>
            <NuxtLink 
              to="/dashboard/contact" 
              class="relative px-4 py-2 text-gray-700 hover:text-amber-600 font-medium transition-all duration-300 hover:bg-amber-50 rounded-lg group"
            >
              <span class="relative z-10">Contact</span>
              <div class="absolute inset-0 bg-gradient-to-r from-amber-100 to-yellow-100 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </NuxtLink>
          </template>
        </div>
        

        <!-- Desktop Auth Buttons -->
        <div class="hidden md:flex items-center space-x-4">
       
          <template v-if="isAuthenticated">
            <!-- Notification Bell (for Admin/Teacher) -->
            <button 
              v-if="user?.role === 'admin' || user?.role === 'teacher'"
              @click="showNotifications = !showNotifications"
              class="relative p-3 text-gray-700 hover:text-amber-600 transition-all duration-300 hover:bg-amber-50 rounded-xl group"
            >
              <div class="relative">
                <svg class="w-6 h-6 transition-transform duration-300 group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                <span 
                  v-if="totalPendingCount > 0" 
                  class="absolute -top-2 -right-2 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center shadow-lg animate-pulse"
                >
                  {{ totalPendingCount }}
                </span>
              </div>
            </button>
            
            <span class="text-gray-700 hidden lg:inline font-medium bg-gradient-to-r from-gray-600 to-amber-600 bg-clip-text text-transparent">
              Welcome, {{ user?.username || 'User' }}
            </span>
            <button
              @click="handleLogout"
              class="px-4 py-2 text-gray-700 hover:text-white hover:bg-gradient-to-r hover:from-red-500 hover:to-red-600 transition-all duration-300 rounded-lg font-medium border border-gray-300 hover:border-red-500 hover:shadow-md"
            >
              Logout
            </button>
          </template>
          <template v-else>
            <NuxtLink
              to="/auth/login"
              class="relative px-4 py-2 text-gray-700 hover:text-amber-600 font-medium transition-all duration-300 hover:bg-amber-50 rounded-lg group"
            >
              <span class="relative z-10">Login</span>
              <div class="absolute inset-0 bg-gradient-to-r from-amber-100 to-yellow-100 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </NuxtLink>
            <NuxtLink
              to="/auth/register"
              class="bg-gradient-to-r from-yellow-400 via-amber-500 to-orange-500 text-white px-8 py-3 rounded-xl hover:shadow-xl transition-all duration-300 transform hover:scale-105 font-semibold border border-transparent hover:border-amber-300"
            >
              Get Started
            </NuxtLink>
          </template>
        </div>
        
        <!-- Notification Dropdown -->
        <div 
          v-if="showNotifications && isAuthenticated && (user?.role === 'admin' || user?.role === 'teacher')"
          class="absolute right-4 top-20 w-96 bg-white/95 backdrop-blur-lg rounded-2xl shadow-2xl border border-amber-100 z-50 transform transition-all duration-300 scale-100"
        >
          <div class="p-6 border-b border-amber-100 bg-gradient-to-r from-amber-50 to-yellow-50 rounded-t-2xl">
            <div class="flex items-center justify-between">
              <h3 class="text-xl font-bold bg-gradient-to-r from-gray-800 to-amber-600 bg-clip-text text-transparent">Notifications</h3>
              <div class="flex items-center space-x-2">
                <span class="px-3 py-1 bg-gradient-to-r from-amber-400 to-yellow-500 text-white text-sm font-medium rounded-full">
                  {{ totalPendingCount }} pending
                </span>
              </div>
            </div>
          </div>
          <div class="max-h-96 overflow-y-auto">
            <!-- Individual Teacher Requests -->
            <div 
              v-for="(teacher, index) in pendingTeachers" 
              :key="teacher._id"
              class="p-5 hover:bg-gradient-to-r hover:from-amber-50 hover:to-yellow-50 border-b border-amber-100 transition-all duration-300 group"
            >
              <div class="flex items-center justify-between">
                <div class="flex items-center">
                  <div class="h-12 w-12 rounded-full bg-gradient-to-r from-blue-400 to-blue-600 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
                    <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <div class="ml-4">
                    <p class="text-sm font-semibold text-gray-900 group-hover:text-amber-700 transition-colors duration-300">
                      Teacher Request - {{ teacher.firstName }} {{ teacher.lastName }}
                    </p>
                    <p class="text-xs text-gray-500 flex items-center mt-1">
                      <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {{ formatDate(teacher.createdAt) }}
                    </p>
                  </div>
                </div>
                <div class="flex items-center space-x-2">
                  <button
                    @click="showNotificationModal('teachers')"
                    class="text-xs bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
                  >
                    View Details
                  </button>
                  <button
                    @click="cancelNotification('teachers')"
                    class="text-xs bg-gradient-to-r from-gray-400 to-gray-500 text-white px-3 py-2 rounded-lg hover:from-gray-500 hover:to-gray-600 transition-all duration-300 shadow-md hover:shadow-lg"
                  >
                    Dismiss
                  </button>
                </div>
              </div>
            </div>
            
            <!-- Individual Company Requests -->
            <div 
              v-for="(company, index) in pendingCompanies" 
              :key="company._id"
              class="p-5 hover:bg-gradient-to-r hover:from-amber-50 hover:to-yellow-50 border-b border-amber-100 transition-all duration-300 group"
            >
              <div class="flex items-center justify-between">
                <div class="flex items-center">
                  <div class="h-12 w-12 rounded-full bg-gradient-to-r from-green-400 to-green-600 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
                    <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <div class="ml-4">
                    <p class="text-sm font-semibold text-gray-900 group-hover:text-amber-700 transition-colors duration-300">
                      Company Request - {{ company.companyName }}
                    </p>
                    <p class="text-xs text-gray-500 flex items-center mt-1">
                      <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {{ formatDate(company.createdAt) }}
                    </p>
                  </div>
                </div>
                <div class="flex items-center space-x-2">
                  <button
                    @click="showNotificationModal('companies')"
                    class="text-xs bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-2 rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
                  >
                    View Details
                  </button>
                  <button
                    @click="cancelNotification('companies')"
                    class="text-xs bg-gradient-to-r from-gray-400 to-gray-500 text-white px-3 py-2 rounded-lg hover:from-gray-500 hover:to-gray-600 transition-all duration-300 shadow-md hover:shadow-lg"
                  >
                    Dismiss
                  </button>
                </div>
              </div>
            </div>
            
            <!-- Individual Portfolio Requests -->
            <div 
              v-if="pendingPortfoliosCount > 0"
              class="p-5 hover:bg-gradient-to-r hover:from-amber-50 hover:to-yellow-50 border-b border-amber-100 transition-all duration-300 group"
            >
              <div class="flex items-center justify-between">
                <div class="flex items-center">
                  <div class="h-12 w-12 rounded-full bg-gradient-to-r from-purple-400 to-purple-600 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
                    <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                  </div>
                  <div class="ml-4">
                    <p class="text-sm font-semibold text-gray-900 group-hover:text-amber-700 transition-colors duration-300">
                      Portfolio Requests - {{ pendingPortfoliosCount }} pending
                    </p>
                    <p class="text-xs text-gray-500 flex items-center mt-1">
                      <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Waiting for approval
                    </p>
                  </div>
                </div>
                <div class="flex items-center space-x-2">
                  <NuxtLink
                    to="/dashboard/portfolio-approval"
                    class="text-xs bg-gradient-to-r from-purple-500 to-purple-600 text-white px-4 py-2 rounded-lg hover:from-purple-600 hover:to-purple-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
                    @click="showNotifications = false"
                  >
                    View Details
                  </NuxtLink>
                </div>
              </div>
            </div>
            
            <!-- No notifications -->
            <div v-if="totalPendingCount === 0" class="p-12 text-center">
              <div class="mx-auto w-20 h-20 bg-gradient-to-r from-gray-100 to-gray-200 rounded-full flex items-center justify-center mb-4">
                <svg class="h-10 w-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                </svg>
              </div>
              <p class="text-lg font-medium text-gray-600 mb-2">All caught up!</p>
              <p class="text-sm text-gray-500">No pending notifications at the moment.</p>
            </div>
          </div>
        </div>

        
        <!-- Mobile Menu Button with Notification Badge -->
        <div class="md:hidden flex items-center space-x-2">
          <!-- Mobile Notification Bell -->
          <button 
            v-if="isAuthenticated && (user?.role === 'admin' || user?.role === 'teacher')"
            @click="showNotifications = !showNotifications"
            class="relative p-2 text-gray-700 hover:text-yellow-600 transition"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            <span 
              v-if="totalPendingCount > 0" 
              class="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center"
            >
              {{ totalPendingCount }}
            </span>
          </button>
          
          <!-- Hamburger Menu -->
          <button
            @click="mobileMenuOpen = !mobileMenuOpen"
            class="p-2 rounded-lg text-gray-700 hover:text-yellow-600 hover:bg-yellow-50"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path v-if="!mobileMenuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
              <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
      
      <!-- Mobile Menu -->
      <div v-if="mobileMenuOpen" class="md:hidden py-4 border-t border-gray-200 bg-white">
        <div class="flex flex-col space-y-3">
          <template v-if="isAuthenticated">
            <!-- Mobile navigation for logged-in users -->
            <NuxtLink
              to="/landingpage"
              class="px-4 py-2 text-gray-700 hover:text-yellow-600 hover:bg-yellow-50 rounded-lg transition"
              @click="mobileMenuOpen = false"
              >Home</NuxtLink
            >
            <NuxtLink 
              to="/dashboard/portfolio" 
              class="px-4 py-2 text-gray-700 hover:text-yellow-600 hover:bg-yellow-50 rounded-lg transition"
              @click="mobileMenuOpen = false"
              >Portfolio</NuxtLink
            >
            <NuxtLink 
              to="/dashboard/aboutUs" 
              class="px-4 py-2 text-gray-700 hover:text-yellow-600 hover:bg-yellow-50 rounded-lg transition"
              @click="mobileMenuOpen = false"
              >About</NuxtLink
            >
            <NuxtLink 
              to="/dashboard/contact" 
              class="px-4 py-2 text-gray-700 hover:text-yellow-600 hover:bg-yellow-50 rounded-lg transition"
              @click="mobileMenuOpen = false"
              >Contact</NuxtLink
            >
            <!-- Admin/Teacher-specific mobile navigation -->
            <!-- Teacher Confirmations - Only for admin and teacher -->
            <NuxtLink 
              v-if="user?.role === 'admin' || user?.role === 'teacher'"
              to="/dashboard/teacher-confirmations" 
              class="px-4 py-2 text-gray-700 hover:text-yellow-600 hover:bg-yellow-50 rounded-lg transition"
              @click="mobileMenuOpen = false"
              >Teacher Confirmations</NuxtLink
            >
            <!-- Company Approvals - Only for admin and teacher -->
            <NuxtLink 
              v-if="user?.role === 'admin' || user?.role === 'teacher'"
              to="/dashboard/company-approvals" 
              class="px-4 py-2 text-gray-700 hover:text-yellow-600 hover:bg-yellow-50 rounded-lg transition"
              @click="mobileMenuOpen = false"
              >Company Approvals</NuxtLink
            >
            <!-- Admin-only mobile navigation -->
            <NuxtLink 
              v-if="user?.role === 'admin'"
              to="/dashboard/admin/users" 
              class="px-4 py-2 text-gray-700 hover:text-yellow-600 hover:bg-yellow-50 rounded-lg transition"
              @click="mobileMenuOpen = false"
              >Manage Users</NuxtLink
            >
            <NuxtLink 
              v-if="user?.role === 'admin'"
              to="/dashboard/admin/user-approvals" 
              class="px-4 py-2 text-gray-700 hover:text-yellow-600 hover:bg-yellow-50 rounded-lg transition"
              @click="mobileMenuOpen = false"
              >User Approvals</NuxtLink
            >
            <NuxtLink 
              v-if="user?.role === 'admin'"
              to="/dashboard/admin/settings" 
              class="px-4 py-2 text-gray-700 hover:text-yellow-600 hover:bg-yellow-50 rounded-lg transition"
              @click="mobileMenuOpen = false"
              >Admin Settings</NuxtLink
            >
            <button
              @click="handleProfileClick(); mobileMenuOpen = false"
              class="text-left px-4 py-2 text-gray-700 hover:text-yellow-600 hover:bg-yellow-50 rounded-lg transition"
            >
              Profile
            </button>
          </template>
          <template v-else>
            <!-- Mobile navigation for non-logged-in users -->
            <NuxtLink
              to="/"
              class="px-4 py-2 text-gray-700 hover:text-yellow-600 hover:bg-yellow-50 rounded-lg transition"
              @click="mobileMenuOpen = false"
              >Home</NuxtLink
            >
            <NuxtLink 
              to="/dashboard/aboutUs" 
              class="px-4 py-2 text-gray-700 hover:text-yellow-600 hover:bg-yellow-50 rounded-lg transition"
              @click="mobileMenuOpen = false"
              >About</NuxtLink
            >
            <NuxtLink 
              to="/dashboard/contact" 
              class="px-4 py-2 text-gray-700 hover:text-yellow-600 hover:bg-yellow-50 rounded-lg transition"
              @click="mobileMenuOpen = false"
              >Contact</NuxtLink
            >
          </template>
          
          <!-- Auth Section in Mobile Menu -->
          <div class="pt-4 mt-2 border-t border-gray-200 space-y-3">
            <template v-if="isAuthenticated">
              <div class="px-4 py-2 text-gray-600 bg-gray-50 rounded-lg text-sm">
                <span class="text-xs text-gray-500">Logged in as</span>
                <div class="font-medium text-gray-800">{{ user?.username || 'User' }}</div>
              </div>
              <button
                @click="handleLogout(); mobileMenuOpen = false"
                class="w-full px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition text-center font-medium"
              >
                Logout
              </button>
            </template>
            <template v-else>
              <NuxtLink
                to="/auth/login"
                class="block w-full px-4 py-2 text-center text-gray-700 hover:text-yellow-600 hover:bg-yellow-50 rounded-lg transition font-medium"
                @click="mobileMenuOpen = false"
              >
                Login
              </NuxtLink>
              <NuxtLink
                to="/auth/register"
                class="block w-full bg-gradient-to-r from-yellow-400 to-amber-500 text-white px-4 py-2.5 rounded-lg hover:shadow-lg transition transform hover:scale-[1.02] text-center font-medium"
                @click="mobileMenuOpen = false"
              >
                Get Started
              </NuxtLink>
            </template>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useAuth } from '~/composables/useAuth'

const mobileMenuOpen = ref(false)
const showNotifications = ref(false)
const pendingTeachersCount = ref(0)
const pendingCompaniesCount = ref(0)
const pendingPortfoliosCount = ref(0)

// Modal state
const showModal = ref(false)
const modalType = ref('')
const modalTitle = ref('')
const isLoading = ref(false)
const errorMessage = ref('')
const pendingTeachers = ref([])
const pendingCompanies = ref([])
const processingTeacher = ref(null)
const processingCompany = ref(null)

// Use authentication composable
const { user, token, isAuthenticated, logout, forceUpdate } = useAuth()

// Use modal composable
const { openModal } = useModal()

// Debug authentication state (only in client-side)
if (import.meta.client) {
  console.log('=== NAVBAR AUTH STATE ===');
  console.log('isAuthenticated:', isAuthenticated.value);
  console.log('user:', user.value);
  console.log('token exists:', !!token.value);
  console.log('Token value in Navbar:', token.value);
}

// Force reactivity check
const authDebug = computed(() => {
  // Only log in client-side
  if (import.meta.client) {
    console.log('=== NAVBAR AUTH COMPUTED ===');
    console.log('isAuthenticated.value:', isAuthenticated.value);
    console.log('user.value:', user.value);
    console.log('token.value exists:', !!token.value);
  }
  return {
    isAuth: isAuthenticated.value,
    user: user.value,
    hasToken: !!token.value
  }
})

const totalPendingCount = computed(() => {
  return pendingTeachersCount.value + pendingCompaniesCount.value + pendingPortfoliosCount.value
})

// Fetch pending notifications with actual data
const fetchPendingNotifications = async () => {
  if (!isAuthenticated.value || (user.value?.role !== 'admin' && user.value?.role !== 'teacher')) {
    console.log('Skipping notification fetch - not authenticated or not admin/teacher');
    return
  }

  // Get token from multiple sources
  let authToken = token.value;
  if (!authToken && import.meta.client) {
    authToken = localStorage.getItem('auth_token');
  }
  if (!authToken && import.meta.client) {
    const cookieToken = document.cookie
      .split('; ')
      .find(row => row.startsWith('token='))
      ?.split('=')[1];
    authToken = cookieToken;
  }

  if (!authToken) {
    console.log('No token available for API calls');
    return
  }

  try {
    console.log('Fetching notifications with token:', authToken?.substring(0, 20) + '...');
    
    // Fetch pending teachers
    const teachersResponse = await $fetch('/api/teacher-confirmations', {
      method: 'GET',
      baseURL: 'http://localhost:3001',
      headers: {
        'Authorization': `Bearer ${authToken}`,
        'Content-Type': 'application/json',
      }
    })

    if (teachersResponse.success) {
      pendingTeachers.value = teachersResponse.data.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
      pendingTeachersCount.value = teachersResponse.data.length
      console.log('Pending teachers fetched:', pendingTeachers.value);
    }

    // Fetch pending companies
    const companiesResponse = await $fetch('/api/company-approvals', {
      method: 'GET',
      baseURL: 'http://localhost:3001',
      headers: {
        'Authorization': `Bearer ${authToken}`,
        'Content-Type': 'application/json',
      }
    })

    if (companiesResponse.success) {
      pendingCompanies.value = companiesResponse.data.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
      pendingCompaniesCount.value = companiesResponse.data.length
      console.log('Pending companies fetched:', pendingCompanies.value);
    }

    // Fetch pending portfolios
    const portfoliosResponse = await $fetch('/api/portfolio/pending', {
      method: 'GET',
      baseURL: 'http://localhost:3001',
      headers: {
        'Authorization': `Bearer ${authToken}`,
        'Content-Type': 'application/json',
      }
    })

    if (portfoliosResponse.success) {
      pendingPortfoliosCount.value = portfoliosResponse.data.length
      console.log('Pending portfolios fetched:', portfoliosResponse.data);
    }
  } catch (error) {
    console.error('Error fetching notifications:', error)
    console.error('Error details:', {
      message: error.message,
      status: error.status,
      statusText: error.statusText
    });
  }
}

// Test backend connection
const testBackendConnection = async () => {
  try {
    console.log('Testing backend connection...');
    const response = await $fetch('/api/test', {
      method: 'GET',
      baseURL: 'http://localhost:3001',
    });
    console.log('Backend connection test result:', response);
  } catch (error) {
    console.error('Backend connection test failed:', error);
  }
}

// Fetch on mount and every 30 seconds
onMounted(() => {
  if (import.meta.client) {
    console.log('=== NAVBAR MOUNTED ===');
    console.log('Initial auth state:', { isAuthenticated: isAuthenticated.value, user: user.value });
    console.log('Token from cookie on mount:', token.value);
    console.log('Force update value on mount:', forceUpdate.value);
    
    // Test backend connection first
    testBackendConnection()
    
    fetchPendingNotifications()
    setInterval(fetchPendingNotifications, 30000) // Refresh every 30 seconds
    
    // Force refresh auth state after a short delay
    setTimeout(() => {
      console.log('=== NAVBAR DELAYED CHECK ===');
      console.log('Delayed auth state:', { isAuthenticated: isAuthenticated.value, user: user.value });
      console.log('Token from cookie delayed:', token.value);
      console.log('Force update value delayed:', forceUpdate.value);
    }, 1000)
  }
})

// Watch for authentication state changes
watch([isAuthenticated, user], ([newIsAuthenticated, newUser]) => {
  // Only log in client-side
  if (import.meta.client) {
    console.log('=== NAVBAR AUTH WATCH ===');
    console.log('isAuthenticated changed:', newIsAuthenticated);
    console.log('user changed:', newUser);
    console.log('user role:', newUser?.role);
  }
  
    if (newIsAuthenticated && newUser) {
      if (import.meta.client) {
        console.log('✅ User is authenticated and user data exists');
      }
      
      if (newUser.role === 'admin' || newUser.role === 'teacher') {
        if (import.meta.client) {
          console.log('Admin/Teacher detected - fetching notifications');
        }
        // Add delay to ensure token is available
        setTimeout(() => {
          fetchPendingNotifications()
        }, 1000)
      }
      
      // Log admin navigation visibility (only in client)
      if (import.meta.client) {
        if (newUser.role === 'admin') {
          console.log('🎯 ADMIN NAVIGATION SHOULD BE VISIBLE');
        } else {
          console.log('❌ Admin navigation hidden - user role:', newUser.role);
        }
      }
    } else {
      if (import.meta.client) {
        console.log('❌ User not authenticated or no user data');
      }
      // Reset notification counts when not authenticated
      pendingTeachersCount.value = 0
      pendingCompaniesCount.value = 0
      pendingPortfoliosCount.value = 0
    }
}, { immediate: true })

const handleProfileClick = () => {
  // ถ้ามี user ให้ไปหน้า profile ถ้าไม่มีให้ไปหน้า login
  if (isAuthenticated.value) {
    navigateTo('/dashboard/profile')
  } else {
    navigateTo('/auth/login')
  }
}

const handleLogout = async () => {
  // Use logout from useAuth composable
  console.log('=== NAVBAR LOGOUT CLICKED ===');
  showNotifications.value = false
  await logout()
}

const forceRefresh = () => {
  console.log('=== FORCE REFRESH CLICKED ===');
  console.log('Current auth state:', { isAuthenticated: isAuthenticated.value, user: user.value });
  console.log('Current token from useAuth:', token.value);
  console.log('Current forceUpdate value:', forceUpdate.value);
  
  // Force re-read the token
  const currentToken = useCookie('token');
  console.log('Current token from cookie:', currentToken.value);
  
  // Check all cookies and localStorage
  console.log('=== ALL COOKIES & STORAGE DEBUG ===');
  console.log('Document cookies:', document.cookie);
  console.log('Token cookie value:', currentToken.value);
  console.log('Cookie consent value:', useCookie('cookie_consent').value);
  console.log('localStorage auth_token:', localStorage.getItem('auth_token'));
  console.log('localStorage keys:', Object.keys(localStorage));
  
  // Force reactivity update by incrementing forceUpdate
  if (currentToken.value) {
    console.log('Token exists, forcing reactivity update...');
    forceUpdate.value++
    console.log('Force update incremented to:', forceUpdate.value);
    
    // Trigger reactivity by accessing the computed values
    const authState = isAuthenticated.value;
    const userData = user.value;
    console.log('After force refresh:', { authState, userData });
    console.log('Token after force refresh:', token.value);
  } else {
    console.log('No token found in cookie');
  }
}

// Modal functions
const showNotificationModal = async (type) => {
  console.log('Opening modal for:', type);
  showNotifications.value = false; // Close the notification dropdown
  
  try {
    if (type === 'teachers') {
      console.log('Fetching pending teachers...');
      const response = await $fetch('/api/admin/pending-teachers', {
        baseURL: 'http://localhost:3001'
      });
      console.log('Pending teachers response:', response);
      
      if (response.success) {
        pendingTeachers.value = response.data || [];
        console.log('Pending teachers set:', pendingTeachers.value);
        
        // Open global modal
        openModal({
          type: 'teachers',
          title: 'Teacher Registration Requests',
          data: pendingTeachers.value,
          loading: false,
          error: null
        });
      } else {
        console.error('Failed to fetch pending teachers:', response.error);
        openModal({
          type: 'teachers',
          title: 'Teacher Registration Requests',
          data: [],
          loading: false,
          error: response.error || 'Failed to load teacher requests'
        });
      }
    } else if (type === 'companies') {
      console.log('Fetching pending companies...');
      const response = await $fetch('/api/admin/pending-companies', {
        baseURL: 'http://localhost:3001'
      });
      console.log('Pending companies response:', response);
      
      if (response.success) {
        pendingCompanies.value = response.data || [];
        console.log('Pending companies set:', pendingCompanies.value);
        
        // Open global modal
        openModal({
          type: 'companies',
          title: 'Company Registration Requests',
          data: pendingCompanies.value,
          loading: false,
          error: null
        });
      } else {
        console.error('Failed to fetch pending companies:', response.error);
        openModal({
          type: 'companies',
          title: 'Company Registration Requests',
          data: [],
          loading: false,
          error: response.error || 'Failed to load company requests'
        });
      }
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    let errorMessage = 'Failed to load data';
    
    if (error.response) {
      errorMessage = `Server error: ${error.response.status} - ${error.response.statusText}`;
    } else if (error.message) {
      errorMessage = `Network error: ${error.message}`;
    }
    
    openModal({
      type: type,
      title: type === 'teachers' ? 'Teacher Registration Requests' : 'Company Registration Requests',
      data: [],
      loading: false,
      error: errorMessage
    });
  }
}

const closeModal = () => {
  showModal.value = false;
  modalType.value = '';
  modalTitle.value = '';
  errorMessage.value = '';
  pendingTeachers.value = [];
  pendingCompanies.value = [];
}

const cancelNotification = (type) => {
  console.log('Canceling notification for:', type);
  if (type === 'teachers') {
    pendingTeachersCount.value = 0;
  } else if (type === 'companies') {
    pendingCompaniesCount.value = 0;
  } else if (type === 'portfolios') {
    pendingPortfoliosCount.value = 0;
  }
  showNotifications.value = false;
}

const fetchModalData = async (type) => {
  isLoading.value = true;
  errorMessage.value = '';
  
  try {
    // Get token from multiple sources
    let authToken = token.value;
    if (!authToken && import.meta.client) {
      authToken = localStorage.getItem('auth_token');
    }
    if (!authToken && import.meta.client) {
      const cookieToken = document.cookie
        .split('; ')
        .find(row => row.startsWith('token='))
        ?.split('=')[1];
      authToken = cookieToken;
    }
    
    if (!authToken) {
      throw new Error('No authentication token found');
    }
    
    if (type === 'teachers') {
      const response = await $fetch('/api/teacher-confirmations', {
        method: 'GET',
        baseURL: 'http://localhost:3001',
        headers: {
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'application/json',
        }
      });
      
      if (response.success) {
        pendingTeachers.value = response.data;
        console.log('✅ Teachers fetched for modal:', response.data);
      } else {
        errorMessage.value = response.error || 'Failed to fetch teachers';
      }
    } else if (type === 'companies') {
      const response = await $fetch('/api/company-approvals', {
        method: 'GET',
        baseURL: 'http://localhost:3001',
        headers: {
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'application/json',
        }
      });
      
      if (response.success) {
        pendingCompanies.value = response.data;
        console.log('✅ Companies fetched for modal:', response.data);
      } else {
        errorMessage.value = response.error || 'Failed to fetch companies';
      }
    }
  } catch (error) {
    console.error('❌ Error fetching modal data:', error);
    if (error.status === 401) {
      errorMessage.value = 'Please login again';
    } else {
      errorMessage.value = 'Failed to fetch data. Please try again.';
    }
  } finally {
    isLoading.value = false;
  }
}

const confirmTeacher = async (teacherId, action) => {
  processingTeacher.value = teacherId;
  
  try {
    // Get token from multiple sources
    let authToken = token.value;
    if (!authToken && import.meta.client) {
      authToken = localStorage.getItem('auth_token');
    }
    if (!authToken && import.meta.client) {
      const cookieToken = document.cookie
        .split('; ')
        .find(row => row.startsWith('token='))
        ?.split('=')[1];
      authToken = cookieToken;
    }
    
    if (!authToken) {
      throw new Error('No authentication token found');
    }
    
    const response = await $fetch('/api/teacher-confirmations', {
      method: 'POST',
      baseURL: 'http://localhost:3001',
      headers: {
        'Authorization': `Bearer ${authToken}`,
        'Content-Type': 'application/json',
      },
      body: {
        teacherId,
        action
      }
    });

    if (response.success) {
      // Remove the teacher from the list
      pendingTeachers.value = pendingTeachers.value.filter(t => t._id !== teacherId);
      pendingTeachersCount.value = Math.max(0, pendingTeachersCount.value - 1);
      console.log('✅ Teacher confirmation processed:', response.message);
    } else {
      errorMessage.value = response.error || 'Failed to process teacher confirmation';
    }
  } catch (error) {
    console.error('❌ Error processing teacher confirmation:', error);
    if (error.status === 401) {
      errorMessage.value = 'Please login again';
    } else {
      errorMessage.value = 'Failed to process teacher confirmation. Please try again.';
    }
  } finally {
    processingTeacher.value = null;
  }
}

const confirmCompany = async (companyId, action) => {
  processingCompany.value = companyId;
  
  try {
    // Get token from multiple sources
    let authToken = token.value;
    if (!authToken && import.meta.client) {
      authToken = localStorage.getItem('auth_token');
    }
    if (!authToken && import.meta.client) {
      const cookieToken = document.cookie
        .split('; ')
        .find(row => row.startsWith('token='))
        ?.split('=')[1];
      authToken = cookieToken;
    }
    
    if (!authToken) {
      throw new Error('No authentication token found');
    }
    
    const response = await $fetch('/api/company-approvals', {
      method: 'POST',
      baseURL: 'http://localhost:3001',
      headers: {
        'Authorization': `Bearer ${authToken}`,
        'Content-Type': 'application/json',
      },
      body: {
        companyId,
        action
      }
    });

    if (response.success) {
      // Remove the company from the list
      pendingCompanies.value = pendingCompanies.value.filter(c => c._id !== companyId);
      pendingCompaniesCount.value = Math.max(0, pendingCompaniesCount.value - 1);
      console.log('✅ Company confirmation processed:', response.message);
    } else {
      errorMessage.value = response.error || 'Failed to process company confirmation';
    }
  } catch (error) {
    console.error('❌ Error processing company confirmation:', error);
    if (error.status === 401) {
      errorMessage.value = 'Please login again';
    } else {
      errorMessage.value = 'Failed to process company confirmation. Please try again.';
    }
  } finally {
    processingCompany.value = null;
  }
}

const getInitials = (firstName, lastName) => {
  if (!firstName && !lastName) return 'T';
  const first = firstName ? firstName.charAt(0).toUpperCase() : '';
  const last = lastName ? lastName.charAt(0).toUpperCase() : '';
  return first + last;
}

const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}
</script>