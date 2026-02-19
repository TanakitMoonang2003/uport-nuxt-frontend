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
            <!-- Multi-Image Upload -->
            <div>
              <label class="block text-lg font-semibold text-gray-800 mb-1">รูปภาพผลงาน</label>
              <p class="text-sm text-gray-500 mb-3">เพิ่มได้หลายรูป (JPEG, PNG, WebP) ไม่เกิน 10MB ต่อรูป — รูปแรกจะเป็นรูปหลัก</p>
              <div
                class="border-2 border-dashed rounded-xl p-8 text-center transition-all cursor-pointer"
                :class="dragActive ? 'border-yellow-500 bg-yellow-50' : 'border-yellow-300 bg-amber-50/30 hover:border-yellow-400 hover:bg-yellow-50'"
                @dragenter.prevent="dragActive = true"
                @dragleave.prevent="dragActive = false"
                @dragover.prevent
                @drop.prevent="handleImageDrop"
                @click="$refs.imageInput.click()"
              >
                <input ref="imageInput" type="file" class="hidden" accept="image/jpeg,image/png,image/webp" multiple @change="handleImageChange" />
                <svg class="w-10 h-10 text-yellow-400 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p class="text-sm text-gray-600 font-medium">คลิกหรือลากรูปภาพมาวางที่นี่</p>
                <p class="text-xs text-gray-400 mt-1">เลือกได้หลายรูปพร้อมกัน</p>
              </div>
              <div v-if="selectedImages.length > 0" class="mt-4 grid grid-cols-3 sm:grid-cols-4 gap-3">
                <div v-for="(img, idx) in selectedImages" :key="idx" class="relative group rounded-lg overflow-hidden border-2 border-yellow-200 aspect-square bg-gray-100">
                  <img :src="img.preview" :alt="img.name" class="w-full h-full object-cover" />
                  <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button type="button" @click.stop="removeImage(idx)" class="bg-red-500 text-white rounded-full w-7 h-7 flex items-center justify-center hover:bg-red-600">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                  </div>
                  <span v-if="idx === 0" class="absolute top-1 left-1 bg-yellow-500 text-white text-xs px-1.5 py-0.5 rounded font-semibold">หลัก</span>
                </div>
              </div>
            </div>
  
            <!-- Category -->
            <div>
              <label class="block text-lg font-semibold text-gray-800 mb-3">หมวดหมู่</label>
              <div class="relative">
                <select v-model="category" class="w-full px-4 py-3 border-2 border-yellow-300 rounded-lg bg-white text-gray-700 focus:outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 appearance-none cursor-pointer">
                  <option value="">เลือกหมวดหมู่</option>
                  <option value="web">Web Development</option>
                  <option value="mobile">Mobile Application</option>
                  <option value="design">UI/UX Design</option>
                  <option value="data">Data Science</option>
                  <option value="ai">AI/Machine Learning</option>
                  <option value="other">อื่นๆ</option>
                </select>
                <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-yellow-600">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" /></svg>
                </div>
              </div>
            </div>
  
            <!-- Title -->
            <div>
              <label class="block text-lg font-semibold text-gray-800 mb-3">หัวข้อผลงาน (Title)</label>
              <input v-model="title" type="text" placeholder="เช่น ระบบจัดการร้านอาหารด้วย Vue.js" class="w-full px-4 py-3 border-2 border-yellow-300 rounded-lg bg-white text-gray-700 placeholder-gray-400 focus:outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200" />
            </div>
  
            <!-- Live Demo URL -->
            <div>
              <label class="block text-lg font-semibold text-gray-800 mb-1">Live Demo URL <span class="text-sm font-normal text-gray-400">(ไม่บังคับ)</span></label>
              <p class="text-sm text-gray-500 mb-3">หากมี URL จะแสดงปุ่ม Live Demo ในหน้าผลงาน</p>
              <div class="relative">
                <svg class="absolute left-4 top-1/2 -translate-y-1/2 text-blue-500 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                <input v-model="demoUrl" type="url" placeholder="https://my-project.vercel.app" class="w-full pl-12 pr-4 py-3 border-2 border-yellow-300 rounded-lg bg-white text-gray-700 placeholder-gray-400 focus:outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200" />
              </div>
            </div>

            <!-- Repository URL -->
            <div>
              <label class="block text-lg font-semibold text-gray-800 mb-1">Repository URL <span class="text-sm font-normal text-gray-400">(ไม่บังคับ)</span></label>
              <div class="relative">
                <svg class="absolute left-4 top-1/2 -translate-y-1/2 text-yellow-600 w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                <input v-model="repoUrl" type="url" placeholder="https://github.com/username/repository" class="w-full pl-12 pr-4 py-3 border-2 border-yellow-300 rounded-lg bg-white text-gray-700 placeholder-gray-400 focus:outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200" />
              </div>
            </div>
  
            <!-- Details -->
            <div>
              <label class="block text-lg font-semibold text-gray-800 mb-3">รายละเอียดผลงาน</label>
              <textarea v-model="details" placeholder="บอกเราเกี่ยวกับผลงานของคุณ ทักษะที่ใช้ และสิ่งที่คุณภูมิใจ" rows="6" class="w-full px-4 py-3 border-2 border-yellow-300 rounded-lg bg-white text-gray-700 placeholder-gray-400 focus:outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 resize-none" />
            </div>
  
            <!-- Info Note -->
            <div class="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-lg flex items-start gap-3">
              <svg class="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
              <div class="text-sm text-yellow-800"><p class="font-semibold mb-1">ข้อมูลสำคัญ:</p><p>กรุณาตรวจสอบข้อมูลให้ครบถ้วนก่อนส่ง ไฟล์จะถูกตรวจสอบภายใน 3-5 วันทำการ</p></div>
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
import { useToast } from '~/composables/useToast'

