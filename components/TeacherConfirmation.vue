<template>
  <div class="min-h-screen bg-gray-50 py-8">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900">อนุมัติการลงทะเบียน Teacher</h1>
        <p class="mt-2 text-gray-600">ตรวจสอบและอนุมัติการลงทะเบียนครูที่รออนุมัติ</p>
      </div>

      <!-- Loading State -->
      <div v-if="isLoading" class="flex justify-center items-center py-12">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500"></div>
      </div>

      <!-- Empty State -->
      <div v-if="!isLoading && pendingTeachers.length === 0" class="text-center py-12">
        <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
        <h3 class="mt-2 text-sm font-medium text-gray-900">No pending teacher registrations</h3>
        <p class="mt-1 text-sm text-gray-500">All teacher registrations have been processed.</p>
      </div>

      <!-- Teacher Cards -->
      <div v-if="!isLoading && pendingTeachers.length > 0" class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div
          v-for="teacher in pendingTeachers"
          :key="teacher._id"
          class="bg-white rounded-lg shadow-md border border-gray-200 p-6"
        >
          <!-- Teacher Header -->
          <div class="flex items-center justify-between mb-4">
            <div class="flex items-center">
              <div class="h-10 w-10 rounded-full bg-gradient-to-r from-amber-400 to-yellow-500 flex items-center justify-center">
                <span class="text-white font-medium text-sm">
                  {{ getInitials(teacher.firstName, teacher.lastName) }}
                </span>
              </div>
              <div class="ml-3">
                <h3 class="text-lg font-medium text-gray-900">
                  {{ teacher.title || '' }} {{ teacher.firstName }} {{ teacher.lastName }}
                </h3>
                <p class="text-sm text-gray-500">{{ teacher.email }}</p>
              </div>
            </div>
            <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
              Pending
            </span>
          </div>

          <!-- Teacher Details -->
          <div class="space-y-3 mb-6">
            <div v-if="teacher.teacherId" class="flex justify-between">
              <span class="text-sm font-medium text-gray-500">Teacher ID:</span>
              <span class="text-sm text-gray-900">{{ teacher.teacherId }}</span>
            </div>
            <div v-if="teacher.faculty" class="flex justify-between">
              <span class="text-sm font-medium text-gray-500">Faculty:</span>
              <span class="text-sm text-gray-900">{{ teacher.faculty }}</span>
            </div>
            <div v-if="teacher.department" class="flex justify-between">
              <span class="text-sm font-medium text-gray-500">Department:</span>
              <span class="text-sm text-gray-900">{{ teacher.department }}</span>
            </div>
            <div v-if="teacher.position" class="flex justify-between">
              <span class="text-sm font-medium text-gray-500">Position:</span>
              <span class="text-sm text-gray-900">{{ teacher.position }}</span>
            </div>
            <div v-if="teacher.officeRoom" class="flex justify-between">
              <span class="text-sm font-medium text-gray-500">Office Room:</span>
              <span class="text-sm text-gray-900">{{ teacher.officeRoom }}</span>
            </div>
            <div v-if="teacher.phone" class="flex justify-between">
              <span class="text-sm font-medium text-gray-500">Phone:</span>
              <span class="text-sm text-gray-900">{{ teacher.phone }}</span>
            </div>
            <div v-if="teacher.specialization" class="mt-3">
              <span class="text-sm font-medium text-gray-500 block mb-1">Specialization:</span>
              <p class="text-sm text-gray-900">{{ teacher.specialization }}</p>
            </div>
            <div class="text-xs text-gray-400">
              Registered: {{ formatDate(teacher.createdAt) }}
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="flex space-x-3">
            <button
              @click="confirmTeacher(teacher._id, 'accept')"
              :disabled="processingTeacher === teacher._id"
              class="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-green-300 text-white text-sm font-medium py-2 px-4 rounded-lg transition duration-150 ease-in-out"
            >
              <span v-if="processingTeacher === teacher._id" class="flex items-center justify-center">
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
                Accept
              </span>
            </button>
            <button
              @click="confirmTeacher(teacher._id, 'reject')"
              :disabled="processingTeacher === teacher._id"
              class="flex-1 bg-red-600 hover:bg-red-700 disabled:bg-red-300 text-white text-sm font-medium py-2 px-4 rounded-lg transition duration-150 ease-in-out"
            >
              <span v-if="processingTeacher === teacher._id" class="flex items-center justify-center">
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
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useAuth } from '~/composables/useAuth';
import { useToast } from '~/composables/useToast';

