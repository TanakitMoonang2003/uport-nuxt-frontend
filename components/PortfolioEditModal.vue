<template>
  <div class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
    <div class="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
      <!-- Header -->
      <div class="sticky top-0 bg-gradient-to-r from-yellow-400 to-amber-500 px-8 py-6 flex items-center justify-between">
        <h2 class="text-2xl font-bold text-white">Edit Portfolio</h2>
        <button
          @click="$emit('close')"
          class="text-white hover:text-gray-200 transition-colors"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>

      <!-- Form -->
      <form @submit.prevent="handleSubmit" class="p-8 space-y-6">
        <!-- Title -->
        <div>
          <label class="block text-sm font-semibold text-gray-700 mb-2">Title *</label>
          <input
            v-model="formData.title"
            type="text"
            required
            class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200"
            placeholder="Portfolio title"
          />
        </div>

        <!-- Category -->
        <div>
          <label class="block text-sm font-semibold text-gray-700 mb-2">Category *</label>
          <select
            v-model="formData.category"
            required
            class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200"
          >
            <option value="web">Web Development</option>
            <option value="mobile">Mobile Application</option>
            <option value="uiux">UI/UX Design</option>
            <option value="fullstack">Fullstack Developer</option>
            <option value="game">Game Development</option>
          </select>
        </div>

        <!-- Description -->
        <div>
          <label class="block text-sm font-semibold text-gray-700 mb-2">Short Description *</label>
          <textarea
            v-model="formData.description"
            required
            rows="2"
            class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 resize-none"
            placeholder="Brief description (shown in cards)"
          ></textarea>
        </div>

        <!-- Full Description -->
        <div>
          <label class="block text-sm font-semibold text-gray-700 mb-2">Full Description *</label>
          <textarea
            v-model="formData.fullDescription"
            required
            rows="4"
            class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 resize-none"
            placeholder="Detailed description of your project"
          ></textarea>
        </div>

        <!-- Technologies -->
        <div>
          <label class="block text-sm font-semibold text-gray-700 mb-2">Technologies</label>
          <input
            v-model="technologiesInput"
            type="text"
            class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200"
            placeholder="e.g., Vue.js, Node.js, MongoDB (comma-separated)"
          />
          <p class="text-sm text-gray-500 mt-1">Separate technologies with commas</p>
        </div>

        <!-- Features -->
        <div>
          <label class="block text-sm font-semibold text-gray-700 mb-2">Key Features</label>
          <textarea
            v-model="featuresInput"
            rows="3"
            class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 resize-none"
            placeholder="One feature per line"
          ></textarea>
          <p class="text-sm text-gray-500 mt-1">Enter one feature per line</p>
        </div>

        <!-- URLs Row -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <!-- Demo URL -->
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-2">Demo URL</label>
            <input
              v-model="formData.demoUrl"
              type="url"
              class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200"
              placeholder="https://demo.example.com"
            />
          </div>

          <!-- GitHub URL -->
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-2">GitHub URL</label>
            <input
              v-model="formData.githubUrl"
              type="url"
              class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200"
              placeholder="https://github.com/username/repo"
            />
          </div>
        </div>

        <!-- Duration and Client Row -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <!-- Duration -->
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-2">Duration *</label>
            <input
              v-model="formData.duration"
              type="text"
              required
              class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200"
              placeholder="e.g., 3 months"
            />
          </div>

          <!-- Client -->
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-2">Client *</label>
            <input
              v-model="formData.client"
              type="text"
              required
              class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200"
              placeholder="e.g., Personal Project"
            />
          </div>
        </div>

        <!-- Error Message -->
        <div v-if="errorMessage" class="bg-red-50 border-l-4 border-red-400 p-4 rounded-r-lg">
          <p class="text-sm text-red-800">{{ errorMessage }}</p>
        </div>

        <!-- Success Message -->
        <div v-if="successMessage" class="bg-green-50 border-l-4 border-green-400 p-4 rounded-r-lg">
          <p class="text-sm text-green-800">{{ successMessage }}</p>
        </div>

        <!-- Action Buttons -->
        <div class="flex gap-4 pt-4">
          <button
            type="submit"
            :disabled="isLoading"
            class="flex-1 bg-gradient-to-r from-yellow-400 to-amber-500 text-white font-bold py-4 px-6 rounded-xl hover:from-yellow-500 hover:to-amber-600 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span v-if="isLoading" class="flex items-center justify-center">
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
            @click="$emit('close')"
            :disabled="isLoading"
            class="px-6 py-4 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';

const props = defineProps({
  portfolio: {
    type: Object,
    required: true
  }
});

const emit = defineEmits(['close', 'updated']);

const { updatePortfolioItem } = usePortfolio();

const isLoading = ref(false);
const errorMessage = ref('');
const successMessage = ref('');

// Form data
const formData = ref({
  title: props.portfolio.title || '',
  category: props.portfolio.category || 'web',
  description: props.portfolio.description || '',
  fullDescription: props.portfolio.fullDescription || '',
  demoUrl: props.portfolio.demoUrl || '',
  githubUrl: props.portfolio.githubUrl || '',
  duration: props.portfolio.duration || '',
  client: props.portfolio.client || ''
});

// Technologies as comma-separated string
const technologiesInput = ref(
  Array.isArray(props.portfolio.technologies) 
    ? props.portfolio.technologies.join(', ') 
    : ''
);

// Features as newline-separated string
const featuresInput = ref(
  Array.isArray(props.portfolio.features) 
    ? props.portfolio.features.join('\n') 
    : ''
);

const handleSubmit = async () => {
  errorMessage.value = '';
  successMessage.value = '';
  isLoading.value = true;

  try {
    // Parse technologies and features
    const technologies = technologiesInput.value
      .split(',')
      .map(t => t.trim())
      .filter(t => t.length > 0);
    
    const features = featuresInput.value
      .split('\n')
      .map(f => f.trim())
      .filter(f => f.length > 0);

    // Prepare update data
    const updateData = {
      ...formData.value,
      technologies: technologies.length > 0 ? technologies : ['General'],
      features: features.length > 0 ? features : ['Portfolio Item']
    };

    console.log('Updating portfolio with data:', updateData);

    // Call update API
    await updatePortfolioItem(props.portfolio.id, updateData);

    successMessage.value = 'Portfolio updated successfully!';
    
    // Wait a moment to show success message
    setTimeout(() => {
      emit('updated');
      emit('close');
    }, 1000);

  } catch (error) {
    console.error('Error updating portfolio:', error);
    errorMessage.value = error.response?.data?.error || 'Failed to update portfolio. Please try again.';
  } finally {
    isLoading.value = false;
  }
};
</script>
