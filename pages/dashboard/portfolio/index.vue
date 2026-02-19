<template>
  <div
    class="min-h-screen bg-gradient-to-br from-yellow-50 via-amber-50 to-orange-50"
  >
    <!-- Header Section -->
    <div
      class="relative h-64 bg-gradient-to-r from-gray-800 to-gray-900 flex items-center justify-center overflow-hidden"
    >
      <div class="absolute inset-0 opacity-20">
        <div
          class="absolute top-10 left-20 w-32 h-32 bg-yellow-400 rounded-full blur-3xl"
        ></div>
        <div
          class="absolute bottom-10 right-20 w-40 h-40 bg-amber-500 rounded-full blur-3xl"
        ></div>
      </div>
      <h1 class="text-5xl font-bold text-white z-10">Portfolio</h1>
    </div>

    <div class="container mx-auto px-4 py-12">
      <!-- Hero Section -->
      <div class="text-center mb-12">
        <h2 class="text-3xl md:text-4xl font-bold text-amber-900 mb-4">
          Empower Your Digital Presence, Take Action With
        </h2>
        <h3 class="text-2xl md:text-3xl font-semibold text-amber-700 mb-6">
          Our Expertise!
        </h3>
        <NuxtLink
          to="/dashboard/upload"
          class="inline-block bg-gradient-to-r from-purple-600 to-purple-700 text-white px-8 py-3 rounded-full font-semibold hover:from-purple-700 hover:to-purple-800 transform hover:scale-105 transition-all shadow-lg"
        >
          GET STARTED
        </NuxtLink>
      </div>

      <!-- Category Filter -->
      <div class="mb-12">
        <h3 class="text-2xl font-bold text-amber-900 text-center mb-6">
          category
        </h3>
        <div class="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
          <button
            v-for="category in categories"
            :key="category.id"
            @click="selectedCategory = category.id"
            :class="[
              'px-6 py-3 rounded-lg font-medium transition-all transform hover:scale-105',
              selectedCategory === category.id
                ? 'bg-gradient-to-r from-yellow-400 to-amber-500 text-white shadow-lg'
                : 'bg-white text-amber-800 border-2 border-yellow-200 hover:border-amber-400',
            ]"
          >
            {{ category.label }}
          </button>
        </div>
      </div>

      <!-- Portfolio Grid -->
      <div class="mb-8">
        <h3 class="text-2xl font-bold text-amber-900 text-center mb-8">
          Portfolio Projects
        </h3>
        
        <!-- Loading State -->
        <div v-if="loading" class="text-center py-8">
          <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-500"></div>
          <p class="mt-2 text-gray-600">Loading portfolio items...</p>
        </div>
        
        <!-- Portfolio Items -->
        <div v-else-if="portfolioItems.length > 0" class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <div
            v-for="item in visibleItems"
            :key="item.id"
            @click="handlePortfolioClick(item)"
            class="group relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 cursor-pointer block"
          >
            <div class="aspect-square relative">
              <!-- Portfolio Image -->
              <img 
                :src="getPortfolioImage(item)" 
                :alt="item.title"
                class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                @error="handleImageError"
              />

              <!-- Hover Overlay -->
              <div
                class="absolute inset-0 bg-gradient-to-t from-yellow-600 to-transparent opacity-0 group-hover:opacity-90 transition-opacity duration-300 flex items-end justify-center pb-6"
              >
                <div
                  class="text-white text-center transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300"
                >
                  <h4 class="text-lg font-bold mb-2">{{ item.title }}</h4>
                  <p class="text-sm uppercase tracking-wider">
                    {{ categories.find(cat => cat.id === item.category)?.label || item.category }}
                  </p>
                </div>
              </div>

              <!-- Yellow glow effect -->
              <div
                class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              >
                <div
                  class="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-yellow-400/20 to-amber-600/20"
                ></div>
              </div>
              
              <!-- Project Info Overlay -->
              <div class="absolute inset-0 flex flex-col justify-end p-4 text-white bg-gradient-to-t from-black/60 to-transparent">
                <h3 class="text-lg font-bold mb-1">{{ item.title }}</h3>
                <p class="text-sm opacity-90 mb-2 line-clamp-2">{{ item.description }}</p>
                <span class="inline-block bg-yellow-500 text-gray-900 px-2 py-1 rounded-full text-xs font-semibold self-start">
                  {{ item.category.toUpperCase() }}
                </span>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Empty State -->
        <div v-else class="text-center py-12">
          <div class="text-gray-400 mb-4">
            <svg class="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          </div>
          <h3 class="text-lg font-medium text-gray-900 mb-2">No portfolio items found</h3>
          <p class="text-gray-500">No projects match the selected category.</p>
        </div>
      </div>

      <!-- Load More Button -->
      <div v-if="showLoadMore" class="text-center mt-12 space-y-4">
        <button
          @click="loadMoreProjects"
          class="bg-gradient-to-r from-yellow-400 to-amber-500 text-white px-10 py-3 rounded-full font-semibold hover:from-yellow-500 hover:to-amber-600 transform hover:scale-105 transition-all shadow-lg"
        >
          Load More Projects
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from "vue";

