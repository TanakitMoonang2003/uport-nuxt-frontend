<template>
  <div class="min-h-screen bg-gradient-to-br from-amber-50 to-yellow-50 py-8 px-4">
    <div class="max-w-4xl mx-auto">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900">Edit Profile</h1>
        <p class="text-gray-600 mt-2">Update your personal information and profile picture</p>
      </div>

      <!-- Loading State -->
      <div v-if="isLoading" class="bg-white rounded-2xl shadow-xl p-8 text-center">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500 mx-auto"></div>
        <p class="mt-4 text-gray-600">Loading profile...</p>
      </div>

      <!-- Error State -->
      <div v-else-if="loadError" class="bg-white rounded-2xl shadow-xl p-8">
        <div class="text-center text-red-600">
          <svg class="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p class="text-lg font-semibold">Failed to load profile</p>
          <p class="text-sm text-gray-600 mt-2">{{ loadError }}</p>
          <button @click="loadProfile" class="mt-4 px-6 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition">
            Try Again
          </button>
        </div>
      </div>

      <!-- Profile Form -->
      <div v-else class="bg-white rounded-2xl shadow-xl overflow-hidden">
        <!-- Profile Header with Avatar -->
        <div class="bg-gradient-to-r from-amber-400 to-yellow-500 p-8">
          <div class="flex items-center gap-6">
            <!-- Avatar -->
            <div class="relative">
              <div class="w-32 h-32 rounded-full overflow-hidden bg-white shadow-lg">
                <img 
                  v-if="getAvatarSource()" 
                  :src="getAvatarSource()" 
                  alt="Profile" 
                  class="w-full h-full object-cover"
                />
                <div v-else class="w-full h-full flex items-center justify-center bg-gradient-to-br from-amber-100 to-yellow-100">
                  <span class="text-4xl font-bold text-amber-600">
                    {{ (profileData.firstName?.[0] || profileData.username?.[0] || '?').toUpperCase() }}
                  </span>
                </div>
              </div>
              
              <!-- Upload Button -->
              <label class="absolute bottom-0 right-0 bg-white rounded-full p-2 shadow-lg cursor-pointer hover:bg-gray-50 transition">
                <svg class="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <input 
                  type="file" 
                  accept="image/png,image/jpeg,image/jpg,image/webp" 
                  @change="handleImageSelect" 
                  class="hidden"
                  ref="fileInput"
                />
              </label>
            </div>

            <!-- User Info -->
            <div class="text-white">
              <h2 class="text-2xl font-bold">{{ profileData.username }}</h2>
              <p class="text-amber-100">{{ profileData.email }}</p>
              <span class="inline-block mt-2 px-3 py-1 bg-white/20 rounded-full text-sm">
                {{ getRoleLabel(profileData.role) }}
              </span>
            </div>
          </div>
        </div>

        <!-- Form -->
        <form @submit.prevent="handleSubmit" class="p-8 space-y-6">
          <!-- Basic Information -->
          <div>
            <h3 class="text-lg font-semibold text-gray-900 mb-4">Basic Information</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <!-- Username -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Username</label>
                <input 
                  v-model="profileData.username" 
                  type="text" 
                  class="w-full px-4 py-2.5 bg-white text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition"
                />
              </div>

              <!-- Email (read-only) -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input 
                  v-model="profileData.email" 
                  type="email" 
                  disabled
                  class="w-full px-4 py-2.5 bg-gray-100 text-gray-500 border border-gray-300 rounded-lg cursor-not-allowed"
                />
              </div>

              <!-- First Name -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                <input 
                  v-model="profileData.firstName" 
                  type="text" 
                  class="w-full px-4 py-2.5 bg-white text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition"
                />
              </div>

              <!-- Last Name -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                <input 
                  v-model="profileData.lastName" 
                  type="text" 
                  class="w-full px-4 py-2.5 bg-white text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition"
                />
              </div>

              <!-- Phone -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                <input 
                  v-model="profileData.phone" 
                  type="tel" 
                  placeholder="0812345678"
                  maxlength="10"
                  class="w-full px-4 py-2.5 bg-white text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition"
                />
              </div>
            </div>
          </div>

          <!-- Role-Specific Fields -->
          <!-- Student Fields -->
          <div v-if="profileData.role === 'student'">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">Student Information</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Student ID</label>
                <input 
                  v-model="profileData.studentId" 
                  type="text" 
                  disabled
                  class="w-full px-4 py-2.5 bg-gray-100 text-gray-500 border border-gray-300 rounded-lg cursor-not-allowed"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Year of Study</label>
                <input 
                  v-model="profileData.yearOfStudy" 
                  type="text" 
                  placeholder="เทคโนโลยีสารสนเทศ"
                  class="w-full px-4 py-2.5 bg-white text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition"
                />
              </div>
            </div>
          </div>

          <!-- Teacher Fields -->
          <div v-if="profileData.role === 'teacher'">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">Teacher Information</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Department</label>
                <input 
                  v-model="profileData.department" 
                  type="text" 
                  placeholder="Computer Science"
                  class="w-full px-4 py-2.5 bg-white text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition"
                />
              </div>
            </div>
          </div>

          <!-- Additional Information -->
          <div>
            <h3 class="text-lg font-semibold text-gray-900 mb-4">Additional Information</h3>
            
            <!-- Bio -->
            <div class="mb-6">
              <label class="block text-sm font-medium text-gray-700 mb-2">Bio</label>
              <textarea 
                v-model="profileData.bio" 
                rows="4" 
                placeholder="Tell us about yourself..."
                class="w-full px-4 py-2.5 bg-white text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition resize-none"
              ></textarea>
            </div>

            <!-- Portfolio/Resume Upload -->
            <div class="mb-6">
              <h4 class="text-md font-semibold text-gray-900 mb-3">Portfolio & Resume</h4>
              
              <!-- Portfolio Files Display -->
              <div v-if="profileData.portfolioFiles && profileData.portfolioFiles.length > 0" class="mb-4 space-y-4">
                <div 
                  v-for="(file, index) in profileData.portfolioFiles" 
                  :key="file.id || index"
                  class="border border-gray-200 rounded-lg p-4"
                >
                  <div class="flex items-start justify-between mb-3">
                    <div class="flex items-center">
                      <div class="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center mr-3">
                        <svg v-if="file.type === 'pdf'" class="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18.5,9H13V3.5L18.5,9M6,20V4H11V10H18V20H6Z"/>
                        </svg>
                        <svg v-else class="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8.5,13.5L11,16.5L14.5,12L19,18H5M21,19V5C21,3.89 20.1,3 19,3H5A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19Z"/>
                        </svg>
                      </div>
                      <div>
                        <p class="text-sm font-medium text-gray-900">{{ file.name }}</p>
                        <p class="text-xs text-gray-500">{{ file.type.toUpperCase() }} • {{ formatFileSize(file.size) }}</p>
                      </div>
                    </div>
                    <button 
                      type="button"
                      @click="removePortfolioFile(index, file.id)"
                      :disabled="isRemovingFile"
                      class="text-red-600 hover:text-red-800 text-sm font-medium disabled:opacity-50"
                    >
                      Remove
                    </button>
                  </div>
                  
                  <!-- Preview Section -->
                  <div class="mt-3 border-t pt-3">
                    <!-- Image Preview -->
                    <div v-if="file.type === 'image' && getFileViewUrl(file)" class="max-w-xs">
                      <img 
                        :src="getFileViewUrl(file)" 
                        :alt="file.name"
                        class="w-full h-auto rounded-lg border border-gray-300 shadow-sm"
                        style="max-height: 200px; object-fit: cover;"
                      />
                    </div>
                    
                    <!-- PDF / View link -->
                    <div v-else-if="getFileViewUrl(file)">
                      <a 
                        :href="getFileViewUrl(file)" 
                        target="_blank"
                        class="inline-flex items-center text-blue-600 hover:text-blue-800 text-sm font-medium"
                      >
                        <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                        View File
                      </a>
                    </div>
                    
                    <!-- No Preview Available -->
                    <div v-else class="text-gray-500 text-sm italic">
                      Preview not available
                    </div>
                  </div>
                </div>
              </div>

              <!-- Upload Button -->
              <div 
                class="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-amber-400 transition-colors"
                :class="{ 'opacity-60 pointer-events-none': isUploadingPortfolio }"
              >
                <input 
                  type="file" 
                  ref="portfolioFileInput"
                  accept="image/png,image/jpeg,image/jpg,image/webp,application/pdf"
                  @change="handlePortfolioFileSelect" 
                  class="hidden"
                  multiple
                />
                <label class="cursor-pointer" @click="$refs.portfolioFileInput.click()">
                  <svg class="w-12 h-12 text-gray-400 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                  </svg>
                  <p class="text-sm text-gray-600 mb-1">
                    {{ isUploadingPortfolio ? 'Uploading...' : 'Click to upload portfolio files' }}
                  </p>
                  <p class="text-xs text-gray-500">PNG, JPG, WebP up to 10MB. PDF up to 5MB.</p>
                </label>
              </div>

              <!-- Upload Progress -->
              <div v-if="portfolioUploadProgress > 0" class="mt-3">
                <div class="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    class="bg-amber-500 h-2 rounded-full transition-all duration-300" 
                    :style="{ width: portfolioUploadProgress + '%' }"
                  ></div>
                </div>
                <p class="text-xs text-gray-600 mt-1">Uploading... {{ portfolioUploadProgress }}%</p>
              </div>
            </div>

            <!-- Skills -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Skills (comma-separated)</label>
              <input 
                v-model="skillsInput" 
                type="text" 
                placeholder="JavaScript, Vue.js, Node.js"
                class="w-full px-4 py-2.5 bg-white text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition"
              />
              <div v-if="profileData.skills && profileData.skills.length > 0" class="mt-3 flex flex-wrap gap-2">
                <span 
                  v-for="(skill, index) in profileData.skills" 
                  :key="index"
                  class="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm"
                >
                  {{ skill }}
                </span>
              </div>
            </div>
          </div>

          <!-- Form Actions -->
          <div class="flex gap-4 pt-6 border-t border-gray-200">
            <button 
              type="submit" 
              :disabled="isSaving"
              class="flex-1 bg-gradient-to-r from-green-400 to-emerald-500 hover:from-green-500 hover:to-emerald-600 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed text-white font-medium py-3 rounded-lg transition shadow-md hover:shadow-lg transform hover:-translate-y-0.5 disabled:transform-none disabled:shadow-none"
            >
              <span v-if="isSaving" class="flex items-center justify-center">
                <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Saving...
              </span>
              <span v-else>Save Changes</span>
            </button>
            
            <button 
              type="button" 
              @click="loadProfile"
              :disabled="isSaving"
              class="px-6 py-3 bg-gray-200 hover:bg-gray-300 disabled:bg-gray-100 disabled:cursor-not-allowed text-gray-700 font-medium rounded-lg transition"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue';
