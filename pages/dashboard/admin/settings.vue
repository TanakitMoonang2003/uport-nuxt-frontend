<template>
  <div class="min-h-screen bg-gray-50 py-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900">Admin Settings</h1>
        <p class="mt-2 text-gray-600">Configure system settings and preferences</p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- System Settings -->
        <div class="lg:col-span-2">
          <div class="bg-white rounded-lg shadow">
            <div class="px-6 py-4 border-b border-gray-200">
              <h2 class="text-lg font-medium text-gray-900">System Configuration</h2>
            </div>
            <div class="p-6 space-y-6">
              <!-- Registration Settings -->
              <div>
                <h3 class="text-md font-medium text-gray-900 mb-4">Registration Settings</h3>
                <div class="space-y-4">
                  <div class="flex items-center justify-between">
                    <div>
                      <label class="text-sm font-medium text-gray-700">Allow New Registrations</label>
                      <p class="text-sm text-gray-500">Allow new users to register accounts</p>
                    </div>
                    <label class="relative inline-flex items-center cursor-pointer">
                      <input
                        v-model="settings.allowRegistration"
                        type="checkbox"
                        class="sr-only peer"
                      />
                      <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-yellow-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-yellow-500"></div>
                    </label>
                  </div>

                  <div class="flex items-center justify-between">
                    <div>
                      <label class="text-sm font-medium text-gray-700">Require Email Verification</label>
                      <p class="text-sm text-gray-500">Users must verify their email before accessing the system</p>
                    </div>
                    <label class="relative inline-flex items-center cursor-pointer">
                      <input
                        v-model="settings.requireEmailVerification"
                        type="checkbox"
                        class="sr-only peer"
                      />
                      <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-yellow-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-yellow-500"></div>
                    </label>
                  </div>
                </div>
              </div>

              <!-- Security Settings -->
              <div>
                <h3 class="text-md font-medium text-gray-900 mb-4">Security Settings</h3>
                <div class="space-y-4">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Session Timeout (minutes)</label>
                    <input
                      v-model="settings.sessionTimeout"
                      type="number"
                      min="5"
                      max="1440"
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    />
                  </div>

                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Password Requirements</label>
                    <div class="space-y-2">
                      <label class="flex items-center">
                        <input
                          v-model="settings.passwordRequirements.minLength"
                          type="checkbox"
                          class="rounded border-gray-300 text-yellow-600 focus:ring-yellow-500"
                        />
                        <span class="ml-2 text-sm text-gray-700">Minimum 8 characters</span>
                      </label>
                      <label class="flex items-center">
                        <input
                          v-model="settings.passwordRequirements.requireUppercase"
                          type="checkbox"
                          class="rounded border-gray-300 text-yellow-600 focus:ring-yellow-500"
                        />
                        <span class="ml-2 text-sm text-gray-700">Require uppercase letters</span>
                      </label>
                      <label class="flex items-center">
                        <input
                          v-model="settings.passwordRequirements.requireNumbers"
                          type="checkbox"
                          class="rounded border-gray-300 text-yellow-600 focus:ring-yellow-500"
                        />
                        <span class="ml-2 text-sm text-gray-700">Require numbers</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Notification Settings -->
              <div>
                <h3 class="text-md font-medium text-gray-900 mb-4">Notification Settings</h3>
                <div class="space-y-4">
                  <div class="flex items-center justify-between">
                    <div>
                      <label class="text-sm font-medium text-gray-700">Email Notifications</label>
                      <p class="text-sm text-gray-500">Send email notifications for system events</p>
                    </div>
                    <label class="relative inline-flex items-center cursor-pointer">
                      <input
                        v-model="settings.emailNotifications"
                        type="checkbox"
                        class="sr-only peer"
                      />
                      <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-yellow-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-yellow-500"></div>
                    </label>
                  </div>

                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Notification Email</label>
                    <input
                      v-model="settings.notificationEmail"
                      type="email"
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                      placeholder="uport.collate@gmail.com"
                    />
                  </div>
                </div>
              </div>

              <!-- Save Button -->
              <div class="pt-6 border-t border-gray-200">
                <button
                  @click="saveSettings"
                  class="bg-yellow-500 text-white px-6 py-2 rounded-md hover:bg-yellow-600 transition"
                >
                  Save Settings
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Quick Stats -->
        <div class="space-y-6">
          <!-- System Status -->
          <div class="bg-white rounded-lg shadow">
            <div class="px-6 py-4 border-b border-gray-200">
              <h2 class="text-lg font-medium text-gray-900">System Status</h2>
            </div>
            <div class="p-6 space-y-4">
              <div class="flex items-center justify-between">
                <span class="text-sm font-medium text-gray-700">Database</span>
                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  Online
                </span>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-sm font-medium text-gray-700">API Server</span>
                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  Online
                </span>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-sm font-medium text-gray-700">Email Service</span>
                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                  Configured
                </span>
              </div>
            </div>
          </div>

          <!-- Recent Activity -->
          <div class="bg-white rounded-lg shadow">
            <div class="px-6 py-4 border-b border-gray-200">
              <h2 class="text-lg font-medium text-gray-900">Recent Activity</h2>
            </div>
            <div class="p-6">
              <div class="space-y-3">
                <div class="flex items-start space-x-3">
                  <div class="flex-shrink-0">
                    <div class="w-2 h-2 bg-green-400 rounded-full mt-2"></div>
                  </div>
                  <div class="flex-1 min-w-0">
                    <p class="text-sm text-gray-900">New user registered</p>
                    <p class="text-xs text-gray-500">2 minutes ago</p>
                  </div>
                </div>
                <div class="flex items-start space-x-3">
                  <div class="flex-shrink-0">
                    <div class="w-2 h-2 bg-blue-400 rounded-full mt-2"></div>
                  </div>
                  <div class="flex-1 min-w-0">
                    <p class="text-sm text-gray-900">Teacher approval processed</p>
                    <p class="text-xs text-gray-500">15 minutes ago</p>
                  </div>
                </div>
                <div class="flex items-start space-x-3">
                  <div class="flex-shrink-0">
                    <div class="w-2 h-2 bg-yellow-400 rounded-full mt-2"></div>
                  </div>
                  <div class="flex-1 min-w-0">
                    <p class="text-sm text-gray-900">System backup completed</p>
                    <p class="text-xs text-gray-500">1 hour ago</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Quick Actions -->
          <div class="bg-white rounded-lg shadow">
            <div class="px-6 py-4 border-b border-gray-200">
              <h2 class="text-lg font-medium text-gray-900">Quick Actions</h2>
            </div>
            <div class="p-6 space-y-3">
              <button
                @click="exportUsers"
                class="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md transition"
              >
                Export User Data
              </button>
              <button
                @click="clearCache"
                class="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md transition"
              >
                Clear System Cache
              </button>
              <button
                @click="runBackup"
                class="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md transition"
              >
                Run System Backup
              </button>
              <button
                @click="viewLogs"
                class="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md transition"
              >
                View System Logs
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useAuth } from '~/composables/useAuth'