// Set layout to dashboard to ensure navbar is shown
definePageMeta({
  layout: 'dashboard'
})

const { getPortfolioItemsByCategory } = usePortfolio();

const selectedCategory = ref("all");
const portfolioItems = ref([]);
const loading = ref(true);

// Load-more state
const ITEMS_PER_PAGE = 12;
const itemsToShow = ref(ITEMS_PER_PAGE);

const categories = [
  { id: "all", label: "All" },
  { id: "web", label: "WEB" },
  { id: "mobile", label: "MOBILE" },
  { id: "uiux", label: "UI/UX" },
  { id: "fullstack", label: "FULLSTACK DEVELOPER" },
  { id: "game", label: "GAME DEVELOP" },
];

const filteredItems = computed(() => {
  // Filter by selected category (already filtered by API, but double-check)
  let filtered = portfolioItems.value;
  
  if (selectedCategory.value && selectedCategory.value !== 'all') {
    filtered = filtered.filter(item => item.category === selectedCategory.value);
  }
  
  // Only show approved items (should already be filtered by API, but ensure)
  filtered = filtered.filter(item => item.status === 'approved');
  

  
  return filtered;
});

// Items that are actually visible (respect load-more)
const visibleItems = computed(() => {
  return filteredItems.value.slice(0, itemsToShow.value);
});

// Whether to show "Load More" button
const showLoadMore = computed(() => {
  return filteredItems.value.length > itemsToShow.value && filteredItems.value.length > ITEMS_PER_PAGE;
});

// Load portfolio items on component mount
onMounted(async () => {
  itemsToShow.value = ITEMS_PER_PAGE;
  await loadPortfolioItems();
});

// Watch for category changes
watch(selectedCategory, async () => {
  itemsToShow.value = ITEMS_PER_PAGE;
  await loadPortfolioItems();
});

const loadPortfolioItems = async () => {
  loading.value = true;
  try {
    
    
    const items = await getPortfolioItemsByCategory(selectedCategory.value);
    portfolioItems.value = items;
    // Reset visible count whenever we (re)load items
    itemsToShow.value = ITEMS_PER_PAGE;
   
  } catch (error) {
    console.error('Error loading portfolio items:', error);
    portfolioItems.value = [];
  } finally {
    loading.value = false;
  }
};

// Load more projects (add another page of items)
const loadMoreProjects = () => {
  const total = filteredItems.value.length;
  if (itemsToShow.value < total) {
    itemsToShow.value = Math.min(itemsToShow.value + ITEMS_PER_PAGE, total);
  }
};

// Handle portfolio item click
const handlePortfolioClick = (item) => {

  
  // Use window.location for more reliable navigation
  window.location.href = `/dashboard/portfolio/${item.id}`;
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
  
  // Priority 3: Fallback to themed placeholder
  return 'https://placehold.co/800x600/FCD34D/1F2937?text=Portfolio+Image';
};

// Handle image load errors
const handleImageError = (event) => {
  event.target.src = 'https://placehold.co/800x600/FCD34D/1F2937?text=Image+Not+Available';
};
</script>

<style scoped>
/* Additional styles if needed */
</style>
