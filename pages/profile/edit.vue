<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Login Modal -->
    <LoginModal :is-open="showLoginModal" @close="showLoginModal = false" />
    
    <div class="max-w-4xl mx-auto px-4 py-8">
      <!-- Header -->
      <div class="bg-white rounded-2xl shadow-lg p-8 mb-8">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-3xl font-bold text-gray-800 mb-2">Edit Profile</h1>
            <p class="text-gray-600">Update your personal information and preferences</p>
          </div>
          <button
            @click="goBack"
            class="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg transition"
          >
            ← Back to Profile
          </button>
        </div>
      </div>

      <!-- Success/Error Messages -->
      <div v-if="successMessage" class="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700">
        {{ successMessage }}
      </div>
      
      <div v-if="errorMessage" class="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
        {{ errorMessage }}
      </div>

      <!-- Edit Form -->
      <form @submit.prevent="updateProfile" class="space-y-8">
        <!-- Personal Information -->
        <div class="bg-white rounded-2xl shadow-lg p-8">
          <h2 class="text-2xl font-bold text-gray-800 mb-6">Personal Information</h2>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- First Name -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">First Name</label>
              <input
                v-model="formData.firstName"
                type="text"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition"
                placeholder="Enter your first name"
              />
            </div>

            <!-- Last Name -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
              <input
                v-model="formData.lastName"
                type="text"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition"
                placeholder="Enter your last name"
              />
            </div>

            <!-- Email (Read-only) -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input
                :value="formData.email"
                type="email"
                disabled
                class="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100 text-gray-500"
                placeholder="Email address"
              />
              <p class="text-sm text-gray-500 mt-1">Email cannot be changed</p>
            </div>

            <!-- Phone -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
              <input
                v-model="formData.phone"
                type="tel"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition"
                placeholder="Enter your phone number"
              />
            </div>

            <!-- Year of Study (for students) -->
            <div v-if="userType === 'student'">
              <label class="block text-sm font-medium text-gray-700 mb-2">Year of Study</label>
              <input
                v-model="formData.yearOfStudy"
                type="text"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition"
                placeholder="e.g., 4แผนก"
              />
            </div>

            <!-- Department (for teachers) -->
            <div v-if="userType === 'teacher'">
              <label class="block text-sm font-medium text-gray-700 mb-2">Department</label>
              <input
                v-model="formData.department"
                type="text"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition"
                placeholder="Enter your department"
              />
            </div>
          </div>
        </div>

        <!-- About Section -->
        <div class="bg-white rounded-2xl shadow-lg p-8">
          <h2 class="text-2xl font-bold text-gray-800 mb-6">About Me</h2>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Bio</label>
            <textarea
              v-model="formData.bio"
              rows="4"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition resize-none"
              placeholder="Tell us about yourself..."
            ></textarea>
          </div>

          <div class="mt-6">
            <label class="block text-sm font-medium text-gray-700 mb-2">About</label>
            <textarea
              v-model="formData.about"
              rows="6"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition resize-none"
              placeholder="Detailed information about your background, experience, and goals..."
            ></textarea>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="flex justify-end space-x-4">
          <button
            type="button"
            @click="goBack"
            class="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            :disabled="isLoading"
            class="px-6 py-3 bg-gradient-to-r from-yellow-400 to-amber-500 text-white rounded-lg hover:from-yellow-500 hover:to-amber-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span v-if="isLoading" class="flex items-center">
              <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Updating...
            </span>
            <span v-else>Update Profile</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const { getUserProfile, updateUserProfile, isAuthenticated } = useUser();

// Reactive data
const formData = ref({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  yearOfStudy: '',
  department: '',
  bio: '',
  about: ''
});

const userType = ref('');
const isLoading = ref(false);
const showLoginModal = ref(false);
const successMessage = ref('');
const errorMessage = ref('');

onMounted(async () => {
  // Check if user is authenticated
  if (!isAuthenticated()) {
    showLoginModal.value = true;
    return;
  }
  
  await loadUserData();
});

const loadUserData = async () => {
  try {
    const profile = await getUserProfile();
    if (profile) {
      formData.value = {
        firstName: profile.firstName || '',
        lastName: profile.lastName || '',
        email: profile.email || '',
        phone: profile.phone || '',
        yearOfStudy: profile.yearOfStudy || '',
        department: profile.department || '',
        bio: profile.bio || '',
        about: profile.about || ''
      };
      userType.value = profile.userType || 'student';
    }
  } catch (error) {
    console.error('Error loading user data:', error);
    errorMessage.value = 'Failed to load profile data';
  }
};

const updateProfile = async () => {
  isLoading.value = true;
  successMessage.value = '';
  errorMessage.value = '';

  try {
    const result = await updateUserProfile(formData.value);
    
    if (result) {
      successMessage.value = 'Profile updated successfully!';
      
      // Redirect back to profile after 2 seconds
      setTimeout(() => {
        navigateTo('/profile');
      }, 2000);
    } else {
      errorMessage.value = 'Failed to update profile. Please try again.';
    }
  } catch (error) {
    console.error('Error updating profile:', error);
    errorMessage.value = 'An error occurred while updating your profile.';
  } finally {
    isLoading.value = false;
  }
};

const goBack = () => {
  navigateTo('/profile');
};
</script>
