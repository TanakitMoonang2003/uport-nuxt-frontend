<template>
  <Teleport to="body">
    <div 
      v-if="isOpen"
      class="fixed inset-0 bg-gray-600/80 flex items-center justify-center z-[9999] p-4"
      @click="closeModal"
    >
      <div 
        class="bg-white rounded-3xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden transform transition-all duration-300 scale-100 border border-gray-200"
        @click.stop
      >
        <!-- Modal Header -->
        <div class="flex items-center justify-between p-8 border-b border-amber-100 bg-gradient-to-r from-amber-50 to-yellow-50">
          <div class="flex items-center space-x-4">
            <div class="w-12 h-12 rounded-full flex items-center justify-center"
                 :class="modalData.type === 'teachers' ? 'bg-gradient-to-r from-blue-400 to-blue-600' : 'bg-gradient-to-r from-green-400 to-green-600'">
              <svg v-if="modalData.type === 'teachers'" class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <svg v-else class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <div>
              <h3 class="text-2xl font-bold bg-gradient-to-r from-gray-800 to-amber-600 bg-clip-text text-transparent">
                {{ modalData.title }}
              </h3>
              <p class="text-sm text-gray-600 mt-1">
                {{ modalData.type === 'teachers' ? 'Review and manage teacher registration requests' : 'Review and manage company registration requests' }}
              </p>
            </div>
          </div>
          <button
            @click="closeModal"
            class="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-all duration-300 hover:scale-110"
          >
            <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <!-- Modal Content -->
        <div class="p-8 overflow-y-auto max-h-[calc(90vh-180px)] bg-gray-50">
          <!-- Loading State -->
          <div v-if="modalData.loading" class="flex justify-center items-center py-16">
            <div class="flex flex-col items-center space-y-4">
              <div class="animate-spin rounded-full h-12 w-12 border-b-4 border-amber-500"></div>
              <p class="text-gray-600 font-medium">Loading notification details...</p>
            </div>
          </div>

          <!-- Error State -->
          <div v-else-if="modalData.error" class="text-center py-8">
            <div class="text-red-600 mb-2">
              <svg class="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p class="text-red-600">{{ modalData.error }}</p>
          </div>

          <!-- Teachers List -->
          <div v-else-if="modalData.type === 'teachers' && modalData.data && modalData.data.length > 0" class="space-y-6">
            <div
              v-for="teacher in modalData.data"
              :key="teacher._id"
              class="bg-white/80 backdrop-blur-sm border border-amber-200 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
            >
              <div class="flex items-center justify-between mb-4">
                <div class="flex items-center">
                  <div class="h-12 w-12 rounded-full bg-gradient-to-r from-amber-400 to-yellow-500 flex items-center justify-center">
                    <span class="text-white font-medium">
                      {{ getInitials(teacher.firstName, teacher.lastName) }}
                    </span>
                  </div>
                  <div class="ml-4">
                    <h4 class="text-lg font-medium text-gray-900">
                      {{ teacher.title || '' }} {{ teacher.firstName }} {{ teacher.lastName }}
                    </h4>
                    <p class="text-sm text-gray-500">{{ teacher.email }}</p>
                  </div>
                </div>
                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                  Pending
                </span>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div v-if="teacher.username">
                  <span class="text-sm font-medium text-gray-500">Username:</span>
                  <p class="text-sm text-gray-900">{{ teacher.username }}</p>
                </div>
                <div v-if="teacher.teacherId">
                  <span class="text-sm font-medium text-gray-500">Teacher ID:</span>
                  <p class="text-sm text-gray-900">{{ teacher.teacherId }}</p>
                </div>
                <div v-if="teacher.faculty">
                  <span class="text-sm font-medium text-gray-500">Faculty:</span>
                  <p class="text-sm text-gray-900">{{ teacher.faculty }}</p>
                </div>
                <div v-if="teacher.department">
                  <span class="text-sm font-medium text-gray-500">Department:</span>
                  <p class="text-sm text-gray-900">{{ teacher.department }}</p>
                </div>
                <div v-if="teacher.position">
                  <span class="text-sm font-medium text-gray-500">Position:</span>
                  <p class="text-sm text-gray-900">{{ teacher.position }}</p>
                </div>
                <div v-if="teacher.officeRoom">
                  <span class="text-sm font-medium text-gray-500">Office Room:</span>
                  <p class="text-sm text-gray-900">{{ teacher.officeRoom }}</p>
                </div>
                <div v-if="teacher.phone">
                  <span class="text-sm font-medium text-gray-500">Phone:</span>
                  <p class="text-sm text-gray-900">{{ teacher.phone }}</p>
                </div>
                <div v-if="teacher.officePhone">
                  <span class="text-sm font-medium text-gray-500">Office Phone:</span>
                  <p class="text-sm text-gray-900">{{ teacher.officePhone }}</p>
                </div>
              </div>

              <div v-if="teacher.specialization" class="mb-4">
                <span class="text-sm font-medium text-gray-500">Specialization:</span>
                <p class="text-sm text-gray-900">{{ teacher.specialization }}</p>
              </div>

              <div class="mb-4">
                <span class="text-sm font-medium text-gray-500">Registration Date:</span>
                <p class="text-sm text-gray-900">{{ formatDate(teacher.createdAt) }}</p>
              </div>

              <div class="flex space-x-3">
                <button
                  @click="handleTeacherAction(teacher._id, 'accept')"
                  :disabled="modalData.processing === teacher._id"
                  class="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-green-300 text-white text-sm font-medium py-2 px-4 rounded-lg transition"
                >
                  <span v-if="modalData.processing === teacher._id" class="flex items-center justify-center">
                    <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </span>
                  <span v-else class="flex items-center justify-center">
                    <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                    Confirm
                  </span>
                </button>
                <button
                  @click="handleTeacherAction(teacher._id, 'reject')"
                  :disabled="modalData.processing === teacher._id"
                  class="flex-1 bg-red-600 hover:bg-red-700 disabled:bg-red-300 text-white text-sm font-medium py-2 px-4 rounded-lg transition"
                >
                  <span v-if="modalData.processing === teacher._id" class="flex items-center justify-center">
                    <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </span>
                  <span v-else class="flex items-center justify-center">
                    <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    Cancel
                  </span>
                </button>
              </div>
            </div>
          </div>

          <!-- Companies List -->
          <div v-else-if="modalData.type === 'companies' && modalData.data && modalData.data.length > 0" class="space-y-6">
            <div
              v-for="company in modalData.data"
              :key="company._id"
              class="bg-white/80 backdrop-blur-sm border border-amber-200 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
            >
              <div class="flex items-center justify-between mb-4">
                <div class="flex items-center">
                  <div class="h-12 w-12 rounded-full bg-gradient-to-r from-green-400 to-emerald-500 flex items-center justify-center">
                        <span class="text-white font-medium">
                          {{ getCompanyInitials(company.companyName) }}
                        </span>
                  </div>
                  <div class="ml-4">
                    <h4 class="text-lg font-medium text-gray-900">{{ company.companyName }}</h4>
                    <p class="text-sm text-gray-500">{{ company.email }}</p>
                  </div>
                </div>
                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                  Pending
                </span>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div v-if="company.username">
                  <span class="text-sm font-medium text-gray-500">Username:</span>
                  <p class="text-sm text-gray-900">{{ company.username }}</p>
                </div>
                <div v-if="company.contactFirstName || company.contactLastName">
                  <span class="text-sm font-medium text-gray-500">Contact Person:</span>
                  <p class="text-sm text-gray-900">{{ company.contactFirstName }} {{ company.contactLastName }}</p>
                </div>
                <div v-if="company.phone">
                  <span class="text-sm font-medium text-gray-500">Phone:</span>
                  <p class="text-sm text-gray-900">{{ company.phone }}</p>
                </div>
                <div v-if="company.industry">
                  <span class="text-sm font-medium text-gray-500">Industry:</span>
                  <p class="text-sm text-gray-900">{{ company.industry }}</p>
                </div>
                <div v-if="company.website">
                  <span class="text-sm font-medium text-gray-500">Website:</span>
                  <p class="text-sm text-gray-900">
                    <a :href="company.website" target="_blank" class="text-blue-600 hover:underline">
                      {{ company.website }}
                    </a>
                  </p>
                </div>
                <div v-if="company.registrationDate">
                  <span class="text-sm font-medium text-gray-500">Registration Date:</span>
                  <p class="text-sm text-gray-900">{{ formatDate(company.registrationDate) }}</p>
                </div>
              </div>

              <div v-if="company.address" class="mb-4">
                <span class="text-sm font-medium text-gray-500">Address:</span>
                <p class="text-sm text-gray-900">{{ company.address }}</p>
              </div>

              <div v-if="company.description" class="mb-4">
                <span class="text-sm font-medium text-gray-500">Description:</span>
                <p class="text-sm text-gray-900">{{ company.description }}</p>
              </div>

              <div class="flex space-x-3">
                <button
                  @click="handleCompanyAction(company._id, 'approve')"
                  :disabled="modalData.processing === company._id"
                  class="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-green-300 text-white text-sm font-medium py-2 px-4 rounded-lg transition"
                >
                  <span v-if="modalData.processing === company._id" class="flex items-center justify-center">
                    <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </span>
                  <span v-else class="flex items-center justify-center">
                    <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                    Approve
                  </span>
                </button>
                <button
                  @click="handleCompanyAction(company._id, 'reject')"
                  :disabled="modalData.processing === company._id"
                  class="flex-1 bg-red-600 hover:bg-red-700 disabled:bg-red-300 text-white text-sm font-medium py-2 px-4 rounded-lg transition"
                >
                  <span v-if="modalData.processing === company._id" class="flex items-center justify-center">
                    <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </span>
                  <span v-else class="flex items-center justify-center">
                    <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    Reject
                  </span>
                </button>
              </div>
            </div>
          </div>

          <!-- No Data -->
          <div v-else class="text-center py-16">
            <div class="mx-auto w-20 h-20 bg-gradient-to-r from-gray-100 to-gray-200 rounded-full flex items-center justify-center mb-4">
              <svg class="h-10 w-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
            </div>
            <p class="text-lg font-medium text-gray-600 mb-2">No data available</p>
            <p class="text-sm text-gray-500">There are no pending requests to display.</p>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { useModal } from '~/composables/useModal'