// Check if user is admin
const { user, isAuthenticated } = useAuth()

// Redirect if not admin
if (!isAuthenticated.value || user.value?.role !== 'admin') {
  navigateTo('/dashboard/portfolio')
}

// Settings state
const settings = ref({
  allowRegistration: true,
  requireEmailVerification: false,
  sessionTimeout: 60,
  passwordRequirements: {
    minLength: true,
    requireUppercase: true,
    requireNumbers: true
  },
  emailNotifications: true,
  notificationEmail: 'uport.collate@gmail.com'
})

// Methods
const saveSettings = async () => {
  try {
    // API call to save settings
    console.log('Saving settings:', settings.value)
    // Show success message
    alert('Settings saved successfully!')
  } catch (error) {
    console.error('Error saving settings:', error)
    alert('Error saving settings. Please try again.')
  }
}

const exportUsers = () => {
  console.log('Exporting users...')
  // Implement user export functionality
}

const clearCache = () => {
  console.log('Clearing cache...')
  // Implement cache clearing
}

const runBackup = () => {
  console.log('Running backup...')
  // Implement backup functionality
}

const viewLogs = () => {
  console.log('Viewing logs...')
  // Implement log viewing
}

// Lifecycle
onMounted(() => {
  // Load settings from API
  console.log('Loading admin settings...')
})
</script>
