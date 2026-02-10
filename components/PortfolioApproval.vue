<template>
  <div class="min-h-screen bg-gray-50 py-8">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900">อนุมัติ Portfolio</h1>
        <p class="mt-2 text-gray-600">ตรวจสอบและอนุมัติ portfolio ที่รออนุมัติ</p>
      </div>

      <!-- Loading State -->
      <div v-if="isLoading" class="flex justify-center items-center py-12">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500"></div>
      </div>

      <!-- Error Message -->
      <div v-if="errorMessage" class="mb-6 p-4 bg-red-50 border-l-4 border-red-400 rounded-r-lg">
        <div class="flex items-start">
          <svg class="w-5 h-5 text-red-600 mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div class="text-sm text-red-800">
            <p class="font-semibold mb-1">Error</p>
            <p>{{ errorMessage }}</p>
          </div>
        </div>
      </div>

      <!-- Success Message -->
      <div v-if="successMessage" class="mb-6 p-4 bg-green-50 border-l-4 border-green-400 rounded-r-lg">
        <div class="flex items-start">
          <svg class="w-5 h-5 text-green-600 mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div class="text-sm text-green-800">
            <p class="font-semibold mb-1">Success</p>
            <p>{{ successMessage }}</p>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-if="!isLoading && pendingPortfolios.length === 0" class="text-center py-12">
        <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
        <h3 class="mt-2 text-sm font-medium text-gray-900">No pending portfolios</h3>
        <p class="mt-1 text-sm text-gray-500">All portfolios have been processed.</p>
      </div>

      <!-- Portfolio Cards -->
      <div v-if="!isLoading && pendingPortfolios.length > 0" class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div
          v-for="portfolio in pendingPortfolios"
          :key="portfolio._id"
          class="bg-white rounded-lg shadow-md border border-gray-200 p-6 hover:shadow-lg transition-shadow"
        >
          <!-- Portfolio Header -->
          <div class="flex items-center justify-between mb-4">
            <div class="flex-1">
              <h3 class="text-lg font-medium text-gray-900 mb-1">
                {{ portfolio.title }}
              </h3>
              <p class="text-sm text-gray-500">{{ portfolio.category.toUpperCase() }}</p>
            </div>
            <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
              Pending
            </span>
          </div>

          <!-- Portfolio Image -->
          <div v-if="portfolio.image" class="mb-4 rounded-lg overflow-hidden">
            <img 
              :src="portfolio.image" 
              :alt="portfolio.title"
              class="w-full h-48 object-cover"
            />
          </div>

          <!-- Portfolio Details -->
          <div class="space-y-3 mb-6">
            <div class="text-sm text-gray-700">
              <span class="font-medium">Description:</span>
              <p class="mt-1 text-gray-600 line-clamp-3">{{ portfolio.description }}</p>
            </div>
            
            <div v-if="portfolio.client" class="flex justify-between">
              <span class="text-sm font-medium text-gray-500">Client:</span>
              <span class="text-sm text-gray-900">{{ portfolio.client }}</span>
            </div>
            
            <div v-if="portfolio.duration" class="flex justify-between">
              <span class="text-sm font-medium text-gray-500">Duration:</span>
              <span class="text-sm text-gray-900">{{ portfolio.duration }}</span>
            </div>
            
            <div v-if="portfolio.technologies && portfolio.technologies.length > 0" class="mt-2">
              <span class="text-sm font-medium text-gray-500">Technologies:</span>
              <div class="flex flex-wrap gap-1 mt-1">
                <span 
                  v-for="tech in portfolio.technologies.slice(0, 3)" 
                  :key="tech"
                  class="inline-block bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded"
                >
                  {{ tech }}
                </span>
                <span v-if="portfolio.technologies.length > 3" class="text-xs text-gray-500">
                  +{{ portfolio.technologies.length - 3 }} more
                </span>
              </div>
            </div>
            
            <div v-if="portfolio.submittedBy" class="text-xs text-gray-500 mt-2">
              Submitted by: {{ portfolio.submittedBy }}
            </div>
            
            <div class="text-xs text-gray-500">
              Created: {{ formatDate(portfolio.createdAt) }}
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="flex space-x-3">
            <button
              @click="handleApprove(portfolio)"
              :disabled="processingPortfolio === portfolio._id"
              class="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-2 rounded-lg hover:from-green-600 hover:to-emerald-700 transition-all duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              <svg v-if="processingPortfolio !== portfolio._id" class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              <span v-if="processingPortfolio === portfolio._id">Processing...</span>
              <span v-else>Approve</span>
            </button>
            <button
              @click="handleReject(portfolio)"
              :disabled="processingPortfolio === portfolio._id"
              class="flex-1 bg-gradient-to-r from-red-500 to-rose-600 text-white px-4 py-2 rounded-lg hover:from-red-600 hover:to-rose-700 transition-all duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              <svg v-if="processingPortfolio !== portfolio._id" class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
              <span v-if="processingPortfolio === portfolio._id">Processing...</span>
              <span v-else>Reject</span>
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