const { createPortfolioItem } = usePortfolio()
const { user } = useUser()
const { success: toastSuccess, error: toastError } = useToast()

const selectedImages = ref([])  // [{ file, preview, name }]
const category = ref('')
const title = ref('')
const demoUrl = ref('')
const repoUrl = ref('')
const details = ref('')
const dragActive = ref(false)
const imageInput = ref(null)
const isLoading = ref(false)

// ── Image handling ──────────────────────────────────────────
const handleImageDrop = (e) => {
  dragActive.value = false
  addImageFiles(Array.from(e.dataTransfer.files))
}

const handleImageChange = (e) => {
  addImageFiles(Array.from(e.target.files))
  e.target.value = ''
}

const addImageFiles = (files) => {
  for (const file of files) {
    if (!file.type.startsWith('image/')) continue
    if (file.size > 10 * 1024 * 1024) {
      toastError(`"${file.name}" ใหญ่เกิน 10MB`)
      continue
    }
    const preview = URL.createObjectURL(file)
    selectedImages.value.push({ file, preview, name: file.name })
  }
}

const removeImage = (idx) => {
  URL.revokeObjectURL(selectedImages.value[idx].preview)
  selectedImages.value.splice(idx, 1)
}

// ── Compress image via canvas ────────────────────────────────
const compressImage = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = (e) => {
      const img = new Image()
      img.src = e.target.result
      img.onload = () => {
        const MAX = 1200
        let w = img.width, h = img.height
        if (w > h) { if (w > MAX) { h = h * MAX / w; w = MAX } }
        else        { if (h > MAX) { w = w * MAX / h; h = MAX } }
        const canvas = document.createElement('canvas')
        canvas.width = w; canvas.height = h
        canvas.getContext('2d').drawImage(img, 0, 0, w, h)
        resolve(canvas.toDataURL('image/jpeg', 0.75))
      }
      img.onerror = reject
    }
    reader.onerror = reject
  })
}

// ── Validation ───────────────────────────────────────────────
const validateForm = () => {
  if (selectedImages.value.length === 0) {
    toastError('กรุณาเพิ่มรูปภาพอย่างน้อย 1 รูป')
    return false
  }
  if (!category.value) {
    toastError('กรุณาเลือกหมวดหมู่')
    return false
  }
  if (!title.value.trim()) {
    toastError('กรุณากรอกหัวข้อผลงาน')
    return false
  }
  return true
}

// ── Submit ───────────────────────────────────────────────────
const handleSubmit = async () => {
  if (!validateForm()) return

  isLoading.value = true

  try {
    // Compress all images to base64
    const imagesBase64 = await Promise.all(
      selectedImages.value.map(({ file }) => compressImage(file))
    )

    const portfolioData = {
      category: category.value,
      title: title.value.trim(),
      description: details.value.substring(0, 150) + (details.value.length > 150 ? '...' : ''),
      fullDescription: details.value,
      technologies: [],
      image: imagesBase64[0] || '',
      images: imagesBase64,
      demoUrl: demoUrl.value.trim(),
      githubUrl: repoUrl.value.trim(),
      features: [],
      duration: 'N/A',
      client: 'Personal Project',
      uploadedFile: imagesBase64[0] || '',
      repoUrl: repoUrl.value.trim(),
      details: details.value,
      status: 'pending',
      submittedBy: user.value?.email || 'anonymous'
    }

    await createPortfolioItem(portfolioData)

    toastSuccess('ส่งพอร์ตโฟลิโอเรียบร้อยแล้ว! ระบบจะตรวจสอบภายใน 3-5 วันทำการ', 5000)
    handleReset()

  } catch (error) {
    console.error('Error submitting portfolio:', error)
    toastError('เกิดข้อผิดพลาดในการส่งข้อมูล กรุณาลองใหม่อีกครั้ง')
  } finally {
    isLoading.value = false
  }
}

// ── Reset ────────────────────────────────────────────────────
const handleReset = () => {
  selectedImages.value.forEach(img => URL.revokeObjectURL(img.preview))
  selectedImages.value = []
  category.value = ''
  title.value = ''
  demoUrl.value = ''
  repoUrl.value = ''
  details.value = ''
}
</script>