<template>
  <div class="space-y-8">
    <!-- Welcome Section -->
    <div class="bg-white rounded-2xl shadow-lg p-8">
      <h1 class="text-3xl font-bold text-gray-800 mb-4">Welcome to UPORT Dashboard</h1>
      <p class="text-gray-600 mb-6">
        Manage your portfolio, showcase your work, and connect with opportunities.
      </p>
      <div class="flex flex-wrap gap-4">
        <NuxtLink
          to="/dashboard/portfolio"
          class="bg-gradient-to-r from-yellow-400 to-amber-500 text-white px-6 py-3 rounded-lg hover:shadow-lg transition transform hover:scale-105"
        >
          View Portfolio
        </NuxtLink>
        <NuxtLink
          to="/profile"
          class="border-2 border-yellow-400 text-yellow-600 px-6 py-3 rounded-lg hover:bg-yellow-50 transition"
        >
          Edit Profile
        </NuxtLink>
      </div>
    </div>

    <!-- Quick Stats -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div class="bg-white rounded-2xl shadow-lg p-6">
        <div class="flex items-center">
          <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
            <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm text-gray-600">Total Projects</p>
            <p class="text-2xl font-bold text-gray-800">{{ stats.totalProjects }}</p>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-2xl shadow-lg p-6">
        <div class="flex items-center">
          <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
            <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm text-gray-600">Completed</p>
            <p class="text-2xl font-bold text-gray-800">{{ stats.completedProjects }}</p>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-2xl shadow-lg p-6">
        <div class="flex items-center">
          <div class="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
            <svg class="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm text-gray-600">Views</p>
            <p class="text-2xl font-bold text-gray-800">{{ stats.totalViews }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Recent Projects -->
    <div class="bg-white rounded-2xl shadow-lg p-8">
      <h2 class="text-2xl font-bold text-gray-800 mb-6">Recent Projects</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="project in recentProjects"
          :key="project.id"
          class="border border-gray-200 rounded-lg p-4 hover:shadow-md transition"
        >
          <div class="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg mb-4 flex items-center justify-center">
            <svg class="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          </div>
          <h3 class="font-semibold text-gray-800 mb-2">{{ project.title }}</h3>
          <p class="text-sm text-gray-600 mb-3">{{ project.description }}</p>
          <div class="flex items-center justify-between">
            <span class="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">
              {{ project.category }}
            </span>
            <NuxtLink
              :to="`/dashboard/portfolio/${project.id}`"
              class="text-yellow-600 hover:text-yellow-700 text-sm font-medium"
            >
              View →
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

// Set layout to dashboard to ensure navbar is shown
definePageMeta({
  layout: 'dashboard'
})

const { getAllPortfolioItems } = usePortfolio();
const recentProjects = ref([]);
const loading = ref(true);
const stats = ref({
  totalProjects: 0,
  completedProjects: 0,
  totalViews: 0
});

onMounted(async () => {
  await loadDashboardData();
});

const loadDashboardData = async () => {
  loading.value = true;
  try {
    const allProjects = await getAllPortfolioItems();
    
    // Calculate stats from real data
    stats.value.totalProjects = allProjects.length;
    stats.value.completedProjects = allProjects.filter(project => project.status === 'completed').length;
    stats.value.totalViews = allProjects.reduce((total, project) => total + (project.views || 0), 0);
    
    // Get the 3 most recent projects
    recentProjects.value = allProjects.slice(0, 3);
  } catch (error) {
    console.error('Error loading dashboard data:', error);
    recentProjects.value = [];
    // Keep default stats if API fails
    stats.value = {
      totalProjects: 0,
      completedProjects: 0,
      totalViews: 0
    };
  } finally {
    loading.value = false;
  }
};
</script>