<template>
    <div class="min-h-screen bg-gradient-to-br from-yellow-50 via-amber-50 to-orange-50 py-12 px-4">
      <div class="max-w-3xl mx-auto">
        <div class="bg-white rounded-2xl shadow-xl overflow-hidden border-2 border-yellow-200">
          <!-- Header -->
          <div class="bg-gradient-to-r from-yellow-400 to-amber-500 px-8 py-6">
            <h1 class="text-3xl font-bold text-white mb-2">
              อัพโหลดพอร์ตโฟลิโอ
            </h1>
            <p class="text-yellow-50">
              แบ่งปันผลงานของคุณกับเรา
            </p>
          </div>
  
          <!-- Form -->
          <div class="p-8 space-y-8">
            <!-- Upload File Section -->
            <div>
              <label class="block text-lg font-semibold text-gray-800 mb-3">
                Upload file
              </label>
              <a href="#" class="text-amber-600 hover:text-amber-700 text-sm font-medium mb-4 inline-block">
                Choose your portfolio
              </a>
              
              <div
                class="relative border-2 border-dashed rounded-xl p-12 text-center transition-all cursor-pointer"
                :class="dragActive 
                  ? 'border-yellow-500 bg-yellow-50' 
                  : 'border-yellow-300 bg-amber-50/30 hover:border-yellow-400 hover:bg-yellow-50'"
                @dragenter.prevent="dragActive = true"
                @dragleave.prevent="dragActive = false"
                @dragover.prevent
                @drop.prevent="handleDrop"
              >
                <input
                  ref="fileInput"
                  type="file"
                  class="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  @change="handleFileChange"
                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.mp4"
                />
                <div class="pointer-events-none">
                  <svg class="w-12 h-12 text-yellow-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                  <button
                    type="button"
                    class="pointer-events-auto bg-white border-2 border-yellow-400 text-yellow-700 font-semibold px-6 py-2.5 rounded-lg hover:bg-yellow-50 transition-colors inline-flex items-center gap-2 mb-3"
                    @click="$refs.fileInput.click()"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                    Choose File
                  </button>
                  <p v-if="selectedFile" class="text-sm text-gray-700 font-medium">
                    ไฟล์ที่เลือก: {{ selectedFile.name }}
                  </p>
                </div>
              </div>
              
              <div class="mt-3 text-sm text-gray-600 space-y-1">
                <p class="font-medium">Supported file formats:</p>
                <p>• PDF, Word ,JPEG, PNG, Video (MP4, YouTube) not more than 100MB</p>
              </div>
            </div>
  
            <!-- Category Selection -->
            <div>
              <label class="block text-lg font-semibold text-gray-800 mb-3">
                Choose your categorize
              </label>
              <div class="relative">
                <select
                  v-model="category"
                  class="w-full px-4 py-3 border-2 border-yellow-300 rounded-lg bg-white text-gray-700 focus:outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 appearance-none cursor-pointer"
                >
                  <option value="">Select your categorize</option>
                  <option value="web">Web Development</option>
                  <option value="mobile">Mobile Application</option>
                  <option value="design">UI/UX Design</option>
                  <option value="data">Data Science</option>
                  <option value="ai">AI/Machine Learning</option>
                  <option value="other">อื่นๆ</option>
                </select>
                <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-yellow-600">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>
  
            <!-- Portfolio Title / Headline -->
            <div>
              <label class="block text-lg font-semibold text-gray-800 mb-3">
                หัวข้อผลงาน (Title)
              </label>
              <input
                v-model="title"
                type="text"
                placeholder="เช่น ระบบจัดการร้านอาหารด้วย Vue.js"
                class="w-full px-4 py-3 border-2 border-yellow-300 rounded-lg bg-white text-gray-700 placeholder-gray-400 focus:outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200"
              />
              <p class="mt-2 text-sm text-gray-500">
                หัวข้อสั้น ๆ ที่จะนำไปแสดงในหน้าแรกและหน้าแสดงผลงาน
              </p>
            </div>
  
            <!-- Repository URL -->
            <div>
              <label class="block text-lg font-semibold text-gray-800 mb-3">
                Repository URL
              </label>
              <p class="text-sm text-gray-600 mb-3">
                Enter a GitHub or GitLab repository URL to import your portfolio data
              </p>
              <div class="relative">
                <svg class="absolute left-4 top-1/2 transform -translate-y-1/2 text-yellow-600 w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                <input
                  v-model="repoUrl"
                  type="url"
                  placeholder="https://github.com/username/repository"
                  class="w-full pl-12 pr-4 py-3 border-2 border-yellow-300 rounded-lg bg-white text-gray-700 placeholder-gray-400 focus:outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200"
                />
              </div>
              <div class="mt-3 text-sm text-gray-600 space-y-1">
                <p class="font-medium">Supported Repository Formats:</p>
                <p>• GitHub: https://github.com/username/repository</p>
                <p>• GitLab: https://gitlab.com/username/repository</p>
              </div>
            </div>
  
            <!-- Details -->
            <div>
              <label class="block text-lg font-semibold text-gray-800 mb-3">
                Details
              </label>
              <textarea
                v-model="details"
                placeholder="Details about yourself that you would like to include"
                rows="6"
                class="w-full px-4 py-3 border-2 border-yellow-300 rounded-lg bg-white text-gray-700 placeholder-gray-400 focus:outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 resize-none"
              />
              <p class="mt-2 text-sm text-gray-500">
                บอกเราเกี่ยวกับผลงานของคุณ ทักษะที่ใช้ และสิ่งที่คุณภูมิใจ
              </p>
            </div>
  
            <!-- Error Message -->
            <div v-if="errorMessage" class="bg-red-50 border-l-4 border-red-400 p-4 rounded-r-lg">
              <div class="flex items-start">
                <svg class="w-5 h-5 text-red-600 mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div class="text-sm text-red-800">
                  <p class="font-semibold">{{ errorMessage }}</p>
                </div>
              </div>
            </div>

            <!-- Success Message -->
            <div v-if="successMessage" class="bg-green-50 border-l-4 border-green-400 p-4 rounded-r-lg">
              <div class="flex items-start">
                <svg class="w-5 h-5 text-green-600 mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div class="text-sm text-green-800">
                  <p class="font-semibold">{{ successMessage }}</p>
                </div>
              </div>
            </div>

            <!-- Info Alert -->
            <div v-if="!errorMessage && !successMessage" class="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-lg">
              <div class="flex items-start">
                <svg class="w-5 h-5 text-yellow-600 mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <div class="text-sm text-yellow-800">
                  <p class="font-semibold mb-1">ข้อมูลสำคัญ:</p>
                  <p>กรุณาตรวจสอบข้อมูลให้ครบถ้วนก่อนส่ง ไฟล์ของคุณจะถูกตรวจสอบภายใน 3-5 วันทำการ</p>
                </div>
              </div>
            </div>
  
            <!-- Submit Button -->
            <div class="flex gap-4">
              <button
                type="button"
                @click="handleSubmit"
                :disabled="isLoading"
                class="flex-1 bg-gradient-to-r from-yellow-400 to-amber-500 text-white font-bold py-4 px-6 rounded-xl hover:from-yellow-500 hover:to-amber-600 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                <span v-if="isLoading" class="flex items-center justify-center">
                  <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  กำลังส่ง...
                </span>
                <span v-else>ส่งพอร์ตโฟลิโอ</span>
              </button>
              <button
                type="button"
                @click="handleReset"
                :disabled="isLoading"
                class="px-6 py-4 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                ยกเลิก
              </button>
            </div>
          </div>
        </div>
  
        <!-- Footer Note -->
        <p class="text-center text-gray-600 mt-6 text-sm">
          หากมีปัญหาหรือข้อสงสัย กรุณาติดต่อ 
          <a href="mailto:support@example.com" class="text-amber-600 hover:text-amber-700 font-medium">
            support@example.com
          </a>
        </p>
      </div>
    </div>
  </template>
  
