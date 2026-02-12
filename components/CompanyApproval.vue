<template>
  <div class="min-h-screen bg-gray-50 py-8">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900">อนุมัติการลงทะเบียน Company</h1>
        <p class="mt-2 text-gray-600">ตรวจสอบและอนุมัติการลงทะเบียนบริษัทที่รออนุมัติ</p>
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
            <p class="font-semibold mb-1">ข้อผิดพลาด</p>
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
            <p class="font-semibold mb-1">สำเร็จ</p>
            <p>{{ successMessage }}</p>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-if="!isLoading && pendingCompanies.length === 0" class="text-center py-12">
        <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
        <h3 class="mt-2 text-sm font-medium text-gray-900">ไม่มีบริษัทที่รออนุมัติ</h3>
        <p class="mt-1 text-sm text-gray-500">บริษัททั้งหมดได้รับการอนุมัติแล้ว</p>
      </div>

      <!-- Company Cards -->
      <div v-if="!isLoading && pendingCompanies.length > 0" class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div
          v-for="company in pendingCompanies"
          :key="company._id"
          class="bg-white rounded-lg shadow-md border border-gray-200 p-6"
        >
          <!-- Company Header -->
          <div class="flex items-center justify-between mb-4">
            <div class="flex items-center">
              <div class="h-10 w-10 rounded-full bg-gradient-to-r from-blue-400 to-indigo-500 flex items-center justify-center">
                <span class="text-white font-medium text-sm">
                  {{ getInitials(company.companyName) }}
                </span>
              </div>
              <div class="ml-3">
                <h3 class="text-lg font-medium text-gray-900">
                  {{ company.companyName }}
                </h3>
                <p class="text-sm text-gray-500">{{ company.email }}</p>
              </div>
            </div>
            <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
              รออนุมัติ
            </span>
          </div>

          <!-- Company Details -->
          <div class="space-y-3 mb-6">
            <div v-if="company.username" class="flex justify-between">
              <span class="text-sm font-medium text-gray-500">Username:</span>
              <span class="text-sm text-gray-900">{{ company.username }}</span>
            </div>
            <div v-if="company.contactFirstName || company.contactLastName" class="flex justify-between">
              <span class="text-sm font-medium text-gray-500">ผู้ติดต่อ:</span>
              <span class="text-sm text-gray-900">{{ company.contactFirstName }} {{ company.contactLastName }}</span>
            </div>
            <div v-if="company.phone" class="flex justify-between">
              <span class="text-sm font-medium text-gray-500">เบอร์โทร:</span>
              <span class="text-sm text-gray-900">{{ company.phone }}</span>
            </div>
            <div v-if="company.industry" class="flex justify-between">
              <span class="text-sm font-medium text-gray-500">อุตสาหกรรม:</span>
              <span class="text-sm text-gray-900">{{ getIndustryName(company.industry) }}</span>
            </div>
            <div v-if="company.address" class="mt-3">
              <span class="text-sm font-medium text-gray-500 block mb-1">ที่อยู่:</span>
              <p class="text-sm text-gray-900">{{ company.address }}</p>
            </div>
            <div v-if="company.description" class="mt-3">
              <span class="text-sm font-medium text-gray-500 block mb-1">รายละเอียด:</span>
              <p class="text-sm text-gray-900">{{ company.description }}</p>
            </div>
            <div class="text-xs text-gray-400">
              ลงทะเบียนเมื่อ: {{ formatDate(company.createdAt) }}
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="flex space-x-3">
            <button
              @click="approveCompany(company._id, 'approve')"
              :disabled="processingCompany === company._id"
              class="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-green-300 text-white text-sm font-medium py-2 px-4 rounded-lg transition duration-150 ease-in-out"
            >
              <span v-if="processingCompany === company._id" class="flex items-center justify-center">
                <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                กำลังดำเนินการ...
              </span>
              <span v-else class="flex items-center justify-center">
                <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                อนุมัติ
              </span>
            </button>
            <button
              @click="approveCompany(company._id, 'reject')"
              :disabled="processingCompany === company._id"
              class="flex-1 bg-red-600 hover:bg-red-700 disabled:bg-red-300 text-white text-sm font-medium py-2 px-4 rounded-lg transition duration-150 ease-in-out"
            >
              <span v-if="processingCompany === company._id" class="flex items-center justify-center">
                <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                กำลังดำเนินการ...
              </span>
              <span v-else class="flex items-center justify-center">
                <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
                ปฏิเสธ
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

