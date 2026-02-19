<template>
  <div class="min-h-screen bg-gray-50">
    <div class="max-w-6xl mx-auto px-4 py-8">
      <!-- Loading State -->
      <div v-if="loading" class="flex items-center justify-center min-h-96">
        <div class="text-center">
          <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500 mx-auto"></div>
          <p class="mt-4 text-gray-600">Loading profile...</p>
        </div>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="flex items-center justify-center min-h-96">
        <div class="text-center">
          <svg class="w-16 h-16 mx-auto mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h1 class="text-2xl font-bold text-gray-800 mb-2">Profile Not Found</h1>
          <p class="text-gray-600 mb-6">{{ error }}</p>
          <NuxtLink
            to="/dashboard/portfolio"
            class="bg-amber-500 text-white px-6 py-3 rounded-lg hover:bg-amber-600 transition-colors"
          >
            Back to Portfolio
          </NuxtLink>
        </div>
      </div>

      <!-- Profile Content -->
      <div v-else-if="userProfile" class="space-y-8">
        <!-- Profile Header -->
        <div class="bg-white rounded-2xl shadow-lg p-8">
          <div class="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
            <!-- Profile Picture -->
            <div class="relative">
              <img
                :src="userProfile.avatarUrl || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop'"
                :alt="userProfile.name || 'Profile'"
                class="w-32 h-32 rounded-full object-cover border-4 border-amber-400"
              />
              <div class="absolute bottom-0 right-0 bg-green-500 w-6 h-6 rounded-full border-4 border-white"></div>
            </div>
            
            <!-- Profile Info -->
            <div class="flex-1 text-center md:text-left">
              <h1 class="text-3xl font-bold text-gray-800 mb-2">
                {{ `${userProfile.firstName || ''} ${userProfile.lastName || ''}`.trim() || userProfile.username || 'Loading...' }}
              </h1>
              <p class="text-xl text-gray-600 mb-2">{{ getRoleLabel(userProfile.role) }}</p>
              <p class="text-gray-600 mb-4">{{ userProfile.email }}</p>
              
              <!-- Additional Info -->
              <div v-if="userProfile.role === 'student' || userProfile.role === 'user'" class="mb-4">
                <p v-if="userProfile.yearOfStudy" class="text-sm text-gray-500">
                  Year: {{ userProfile.yearOfStudy }}
                </p>
                <p v-if="userProfile.studentId" class="text-sm text-gray-500">
                  Student ID: {{ userProfile.studentId }}
                </p>
              </div>
              
              <div v-else-if="userProfile.role === 'teacher'" class="mb-4">
                <p v-if="userProfile.department" class="text-sm text-gray-500">
                  Department: {{ userProfile.department }}
                </p>
              </div>

              <p v-if="userProfile.bio" class="text-gray-700 mb-4">{{ userProfile.bio }}</p>
              
              <!-- Contact Info -->
              <div class="flex flex-wrap justify-center md:justify-start gap-4 text-sm text-gray-600">
                <div v-if="userProfile.phone" class="flex items-center">
                  <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  {{ userProfile.phone }}
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Skills Section -->
        <div v-if="userProfile.skills && userProfile.skills.length > 0" class="bg-white rounded-2xl shadow-lg p-8">
          <h2 class="text-2xl font-bold text-gray-800 mb-6">Skills</h2>
          <div class="flex flex-wrap gap-2">
            <span 
              v-for="skill in userProfile.skills" 
              :key="skill"
              class="px-4 py-2 bg-gradient-to-r from-amber-100 to-yellow-100 text-amber-800 rounded-full text-sm font-medium"
            >
              {{ skill }}
            </span>
          </div>
        </div>

        <!-- Portfolio/Resume Section -->
        <div v-if="userProfile.portfolioFiles && userProfile.portfolioFiles.length > 0" class="bg-white rounded-2xl shadow-lg p-8">
          <h2 class="text-2xl font-bold text-gray-800 mb-6">Portfolio & Resume</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div 
              v-for="(file, index) in userProfile.portfolioFiles" 
              :key="file.id || index"
              class="border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow"
            >
              <!-- Image Preview -->
              <div v-if="file.type === 'image' && resolveFileUrl(file.url)" class="relative">
                <img
                  :src="resolveFileUrl(file.url)"
                  :alt="file.name"
                  class="w-full h-48 object-cover cursor-zoom-in"
                  @click="openLightbox(file.url)"
                  @error="handleFileImageError"
                />
                <div class="absolute inset-0 bg-black/0 hover:bg-black/20 transition-colors cursor-zoom-in flex items-center justify-center opacity-0 hover:opacity-100"
                     @click="openLightbox(file.url)">
                  <span class="bg-white/90 text-gray-800 text-xs font-medium px-3 py-1 rounded-full flex items-center gap-1">
                    <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" /></svg>
                    ดูภาพ
                  </span>
                </div>
              </div>

              <!-- PDF Thumbnail -->
              <div v-else-if="file.type === 'pdf'" class="h-48 bg-gradient-to-br from-red-50 to-orange-50 flex flex-col items-center justify-center cursor-pointer"
                   @click="openFileUrl(file.url)">
                <svg class="w-16 h-16 text-red-500 mb-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18.5,9H13V3.5L18.5,9M6,20V4H11V10H18V20H6Z"/>
                </svg>
                <span class="text-red-600 text-sm font-semibold">PDF Document</span>
                <span class="text-gray-500 text-xs mt-1">Click to view</span>
              </div>

              <!-- File Info -->
              <div class="p-4">
                <p class="text-sm font-semibold text-gray-900 truncate mb-1" :title="file.name">{{ file.name }}</p>
                <p class="text-xs text-gray-500 mb-3">{{ file.type.toUpperCase() }} • {{ formatFileSize(file.size) }}</p>
                <!-- View Image: lightbox | Open PDF: new tab -->
                <button
                  v-if="file.type === 'image'"
                  @click="openLightbox(file.url)"
                  class="inline-flex items-center text-amber-600 hover:text-amber-700 text-sm font-medium"
                >
                  <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  View Image
                </button>
                <a
                  v-else
                  :href="resolveFileUrl(file.url)"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="inline-flex items-center text-amber-600 hover:text-amber-700 text-sm font-medium"
                >
                  <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                  </svg>
                  Open PDF
                </a>
              </div>
            </div>
          </div>
        </div>

        <!-- Portfolio Projects Section -->
        <div v-if="userProjects && userProjects.length > 0" class="bg-white rounded-2xl shadow-lg p-8">
          <h2 class="text-2xl font-bold text-gray-800 mb-6">Portfolio Projects</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div 
              v-for="project in userProjects" 
              :key="project.id"
              class="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
              @click="navigateToProject(project.id)"
            >
              <img 
                :src="getProjectImage(project)" 
                :alt="project.title"
                class="w-full h-48 object-cover"
                @error="handleImageError"
              />
              <div class="p-4">
                <h3 class="font-semibold text-gray-800 mb-2">{{ project.title }}</h3>
                <p class="text-sm text-gray-600 mb-3 line-clamp-2">{{ project.description }}</p>
                <div class="flex items-center justify-between">
                  <span class="text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded-full">
                    {{ project.category }}
                  </span>
                  <div class="flex space-x-2">
                    <a 
                      :href="project.demoUrl" 
                      target="_blank"
                      @click.stop
                      class="text-blue-600 hover:text-blue-800 text-sm"
                    >
                      Demo
                    </a>
                    <a 
                      :href="project.githubUrl" 
                      target="_blank"
                      @click.stop
                      class="text-gray-600 hover:text-gray-800 text-sm"
                    >
                      GitHub
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- No Projects Message -->
        <div v-else-if="userProfile && (!userProjects || userProjects.length === 0)" class="bg-white rounded-2xl shadow-lg p-8 text-center">
          <svg class="w-16 h-16 mx-auto mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
          <h3 class="text-xl font-semibold text-gray-800 mb-2">No Portfolio Projects Yet</h3>
          <p class="text-gray-600">This user hasn't added any portfolio projects yet.</p>
        </div>
      </div>
    </div>
  </div>

  <!-- Lightbox Overlay -->
  <Teleport to="body">
    <div
      v-if="lightboxUrl"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
      @click.self="lightboxUrl = null"
      @keydown.esc="lightboxUrl = null"
      tabindex="0"
      ref="lightboxEl"
    >
      <!-- Close button -->
      <button
        @click="lightboxUrl = null"
        class="absolute top-4 right-4 text-white bg-black/50 hover:bg-black/80 rounded-full w-10 h-10 flex items-center justify-center transition-colors z-10"
      >
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
      <!-- Image -->
      <img
        :src="lightboxUrl"
        class="max-w-[90vw] max-h-[90vh] object-contain rounded-lg shadow-2xl select-none"
        @click.stop
      />
    </div>
  </Teleport>