import { useToast } from '~/composables/useToast';

// Use default layout
definePageMeta({
  middleware: 'auth'
});

const { getUserProfile, updateUserProfile, uploadAvatar } = useUser();

// State
const isLoading = ref(true);
const isSaving = ref(false);
const loadError = ref('');
const { success: toastSuccess, error: toastError } = useToast();
const previewImage = ref('');
const selectedFile = ref(null);
const fileInput = ref(null);
const portfolioFileInput = ref(null);
const portfolioUploadProgress = ref(0);
const isUploadingPortfolio = ref(false);
const isRemovingFile = ref(false);

const profileData = ref({
  id: '',
  role: '',
  email: '',
  username: '',
  firstName: '',
  lastName: '',
  phone: '',
  yearOfStudy: '',
  department: '',
  studentId: '',
  avatarUrl: '',
  avatarBase64: '',
  bio: '',
  skills: [],
  portfolioFiles: []
});

// Skills input (comma-separated)
const skillsInput = computed({
  get: () => profileData.value.skills?.join(', ') || '',
  set: (value) => {
    profileData.value.skills = value
      .split(',')
      .map(s => s.trim())
      .filter(Boolean);
  }
});

// Load profile data
const loadProfile = async () => {
  isLoading.value = true;
  loadError.value = '';
  
  try {
    const data = await getUserProfile();

    
    // Update profile data
    profileData.value = {
      id: data.id || '',
      role: data.role || '',
      email: data.email || '',
      username: data.username || '',
      firstName: data.firstName || '',
      lastName: data.lastName || '',
      phone: data.phone || '',
      yearOfStudy: data.yearOfStudy || '',
      department: data.department || '',
      studentId: data.studentId || '',
      avatarUrl: data.avatarUrl || '',
      avatarBase64: data.avatarBase64 || '',
      bio: data.bio || '',
      skills: Array.isArray(data.skills) ? data.skills : [],
      portfolioFiles: Array.isArray(data.portfolioFiles) ? data.portfolioFiles.map(file => ({
        id: file.id || new Date().getTime().toString(),
        name: file.name || 'Unknown File',
        type: file.type || 'pdf',
        size: file.size || 0,
        url: file.url || '',
        uploadedAt: file.uploadedAt || new Date()
      })) : []
    };
  } catch (error) {
    console.error('Error loading profile:', error);
    loadError.value = error.message || 'Failed to load profile data';
  } finally {
    isLoading.value = false;
  }
};