const { token, user } = useAuth();

// Check if user is admin or teacher
if (!user.value || (user.value.role !== 'admin' && user.value.role !== 'teacher')) {
  throw createError({
    statusCode: 403,
    statusMessage: 'Access denied. Only Admin or Teacher can access this page.'
  });
}

const isLoading = ref(false);
const errorMessage = ref('');
const successMessage = ref('');
const pendingPortfolios = ref([]);
const processingPortfolio = ref(null);

const fetchPendingPortfolios = async () => {
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
      throw new Error('No authentication token found. Please login again.');
    }
    
    const response = await $fetch('/api/portfolio/pending', {
      method: 'GET',
      baseURL: 'http://localhost:3001',
      headers: {
        'Authorization': `Bearer ${authToken}`,
        'Content-Type': 'application/json',
      }
    });

    if (response.success) {
      pendingPortfolios.value = response.data;
      console.log('✅ Pending portfolios fetched successfully:', response.data);
    } else {
      errorMessage.value = response.error || 'Failed to fetch pending portfolios';
      console.error('❌ API error response:', response);
    }
  } catch (error) {
    console.error('❌ Error fetching pending portfolios:', error);
    errorMessage.value = error.message || 'Failed to fetch pending portfolios';
  } finally {
    isLoading.value = false;
  }
};

const handleApprove = async (portfolio) => {
  if (processingPortfolio.value) return;
  
  processingPortfolio.value = portfolio._id;
  errorMessage.value = '';
  successMessage.value = '';
  
  try {
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
    
    const response = await $fetch('/api/portfolio/approve', {
      method: 'POST',
      baseURL: 'http://localhost:3001',
      headers: {
        'Authorization': `Bearer ${authToken}`,
        'Content-Type': 'application/json',
      },
      body: {
        portfolioId: portfolio.id,
        action: 'approve'
      }
    });
    
    if (response.success) {
      successMessage.value = `Portfolio "${portfolio.title}" has been approved`;
      // Remove from pending list
      pendingPortfolios.value = pendingPortfolios.value.filter(p => p._id !== portfolio._id);
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        successMessage.value = '';
      }, 3000);
    } else {
      errorMessage.value = response.error || 'Failed to approve portfolio';
    }
  } catch (error) {
    console.error('❌ Error approving portfolio:', error);
    errorMessage.value = error.message || 'Failed to approve portfolio';
  } finally {
    processingPortfolio.value = null;
  }
};

const handleReject = async (portfolio) => {
  if (processingPortfolio.value) return;
  
  if (!confirm(`Are you sure you want to reject "${portfolio.title}"?`)) {
    return;
  }
  
  processingPortfolio.value = portfolio._id;
  errorMessage.value = '';
  successMessage.value = '';
  
  try {
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
    
    const response = await $fetch('/api/portfolio/approve', {
      method: 'POST',
      baseURL: 'http://localhost:3001',
      headers: {
        'Authorization': `Bearer ${authToken}`,
        'Content-Type': 'application/json',
      },
      body: {
        portfolioId: portfolio.id,
        action: 'reject'
      }
    });
    
    if (response.success) {
      successMessage.value = `Portfolio "${portfolio.title}" has been rejected`;
      // Remove from pending list
      pendingPortfolios.value = pendingPortfolios.value.filter(p => p._id !== portfolio._id);
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        successMessage.value = '';
      }, 3000);
    } else {
      errorMessage.value = response.error || 'Failed to reject portfolio';
    }
  } catch (error) {
    console.error('❌ Error rejecting portfolio:', error);
    errorMessage.value = error.message || 'Failed to reject portfolio';
  } finally {
    processingPortfolio.value = null;
  }
};

const formatDate = (dateString) => {
  if (!dateString) return 'N/A';
  const date = new Date(dateString);
  return date.toLocaleDateString('th-TH', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

onMounted(() => {
  fetchPendingPortfolios();
});
</script>

<style scoped>
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