</template>

<script setup>
import { ref, onMounted, watch, nextTick } from 'vue';

const route = useRoute();
const { getPortfolioByUser } = usePortfolio();
const { getPublicUserProfile } = useUser();

const loading = ref(true);
const error = ref('');
const userProfile = ref(null);
const userProjects = ref([]);
const lightboxUrl = ref(null);
const lightboxEl = ref(null);

const openLightbox = (url) => {
  lightboxUrl.value = resolveFileUrl(url);
  nextTick(() => lightboxEl.value?.focus());
};

// Close lightbox on ESC key globally
if (process.client) {
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') lightboxUrl.value = null;
  });
}

// Get user email from route params
const userEmail = route.params.email;

// Load user profile and projects
onMounted(async () => {
  await loadUserProfile();
  await loadUserProjects();
});

const loadUserProfile = async () => {
  try {
    const profile = await getPublicUserProfile(userEmail);
    userProfile.value = profile;
  } catch (err) {
    console.error('Error loading user profile:', err);
    error.value = 'Failed to load user profile';
  } finally {
    loading.value = false;
  }
};

const loadUserProjects = async () => {
  try {
    const email = userProfile.value?.email || decodeURIComponent(String(userEmail));
    const projects = await getPortfolioByUser(email);
    userProjects.value = projects || [];
  } catch (err) {
    console.error('Error loading user projects:', err);
    userProjects.value = [];
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

// Format file size
const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

// Resolve file URL - prepend backend base URL for relative /uploads/ paths
const resolveFileUrl = (url) => {
  if (!url) return null;
  if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('data:')) {
    return url;
  }
  if (url.startsWith('/uploads/')) {
    const { $api } = useNuxtApp();
    const baseUrl = ($api.defaults?.baseURL || 'http://localhost:4000/api').replace(/\/api\/?$/, '');
    return `${baseUrl}${url}`;
  }
  return url;
};

// Open file URL in new tab (PDF only)
const openFileUrl = (url) => {
  const resolved = resolveFileUrl(url);
  if (resolved) {
    window.open(resolved, '_blank', 'noopener,noreferrer');
  }
};

// Handle broken file image
const handleFileImageError = (event) => {
  event.target.style.display = 'none';
};

// Get project image
const getProjectImage = (project) => {
  if (!project) return 'https://placehold.co/400x300/FCD34D/1F2937?text=Project+Image';
  
  if (project.uploadedFile && project.uploadedFile.startsWith('data:image')) {
    return project.uploadedFile;
  }
  
  if (project.image && project.image !== '' && !project.image.includes('placeholder')) {
    return project.image;
  }
  
  return 'https://placehold.co/400x300/FCD34D/1F2937?text=Project+Image';
};

// Handle image error
const handleImageError = (event) => {
  event.target.src = 'https://placehold.co/400x300/FCD34D/1F2937?text=Image+Not+Available';
};

// Navigate to project detail
const navigateToProject = (projectId) => {
  navigateTo(`/dashboard/portfolio/${projectId}`);
};

// Set page title
useHead({
  title: `${userProfile.value?.displayName || 'User Profile'} - Portfolio`,
});
</script>