// Convert file to base64
const convertToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

// Get the viewable URL for a portfolio file
const getFileViewUrl = (file) => {
  if (file.url) {
    // If it's a relative path, prepend the backend base URL
    if (file.url.startsWith('/uploads/')) {
      const { $api } = useNuxtApp();
      const baseUrl = $api.defaults?.baseURL?.replace('/api', '') || 'http://localhost:4000';
      return `${baseUrl}${file.url}`;
    }
    return file.url;
  }
  return null;
};

// Handle portfolio file selection - uploads immediately to server
const handlePortfolioFileSelect = async (event) => {
  const files = Array.from(event.target.files);
  if (!files || files.length === 0) return;

  isUploadingPortfolio.value = true;

  for (const file of files) {
    await uploadPortfolioFileToServer(file);
  }

  isUploadingPortfolio.value = false;

  // Clear input
  if (portfolioFileInput.value) {
    portfolioFileInput.value.value = '';
  }
};

// Upload portfolio file directly to server via multipart
const uploadPortfolioFileToServer = async (file) => {
  // Validate file size
  const isPdf = file.type === 'application/pdf';
  const maxSize = isPdf ? 5 * 1024 * 1024 : 10 * 1024 * 1024;
  if (file.size > maxSize) {
    toastError(`File "${file.name}" is too large. Max ${isPdf ? '5MB for PDF' : '10MB for images'}`);
    return;
  }

  // Validate file type
  const validTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp', 'application/pdf'];
  if (!validTypes.includes(file.type)) {
    toastError(`File "${file.name}" type not allowed. Only PNG, JPG, WebP, PDF.`);
    return;
  }

  try {
    portfolioUploadProgress.value = 20;

    const { uploadPortfolioFile } = useUser();
    const result = await uploadPortfolioFile(file);

    portfolioUploadProgress.value = 90;

    // The API returns { success, data: { url, fileData } }
    const fileData = result?.data?.fileData || result?.fileData;
    const fileUrl = result?.data?.url || result?.url;

    if (!fileData && !fileUrl) {
      throw new Error('Invalid response from server');
    }

    const newFile = {
      id: fileData?.id || Date.now().toString(),
      name: fileData?.name || file.name,
      type: fileData?.type || (isPdf ? 'pdf' : 'image'),
      size: fileData?.size || file.size,
      url: fileData?.url || fileUrl,
      uploadedAt: fileData?.uploadedAt || new Date()
    };

    if (!profileData.value.portfolioFiles) {
      profileData.value.portfolioFiles = [];
    }
    profileData.value.portfolioFiles.push(newFile);

    portfolioUploadProgress.value = 100;
    toastSuccess(`"${file.name}" uploaded successfully!`);
    setTimeout(() => { portfolioUploadProgress.value = 0; }, 2000);

  } catch (error) {
    console.error('Error uploading portfolio file:', error);
    toastError(`Failed to upload "${file.name}": ${error?.response?.data?.error || error.message || 'Unknown error'}`);
    portfolioUploadProgress.value = 0;
  }
};

