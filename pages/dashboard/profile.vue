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
        <!-- Success Message -->
        <div v-if="successMessage" class="bg-green-50 border-l-4 border-green-400 p-4 m-6">
          <div class="flex items-center">
            <svg class="w-5 h-5 text-green-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
            <p class="text-green-800">{{ successMessage }}</p>
          </div>
        </div>

        <!-- Error Message -->
        <div v-if="errorMessage" class="bg-red-50 border-l-4 border-red-400 p-4 m-6">
          <div class="flex items-center">
            <svg class="w-5 h-5 text-red-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p class="text-red-800">{{ errorMessage }}</p>
          </div>
        </div>

        <!-- Profile Header with Avatar -->
        <div class="bg-gradient-to-r from-amber-400 to-yellow-500 p-8">
          <div class="flex items-center gap-6">
            <!-- Avatar -->
            <div class="relative">
              <div class="w-32 h-32 rounded-full overflow-hidden bg-white shadow-lg">
                <img 
                  v-if="profileData.avatarUrl || previewImage" 
                  :src="previewImage || profileData.avatarUrl" 
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
            <div class="mb-4">
              <label class="block text-sm font-medium text-gray-700 mb-2">Bio</label>
              <textarea 
                v-model="profileData.bio" 
                rows="4" 
                placeholder="Tell us about yourself..."
                class="w-full px-4 py-2.5 bg-white text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition resize-none"
              ></textarea>
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

<script setup>
import { ref, computed, onMounted, watch } from 'vue';

// Use default layout
definePageMeta({
  middleware: 'auth'
});

const { getUserProfile, updateUserProfile, uploadAvatar } = useUser();

// State
const isLoading = ref(true);
const isSaving = ref(false);
const loadError = ref('');
const successMessage = ref('');
const errorMessage = ref('');
const previewImage = ref('');
const selectedFile = ref(null);
const fileInput = ref(null);

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
  bio: '',
  skills: []
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
  successMessage.value = '';
  errorMessage.value = '';
  
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
      bio: data.bio || '',
      skills: Array.isArray(data.skills) ? data.skills : []
    };
  } catch (error) {
    console.error('Error loading profile:', error);
    loadError.value = error.message || 'Failed to load profile data';
  } finally {
    isLoading.value = false;
  }
};

// Handle image selection
const handleImageSelect = async (event) => {
  const file = event.target.files[0];
  if (!file) return;

  // Validate file size (max 1MB)
  if (file.size > 1000000) {
    errorMessage.value = 'Image size must be less than 1MB';
    setTimeout(() => errorMessage.value = '', 3000);
    return;
  }

  // Validate file type
  const validTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp'];
  if (!validTypes.includes(file.type)) {
    errorMessage.value = 'Only PNG, JPEG, JPG, and WebP images are allowed';
    setTimeout(() => errorMessage.value = '', 3000);
    return;
  }

  selectedFile.value = file;

  // Create preview
  const reader = new FileReader();
  reader.onload = (e) => {
    previewImage.value = e.target.result;
  };
  reader.readAsDataURL(file);

  // Upload immediately
  await uploadImage();
};

// Upload image
const uploadImage = async () => {
  if (!selectedFile.value) return;

  isSaving.value = true;
  errorMessage.value = '';
  successMessage.value = '';

  try {
    const result = await uploadAvatar(selectedFile.value);

    
    // Update avatar URL
    if (result.avatarUrl) {
      profileData.value.avatarUrl = result.avatarUrl;
      previewImage.value = '';
      selectedFile.value = null;
      successMessage.value = 'Profile picture updated successfully!';
      setTimeout(() => successMessage.value = '', 3000);
      
      // Reload profile data from database to ensure persistence
      await loadProfile();
    }
  } catch (error) {
    console.error('Error uploading avatar:', error);
    errorMessage.value = error.message || 'Failed to upload image';
    previewImage.value = '';
    selectedFile.value = null;
    if (fileInput.value) {
      fileInput.value.value = '';
    }
  } finally {
    isSaving.value = false;
  }
};

// Handle form submission
const handleSubmit = async () => {
  isSaving.value = true;
  errorMessage.value = '';
  successMessage.value = '';

  try {
    // Prepare update data
    const updateData = {
      username: profileData.value.username,
      firstName: profileData.value.firstName,
      lastName: profileData.value.lastName,
      phone: profileData.value.phone,
      bio: profileData.value.bio,
      skills: profileData.value.skills
    };

    // Add role-specific fields
    if (profileData.value.role === 'student' || profileData.value.role === 'user') {
      updateData.yearOfStudy = profileData.value.yearOfStudy;
    } else if (profileData.value.role === 'teacher') {
      updateData.department = profileData.value.department;
    }


    const result = await updateUserProfile(updateData);


    successMessage.value = 'Profile updated successfully!';
    setTimeout(() => successMessage.value = '', 3000);

    // Reload profile to get latest data
    await loadProfile();
  } catch (error) {
    console.error('Error updating profile:', error);
    errorMessage.value = error.response?.data?.message || error.message || 'Failed to update profile';
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