const config = useRuntimeConfig();
const apiBase = config.public.apiBase.replace(/\/api$/, '');

const { user, token } = useAuth();

const pendingCompanies = ref([]);
const isLoading = ref(false);
const errorMessage = ref('');
const successMessage = ref('');
const processingCompany = ref(null);

const fetchPendingCompanies = async () => {
  isLoading.value = true;
  errorMessage.value = '';
  
  try {
    
    const response = await $fetch('/api/company-approvals', {
      method: 'GET',
      baseURL: apiBase,
      headers: {
        'Authorization': `Bearer ${token.value}`,
        'Content-Type': 'application/json',
      }
    });

    if (response.success) {
      pendingCompanies.value = response.data;

    } else {
      errorMessage.value = response.error || 'ไม่สามารถดึงข้อมูลบริษัทได้';
      console.error('❌ API error response:', response);
    }
  } catch (error) {
    console.error('❌ Error fetching pending companies:', error);
    if (error.status === 403) {
      errorMessage.value = 'คุณไม่มีสิทธิ์เข้าถึงหน้านี้ กรุณาเข้าสู่ระบบด้วยบัญชี Admin หรือ Teacher';
    } else if (error.status === 401) {
      errorMessage.value = 'กรุณาเข้าสู่ระบบใหม่';
    } else {
      errorMessage.value = 'ไม่สามารถดึงข้อมูลบริษัทได้ กรุณาลองใหม่อีกครั้ง';
    }
  } finally {
    isLoading.value = false;
  }
};

const approveCompany = async (companyId, action) => {
  processingCompany.value = companyId;
  errorMessage.value = '';
  successMessage.value = '';
  
  try {
    
    const response = await $fetch('/api/company-approvals', {
      method: 'POST',
      baseURL: apiBase,
      headers: {
        'Authorization': `Bearer ${token.value}`,
        'Content-Type': 'application/json',
      },
      body: {
        companyId,
        action
      }
    });

    if (response.success) {
      successMessage.value = response.message;
      // Remove the company from the list
      pendingCompanies.value = pendingCompanies.value.filter(c => c._id !== companyId);
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        successMessage.value = '';
      }, 3000);
      
    } else {
      errorMessage.value = response.error || 'ไม่สามารถดำเนินการได้';
      console.error('❌ API error response:', response);
    }
  } catch (error) {
    console.error('❌ Error processing company approval:', error);
    if (error.status === 403) {
      errorMessage.value = 'คุณไม่มีสิทธิ์ดำเนินการนี้';
    } else if (error.status === 401) {
      errorMessage.value = 'กรุณาเข้าสู่ระบบใหม่';
    } else {
      errorMessage.value = 'ไม่สามารถดำเนินการได้ กรุณาลองใหม่อีกครั้ง';
    }
  } finally {
    processingCompany.value = null;
  }
};

const getInitials = (companyName) => {
  if (!companyName) return 'C';
  const words = companyName.split(' ');
  if (words.length >= 2) {
    return words[0].charAt(0).toUpperCase() + words[1].charAt(0).toUpperCase();
  }
  return companyName.charAt(0).toUpperCase();
};

const getIndustryName = (industry) => {
  const industryMap = {
    'technology': 'เทคโนโลยี',
    'finance': 'การเงิน',
    'manufacturing': 'การผลิต',
    'education': 'การศึกษา',
    'healthcare': 'สุขภาพ',
    'retail': 'ค้าปลีก',
    'other': 'อื่นๆ'
  };
  return industryMap[industry] || industry;
};

const formatDate = (date) => {
  return new Date(date).toLocaleDateString('th-TH', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

onMounted(() => {
  fetchPendingCompanies();
});
</script>