// Remove portfolio file - deletes from server then updates local state
const removePortfolioFile = async (index, fileId) => {
  if (!confirm('Are you sure you want to remove this file?')) return;

  isRemovingFile.value = true;
  try {
    if (fileId) {
      const { removePortfolioFile: deleteFile } = useUser();
      await deleteFile(fileId);
    }

    profileData.value.portfolioFiles.splice(index, 1);
    toastSuccess('File removed successfully');
  } catch (error) {
    console.error('Error removing portfolio file:', error);
    toastError(`Failed to remove file: ${error?.response?.data?.error || error.message || 'Unknown error'}`);
  } finally {
    isRemovingFile.value = false;
  }
};

// Format file size
const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

// Handle image selection
const handleImageSelect = async (event) => {
  const file = event.target.files[0];
  if (!file) return;

  // Validate file size (max 5MB)
  if (file.size > 5 * 1024 * 1024) {
    toastError('Image size must be less than 5MB');
    return;
  }

  // Validate file type
  const validTypes = ['image/png', 'image/jpeg', 'image/jpg'];
  if (!validTypes.includes(file.type)) {
    toastError('Only PNG, JPEG, and JPG images are allowed');
    return;
  }

  selectedFile.value = file;

  // Convert to base64 and create preview
  const reader = new FileReader();
  reader.onload = (e) => {
    const base64 = e.target.result;
    previewImage.value = base64;
    profileData.value.avatarBase64 = base64;
  };
  reader.readAsDataURL(file);
};