<script setup>
import { ref } from 'vue'
import { usePortfolio } from '~/composables/usePortfolio'
import { useUser } from '~/composables/useUser'

// No specific layout needed - using global navbar

const { createPortfolioItem } = usePortfolio()
const { user } = useUser()

const selectedFile = ref(null)
const category = ref('')
const title = ref('')
const repoUrl = ref('')
const details = ref('')
const dragActive = ref(false)
const fileInput = ref(null)
const isLoading = ref(false)
const errorMessage = ref('')
const successMessage = ref('')

const handleDrop = (e) => {
  dragActive.value = false
  
  if (e.dataTransfer.files && e.dataTransfer.files[0]) {
    selectedFile.value = e.dataTransfer.files[0]
  }
}

const handleFileChange = (e) => {
  if (e.target.files && e.target.files[0]) {
    selectedFile.value = e.target.files[0]
  }
}

const validateForm = () => {
  errorMessage.value = ''
  
  if (!selectedFile.value) {
    errorMessage.value = 'กรุณาเลือกไฟล์ก่อนส่ง'
    return false
  }
  
  if (!category.value) {
    errorMessage.value = 'กรุณาเลือกหมวดหมู่'
    return false
  }

  if (!title.value.trim()) {
    errorMessage.value = 'กรุณากรอกหัวข้อผลงาน'
    return false
  }
  
  // Validate file size
  if (selectedFile.value.type.startsWith('image/')) {
    // For images, we will try to compress them, so we allow up to 10MB initially
    if (selectedFile.value.size > 10 * 1024 * 1024) {
      errorMessage.value = 'ขนาดไฟล์ภาพต้องไม่เกิน 10MB'
      return false
    }
  } else {
    // For non-images (PDF, Video), Vercel has a 4.5MB limit for base64
    if (selectedFile.value.size > 4 * 1024 * 1024) {
      errorMessage.value = 'ไฟล์ประเภทนี้ (PDF/Video) ต้องมีขนาดไม่เกิน 4MB เนื่องจากข้อจำกัดของระบบ'
      return false
    }
  }
  
  // Validate file type
  const allowedTypes = [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'image/jpeg',
    'image/png',
    'video/mp4'
  ]
  
  if (!allowedTypes.includes(selectedFile.value.type)) {
    errorMessage.value = 'ประเภทไฟล์ไม่ถูกต้อง กรุณาเลือกไฟล์ PDF, Word, JPEG, PNG หรือ MP4'
    return false
  }
  
  return true
}