const config = useRuntimeConfig()
const apiBase = config.public.apiBase.replace(/\/api$/, '')

const { modalData, closeModal } = useModal()

// Helper functions
const getInitials = (firstName, lastName) => {
  if (!firstName && !lastName) return '?'
  return `${firstName?.[0] || ''}${lastName?.[0] || ''}`.toUpperCase()
}

const getCompanyInitials = (name) => {
  if (!name) return '?'
  return name.split(' ').map(word => word[0]).join('').toUpperCase().slice(0, 2)
}

const formatDate = (dateString) => {
  if (!dateString) return 'N/A'
  const date = new Date(dateString)
  return date.toLocaleDateString('th-TH', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

// Action handlers
const handleTeacherAction = async (teacherId, action) => {
  try {
    await $fetch('/api/admin/confirm-teacher', {
      baseURL: apiBase,
      method: 'POST',
      body: {
        teacherId,
        action
      }
    })
    
    // Close modal after action
    closeModal()
  } catch (error) {
    console.error('Error confirming teacher:', error)
  }
}

const handleCompanyAction = async (companyId, action) => {
  try {
    await $fetch('/api/admin/confirm-company', {
      baseURL: apiBase,
      method: 'POST',
      body: {
        companyId,
        action
      }
    })
    
    // Close modal after action
    closeModal()
  } catch (error) {
    console.error('Error confirming company:', error)
  }
}

// Computed
const isOpen = computed(() => modalData.value.isOpen)
</script>