// Get avatar source (base64 preview or URL)
const getAvatarSource = () => {
  if (previewImage.value) {
    return previewImage.value;
  }
  if (profileData.value.avatarBase64) {
    return profileData.value.avatarBase64;
  }
  if (profileData.value.avatarUrl) {
    return profileData.value.avatarUrl;
  }
  return null;
};

// Handle form submission
const handleSubmit = async () => {
  isSaving.value = true;

  try {
    const { updateUserProfile } = useUser();
    
    // Prepare update data - only send changed fields
    const updateData = {
      username: profileData.value.username,
      firstName: profileData.value.firstName,
      lastName: profileData.value.lastName,
      phone: profileData.value.phone,
      bio: profileData.value.bio,
      skills: profileData.value.skills,
    };

    // Only include avatarBase64 if it has changed
    if (profileData.value.avatarBase64) {
      updateData.avatarBase64 = profileData.value.avatarBase64;
    }

    // Add role-specific fields
    if (profileData.value.role === 'student' || profileData.value.role === 'user') {
      updateData.yearOfStudy = profileData.value.yearOfStudy;
    } else if (profileData.value.role === 'teacher') {
      updateData.department = profileData.value.department;
    }

    // Log for debugging
    console.log('Sending profile update with data:', {
      ...updateData,
      avatarBase64: updateData.avatarBase64 ? '[Base64 data present]' : '[No avatar data]',
      portfolioFiles: updateData.portfolioFiles?.length || 0 + ' files'
    });

    const result = await updateUserProfile(updateData);
    
    console.log('Profile update result:', result);

    // Clear preview states after successful update
    if (profileData.value.avatarBase64) {
      previewImage.value = '';
    }

    toastSuccess('Profile updated successfully!');

    // Reload profile to get latest data from server
    await loadProfile();
    
  } catch (error) {
    console.error('Error updating profile:', error);
    
    // Enhanced error handling
    let errorMsg = 'Failed to update profile';
    
    if (error.response?.data) {
      const errorData = error.response.data;
      
      if (errorData.validationErrors && errorData.validationErrors.length > 0) {
        // Show validation errors in a more readable format
        const validationMessages = errorData.validationErrors.map((err: any) => {
          return `${err.field}: ${err.message}`;
        }).join('\n');
        errorMsg = 'Validation errors:\n' + validationMessages;
      } else if (errorData.error === 'Duplicate entry') {
        errorMsg = errorData.message || 'Duplicate information provided';
      } else if (errorData.message) {
        errorMsg = errorData.message;
      } else if (errorData.error) {
        errorMsg = errorData.error;
      }
    } else if (error.message) {
      errorMsg = error.message;
    }
    
    // Handle specific base64 related errors
    if (errorMsg.includes('base64') || errorMsg.includes('file') || errorMsg.includes('image')) {
      errorMsg = 'File upload error: ' + errorMsg;
    }
    
    toastError(errorMsg);
  } finally {
    isSaving.value = false;
  }
};

// Get role label
const getRoleLabel = (role) => {
  const labels = {
    student: 'Student',
    teacher: 'Teacher',
    company: 'Company',
    admin: 'Administrator',
    user: 'User'
  };
  return labels[role] || role;
};

// Load profile on mount
onMounted(() => {
  loadProfile();
});
</script>