const config = useRuntimeConfig();
const apiBase = config.public.apiBase.replace(/\/api$/, '');

const { user, token } = useAuth();

const pendingTeachers = ref([]);
const isLoading = ref(false);
const { success: toastSuccess, error: toastError } = useToast();
const processingTeacher = ref(null);

// Check if user is admin or teacher
if (!user.value || (user.value.role !== 'admin' && user.value.role !== 'teacher' && user.value.role !== 'user')) {
  throw createError({
    statusCode: 403,
    statusMessage: 'Access denied. Only Admin or Teacher can access this page.'
  });
}

const fetchPendingTeachers = async () => {
  isLoading.value = true;
  
  try {
    // Get token from multiple sources to ensure we have it
    let authToken = token.value;
    
    // If token from useAuth is null, try localStorage
    if (!authToken && import.meta.client) {
      authToken = localStorage.getItem('auth_token');
     
    }
    
    // If still no token, try cookie directly
    if (!authToken && import.meta.client) {
      const cookieToken = document.cookie
        .split('; ')
        .find(row => row.startsWith('token='))
        ?.split('=')[1];
      authToken = cookieToken;
      
    }
 
    
    if (!authToken) {
      throw new Error('No authentication token found. Please login again.');
    }
    
    const response = await $fetch('/api/teacher-confirmations', {
      method: 'GET',
      baseURL: apiBase,
      headers: {
        'Authorization': `Bearer ${authToken}`,
        'Content-Type': 'application/json',
      }
    });

    if (response.success) {
      pendingTeachers.value = response.data;
     
    } else {
      toastError(response.error || 'Failed to fetch teacher confirmations');
    }
  } catch (error) {
    console.error('❌ Error fetching teacher confirmations:', error);
    if (error.status === 403) {
      toastError('You do not have permission to access this page.');
    } else if (error.status === 401) {
      toastError('Please login again');
    } else {
      toastError('Failed to fetch teacher confirmations. Please try again.');
    }
  } finally {
    isLoading.value = false;
  }
};

const confirmTeacher = async (teacherId, action) => {
  processingTeacher.value = teacherId;
  
  try {
    // Get token from multiple sources to ensure we have it
    let authToken = token.value;
    
    // If token from useAuth is null, try localStorage
    if (!authToken && import.meta.client) {
      authToken = localStorage.getItem('auth_token');
    }
    
    // If still no token, try cookie directly
    if (!authToken && import.meta.client) {
      const cookieToken = document.cookie
        .split('; ')
        .find(row => row.startsWith('token='))
        ?.split('=')[1];
      authToken = cookieToken;
    }
    
    if (!authToken) {
      throw new Error('No authentication token found. Please login again.');
    }
    
  
    
    const response = await $fetch('/api/teacher-confirmations', {
      method: 'POST',
      baseURL: apiBase,
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
      toastSuccess(response.message || (action === 'accept' ? 'Teacher confirmed successfully!' : 'Teacher request rejected.'));
      pendingTeachers.value = pendingTeachers.value.filter(t => t._id !== teacherId);
    } else {
      toastError(response.error || 'Failed to process teacher confirmation');
    }
  } catch (error) {
    console.error('❌ Error processing teacher confirmation:', error);
    if (error.status === 403) {
      toastError('You do not have permission to perform this action');
    } else if (error.status === 401) {
      toastError('Please login again');
    } else {
      toastError('Failed to process teacher confirmation. Please try again.');
    }
  } finally {
    processingTeacher.value = null;
  }
};

const getInitials = (firstName, lastName) => {
  if (!firstName && !lastName) return 'T';
  const first = firstName ? firstName.charAt(0).toUpperCase() : '';
  const last = lastName ? lastName.charAt(0).toUpperCase() : '';
  return first + last;
};

const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

onMounted(() => {
  fetchPendingTeachers();
});
</script>
