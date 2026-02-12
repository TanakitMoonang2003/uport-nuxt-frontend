<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
    <!-- Header Section -->
    <div class="bg-gradient-to-r from-gray-800 to-gray-900 py-16">
      <div class="container mx-auto px-4">
        <div class="flex items-center justify-between mb-6">
        <NuxtLink
          to="/dashboard/portfolio"
          class="inline-flex items-center text-white hover:text-yellow-400 transition-colors"
        >
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
          </svg>
          Back to Portfolio
        </NuxtLink>
        
        <!-- Edit Button (only for owner) -->
        <button
          v-if="isOwner"
          @click="showEditModal = true"
          class="bg-yellow-500 text-gray-900 px-6 py-2 rounded-lg font-semibold hover:bg-yellow-400 transition-colors flex items-center gap-2"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
          </svg>
          Edit Portfolio
        </button>
      </div>
        
        <div v-if="portfolioItem" class="text-white">
          <div class="flex items-center mb-4">
            <span class="bg-yellow-500 text-gray-900 px-3 py-1 rounded-full text-sm font-semibold uppercase tracking-wide">
              {{ portfolioItem.category }}
            </span>
            <!-- Debug info -->
            <span v-if="user" class="ml-4 text-xs bg-blue-500 px-2 py-1 rounded">
            Portfolio: {{ portfolioItem.submittedBy }}
            </span>
          </div>
          <h1 class="text-4xl md:text-5xl font-bold mb-4">{{ portfolioItem.title }}</h1>
          <p class="text-xl text-gray-300 mb-6">{{ portfolioItem.description }}</p>
        </div>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="min-h-screen flex items-center justify-center">
      <div class="text-center">
        <div class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500 mb-4"></div>
        <p class="text-gray-600">Loading portfolio item...</p>
      </div>
    </div>

    <!-- Main Content -->
    <div v-else-if="portfolioItem" class="container mx-auto px-4 py-12">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Project Image -->
        <div class="lg:col-span-2">
          <div class="bg-white rounded-2xl shadow-xl overflow-hidden">
            <img 
              :src="getPortfolioImage(portfolioItem)" 
              :alt="portfolioItem.title"
              class="w-full h-64 md:h-80 object-cover"
              @error="handleImageError"
            />
          </div>
        </div>

        <!-- Project Info -->
        <div class="space-y-6">
          <!-- Project Details Card -->
          <div class="bg-white rounded-2xl shadow-xl p-6">
            <h3 class="text-xl font-bold text-gray-800 mb-4">Project Details</h3>
            <div class="space-y-3">
              <div>
                <span class="text-sm font-semibold text-gray-600">Duration:</span>
                <p class="text-gray-800">{{ portfolioItem.duration }}</p>
              </div>
              <div>
                <span class="text-sm font-semibold text-gray-600">Client:</span>
                <p class="text-gray-800">{{ portfolioItem.client }}</p>
              </div>
              <div class="flex space-x-3 pt-4">
                <a 
                  :href="portfolioItem.demoUrl" 
                  target="_blank"
                  class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
                >
                  <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                  </svg>
                  Live Demo
                </a>
                <a 
                  :href="portfolioItem.githubUrl" 
                  target="_blank"
                  class="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-900 transition-colors flex items-center"
                >
                  <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  GitHub
                </a>
              </div>
            </div>
          </div>

          <!-- Technologies Card -->
          <div class="bg-white rounded-2xl shadow-xl p-6">
            <h3 class="text-xl font-bold text-gray-800 mb-4">Technologies Used</h3>
            <div class="flex flex-wrap gap-2">
              <span 
                v-for="tech in portfolioItem.technologies" 
                :key="tech"
                class="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-3 py-1 rounded-full text-sm font-medium"
              >
                {{ tech }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Full Description -->
      <div class="mt-12">
        <div class="bg-white rounded-2xl shadow-xl p-8">
          <h3 class="text-2xl font-bold text-gray-800 mb-6">About This Project</h3>
          <p class="text-gray-600 text-lg leading-relaxed">{{ portfolioItem.fullDescription }}</p>
        </div>
      </div>

      <!-- Features -->
      <div class="mt-12">
        <div class="bg-white rounded-2xl shadow-xl p-8">
          <h3 class="text-2xl font-bold text-gray-800 mb-6">Key Features</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div 
              v-for="feature in portfolioItem.features" 
              :key="feature"
              class="flex items-center p-4 bg-gradient-to-r from-yellow-50 to-amber-50 rounded-lg"
            >
              <svg class="w-5 h-5 text-yellow-500 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <span class="text-gray-700">{{ feature }}</span>
            </div>
          </div>
        </div>

        <!-- Comment Section -->
        <div class="container mx-auto px-4 mt-12">
          <CommentSection
            v-if="portfolioItem"
            :portfolio-id="portfolioItem.id"
            :portfolio-owner="portfolioItem.submittedBy"
          />
        </div>
      </div>
    </div>

    <!-- Not Found State -->
    <div v-else class="min-h-screen flex flex-col items-center justify-center">
      <div class="text-center">
        <h1 class="text-4xl font-bold text-gray-800 mb-4">Project Not Found</h1>
        <p class="text-gray-600 mb-6">The portfolio item you're looking for doesn't exist.</p>
        <NuxtLink
          to="/dashboard/portfolio"
          class="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Back to Portfolio
        </NuxtLink>
      </div>
    </div>

    <!-- Edit Modal -->
    <PortfolioEditModal
      v-if="showEditModal"
      :portfolio="portfolioItem"
      @close="showEditModal = false"
      @updated="handlePortfolioUpdated"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';

const route = useRoute();
const { getPortfolioItemById } = usePortfolio();
const { user } = useAuth();

const id = route.params.id;
const portfolioItem = ref(null);
const loading = ref(true);
const showEditModal = ref(false);

// Check if current user owns this portfolio
const isOwner = computed(() => {
  const hasUser = !!user.value;
  const hasPortfolio = !!portfolioItem.value;
  const userEmail = user.value?.email;
  const portfolioOwner = portfolioItem.value?.submittedBy;
  const matches = userEmail === portfolioOwner;

  
  if (!user.value || !portfolioItem.value) return false;
  return user.value.email === portfolioItem.value.submittedBy;
});

// Load portfolio item data
onMounted(async () => {
  await loadPortfolioItem();
});

const loadPortfolioItem = async () => {
  loading.value = true;
  try {

    
    const item = await getPortfolioItemById(id);
    portfolioItem.value = item;
 

    // Set page title
    if (item) {
      useHead({
        title: `${item.title} - Portfolio`,
        meta: [
          { name: 'description', content: item.description }
        ]
      });
    } else {
      console.log('No portfolio item found for ID:', id);
    }
  } catch (error) {
    console.error('Error loading portfolio item:', error);
    portfolioItem.value = null;
  } finally {
    loading.value = false;
  }
};

// Helper function to get the correct image source
const getPortfolioImage = (item) => {
  if (!item) return 'https://placehold.co/800x600/FCD34D/1F2937?text=Portfolio+Image';
  
  // Priority 1: Use uploaded file (base64) if it's an image
  if (item.uploadedFile && item.uploadedFile.startsWith('data:image')) {
 
    return item.uploadedFile;
  }
  
  // Priority 2: Use image URL if valid and not a placeholder
  if (item.image && item.image !== '' && !item.image.includes('placeholder')) {
   
    return item.image;
  }
  

  return 'https://placehold.co/800x600/FCD34D/1F2937?text=Portfolio+Image';
};

// Handle image load errors
const handleImageError = (event) => {
  event.target.src = 'https://placehold.co/800x600/FCD34D/1F2937?text=Image+Not+Available';
};

// Handle portfolio update from modal
const handlePortfolioUpdated = async () => {

  await loadPortfolioItem();
};
</script>
