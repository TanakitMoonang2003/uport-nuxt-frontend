<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Login Modal -->
    <LoginModal :is-open="showLoginModal" @close="showLoginModal = false" />
    <div class="max-w-4xl mx-auto px-4 py-8">
      <!-- Profile Header -->
      <div class="bg-white rounded-2xl shadow-lg p-8 mb-8">
        <div class="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
          <!-- Profile Picture -->
          <div class="relative">
            <img
              :src="userProfile?.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop'"
              :alt="userProfile?.name || 'Profile'"
              class="w-32 h-32 rounded-full object-cover border-4 border-yellow-400"
            />
            <button class="absolute bottom-0 right-0 bg-yellow-500 text-white rounded-full p-2 hover:bg-yellow-600 transition">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </button>
          </div>
          
          <!-- Profile Info -->
          <div class="flex-1 text-center md:text-left">
            <h1 class="text-3xl font-bold text-gray-800 mb-2">{{ userProfile?.name || 'Loading...' }}</h1>
            <p class="text-xl text-gray-600 mb-4">{{ userProfile?.title || 'Loading...' }}</p>
            <p class="text-gray-600 mb-6">{{ userProfile?.bio || 'Loading...' }}</p>
            
            <!-- Social Links -->
            <div class="flex flex-wrap justify-center md:justify-start gap-4">
              <a
                v-for="social in (userProfile?.socialLinks || [])"
                :key="social.name"
                :href="social.url"
                class="flex items-center bg-gray-100 hover:bg-yellow-100 text-gray-700 hover:text-yellow-700 px-4 py-2 rounded-lg transition"
              >
                <component :is="social.icon" class="w-5 h-5 mr-2" />
                {{ social.name }}
              </a>
            </div>
          </div>
          
          <!-- Action Buttons -->
          <div class="flex space-x-4">
            <button 
              @click="viewPortfolio"
              class="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-lg hover:shadow-lg transition transform hover:scale-105"
            >
              View Portfolio
            </button>
            <button 
              @click="editProfile"
              class="bg-gradient-to-r from-yellow-400 to-amber-500 text-white px-6 py-3 rounded-lg hover:shadow-lg transition transform hover:scale-105"
            >
              Edit Profile
            </button>
          </div>
        </div>
      </div>

      <!-- Profile Content -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Main Content -->
        <div class="lg:col-span-2 space-y-8">
          <!-- About Section -->
          <div class="bg-white rounded-2xl shadow-lg p-8">
            <h2 class="text-2xl font-bold text-gray-800 mb-6">About Me</h2>
            <p class="text-gray-600 leading-relaxed">{{ userProfile?.about || 'No information available' }}</p>
          </div>

          <!-- Skills Section -->
          <div class="bg-white rounded-2xl shadow-lg p-8">
            <h2 class="text-2xl font-bold text-gray-800 mb-6">Skills & Technologies</h2>
            <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div
                v-for="skill in (userProfile?.skills || [])"
                :key="skill.name"
                class="flex items-center p-4 bg-gradient-to-r from-yellow-50 to-amber-50 rounded-lg"
              >
                <div class="w-10 h-10 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-lg flex items-center justify-center text-white font-bold mr-3">
                  {{ skill.name.charAt(0) }}
                </div>
                <div>
                  <p class="font-semibold text-gray-800">{{ skill.name }}</p>
                  <p class="text-sm text-gray-600">{{ skill.level }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Experience Section -->
          <div class="bg-white rounded-2xl shadow-lg p-8">
            <h2 class="text-2xl font-bold text-gray-800 mb-6">Experience</h2>
            <div class="space-y-6">
              <div
                v-for="exp in (userProfile?.experience || [])"
                :key="exp.id"
                class="border-l-4 border-yellow-400 pl-6 pb-6"
              >
                <h3 class="text-xl font-semibold text-gray-800">{{ exp.position }}</h3>
                <p class="text-yellow-600 font-medium">{{ exp.company }}</p>
                <p class="text-gray-600 text-sm">{{ exp.duration }}</p>
                <p class="text-gray-600 mt-2">{{ exp.description }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Sidebar -->
        <div class="space-y-8">
          <!-- Contact Info -->
          <div class="bg-white rounded-2xl shadow-lg p-6">
            <h3 class="text-xl font-bold text-gray-800 mb-4">Contact Information</h3>
            <div class="space-y-4">
              <div class="flex items-center">
                <svg class="w-5 h-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span class="text-gray-600">{{ userProfile?.email || 'Not provided' }}</span>
              </div>
              <div class="flex items-center">
                <svg class="w-5 h-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span class="text-gray-600">{{ userProfile?.phone || 'Not provided' }}</span>
              </div>
              <div class="flex items-center">
                <svg class="w-5 h-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span class="text-gray-600">{{ userProfile?.location || 'Not specified' }}</span>
              </div>
            </div>
          </div>

          <!-- Stats -->
          <div class="bg-white rounded-2xl shadow-lg p-6">
            <h3 class="text-xl font-bold text-gray-800 mb-4">Statistics</h3>
            <div class="space-y-4">
              <div class="flex justify-between items-center">
                <span class="text-gray-600">Projects Completed</span>
                <span class="font-bold text-yellow-600">{{ userProfile?.stats?.projects || 0 }}</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-gray-600">Years Experience</span>
                <span class="font-bold text-yellow-600">{{ userProfile?.stats?.experience || 0 }}</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-gray-600">Happy Clients</span>
                <span class="font-bold text-yellow-600">{{ userProfile?.stats?.clients || 0 }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const { getUserProfile, isAuthenticated, user } = useUser();
const userProfile = ref(null);
const loading = ref(true);
const showLoginModal = ref(false);

onMounted(async () => {
  // Check if user is authenticated
  if (!isAuthenticated()) {
    showLoginModal.value = true;
    return;
  }
  
  await loadUserProfile();
});

const loadUserProfile = async () => {
  loading.value = true;
  try {
    if (!isAuthenticated()) {
      await navigateTo('/auth/login');
      return;
    }
    
    const profile = await getUserProfile();
    if (profile) {
      userProfile.value = {
        name: `${profile.firstName || ''} ${profile.lastName || ''}`.trim() || profile.username,
        title: profile.userType === 'student' ? 'Student' : 'Teacher',
        bio: profile.bio || `Passionate ${profile.userType} with experience in modern technologies.`,
        avatar: profile.avatar || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
        email: profile.email,
        phone: profile.phone || 'Not provided',
        location: profile.location || 'Not specified',
        about: profile.about || `I'm a ${profile.userType} passionate about technology and innovation.`,
        skills: profile.skills || [
          { name: "Web Development", level: "Advanced" },
          { name: "JavaScript", level: "Advanced" },
          { name: "React", level: "Intermediate" },
          { name: "Node.js", level: "Intermediate" }
        ],
        experience: profile.experience || [],
        socialLinks: profile.socialLinks || [],
        stats: {
          projects: profile.projectsCount || 0,
          experience: profile.experienceYears || 1,
          clients: profile.clientsCount || 0
        }
      };
    }
  } catch (error) {
    console.error('Error loading user profile:', error);
  } finally {
    loading.value = false;
  }
};

// Icon components
const GitHubIcon = {
  template: `
    <svg fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
    </svg>
  `
};

const LinkedInIcon = {
  template: `
    <svg fill="currentColor" viewBox="0 0 24 24">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  `
};

const TwitterIcon = {
  template: `
    <svg fill="currentColor" viewBox="0 0 24 24">
      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
    </svg>
  `
};

// Edit profile function
const editProfile = () => {
  navigateTo('/profile/edit');
};

// View portfolio function
const viewPortfolio = () => {
  navigateTo('/dashboard/portfolio');
};
</script>