const handleSubmit = async () => {
  if (!validateForm()) {
    return
  }
  
  isLoading.value = true
  errorMessage.value = ''
  successMessage.value = ''
  
  try {
    let fileBase64 = '';
    const isImage = selectedFile.value.type.startsWith('image/');

    if (isImage) {
      // Compress image before converting to base64
      fileBase64 = await compressImage(selectedFile.value);
    } else {
      // Convert other files directly to base64
      fileBase64 = await convertFileToBase64(selectedFile.value);
    }
    
    const portfolioData = {
      category: category.value,
      title: title.value.trim() || `Portfolio Submission - ${new Date().toLocaleDateString()}`,
      description: details.value.substring(0, 100) + (details.value.length > 100 ? '...' : ''),
      fullDescription: details.value,
      technologies: [],
      image: isImage ? fileBase64 : '', 
      demoUrl: repoUrl.value,
      githubUrl: repoUrl.value,
      features: [], 
      duration: 'N/A',
      client: 'Personal Project',
      uploadedFile: fileBase64,
      repoUrl: repoUrl.value,
      details: details.value,
      status: 'pending',
      submittedBy: user.value?.email || 'anonymous'
    }
    
    await createPortfolioItem(portfolioData)
    
    successMessage.value = 'ข้อมูลถูกส่งเรียบร้อยแล้ว! 🎉 ระบบจะตรวจสอบและตอบกลับภายใน 3-5 วันทำการ'
    handleReset()
    
  } catch (error) {
    console.error('Error submitting portfolio:', error)
    errorMessage.value = 'เกิดข้อผิดพลาดในการส่งข้อมูล กรุณาลองใหม่อีกครั้ง'
  } finally {
    isLoading.value = false
  }
}

const convertFileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = error => reject(error)
  })
}

// Function to compress image using canvas
const compressImage = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target.result;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX_WIDTH = 1200;
        const MAX_HEIGHT = 1200;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);
        
        // Compress with 0.7 quality to stay under 1-2MB
        const dataUrl = canvas.toDataURL('image/jpeg', 0.7);
        resolve(dataUrl);
      };
      img.onerror = error => reject(error);
    };
    reader.onerror = error => reject(error);
  });
};

const handleReset = () => {
  selectedFile.value = null
  category.value = ''
  title.value = ''
  repoUrl.value = ''
  details.value = ''
  errorMessage.value = ''
  successMessage.value = ''
  if (fileInput.value) {
    fileInput.value.value = ''
  }
}
  </script>