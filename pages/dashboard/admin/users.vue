<template>
  <div class="min-h-screen bg-gray-50 py-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900">User Management</h1>
        <p class="mt-2 text-gray-600">Manage all users in the system</p>
      </div>

      <!-- Stats Cards -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div class="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                </svg>
              </div>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-500">Total Users</p>
              <p class="text-2xl font-semibold text-gray-900">{{ stats.totalUsers }}</p>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div class="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-500">Active Users</p>
              <p class="text-2xl font-semibold text-gray-900">{{ stats.activeUsers }}</p>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div class="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
                <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-500">Teachers</p>
              <p class="text-2xl font-semibold text-gray-900">{{ stats.teachers }}</p>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div class="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-500">Admins</p>
              <p class="text-2xl font-semibold text-gray-900">{{ stats.admins }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Search and Filters -->
      <div class="bg-white rounded-lg shadow mb-6 p-6">
        <div class="flex flex-col sm:flex-row gap-4">
          <div class="flex-1">
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search users by name, email, or role..."
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
            />
          </div>
          <div class="flex gap-2">
            <select
              v-model="roleFilter"
              class="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
            >
              <option value="">All Roles</option>
              <option value="admin">Admin</option>
              <option value="teacher">Teacher</option>
              <option value="user">User</option>
            </select>
            <button
              @click="refreshUsers"
              class="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition"
            >
              Refresh
            </button>
          </div>
        </div>
      </div>

      <!-- Users Table -->
      <div class="bg-white rounded-lg shadow overflow-hidden">
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Created
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="user in filteredUsers" :key="user.id" class="hover:bg-gray-50">
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <div class="flex-shrink-0 h-10 w-10">
                      <div class="h-10 w-10 rounded-full bg-gradient-to-br from-yellow-400 to-amber-500 flex items-center justify-center">
                        <span class="text-white font-medium">{{ user.username?.charAt(0)?.toUpperCase() || 'U' }}</span>
                      </div>
                    </div>
                    <div class="ml-4">
                      <div class="text-sm font-medium text-gray-900">{{ user.username }}</div>
                      <div class="text-sm text-gray-500">{{ user.email }}</div>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span
                    :class="{
                      'bg-red-100 text-red-800': user.role === 'admin',
                      'bg-yellow-100 text-yellow-800': user.role === 'teacher',
                      'bg-blue-100 text-blue-800': user.role === 'user'
                    }"
                    class="inline-flex px-2 py-1 text-xs font-semibold rounded-full"
                  >
                    {{ user.role }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span
                    :class="{
                      'bg-green-100 text-green-800': user.isActive,
                      'bg-gray-100 text-gray-800': !user.isActive
                    }"
                    class="inline-flex px-2 py-1 text-xs font-semibold rounded-full"
                  >
                    {{ user.isActive ? 'Active' : 'Inactive' }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {{ formatDate(user.createdAt) }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div class="flex space-x-2">
                    <button
                      @click="editUser(user)"
                      class="text-yellow-600 hover:text-yellow-900 transition"
                    >
                      Edit
                    </button>
                    <button
                      @click="toggleUserStatus(user)"
                      :class="{
                        'text-green-600 hover:text-green-900': !user.isActive,
                        'text-orange-600 hover:text-orange-900': user.isActive
                      }"
                      class="transition"
                    >
                      {{ user.isActive ? 'Deactivate' : 'Activate' }}
                    </button>
                    <button
                      v-if="user.role !== 'admin'"
                      @click="deleteUser(user)"
                      class="text-red-600 hover:text-red-900 transition"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Pagination -->
        <div class="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
          <div class="flex-1 flex justify-between sm:hidden">
            <button
              @click="previousPage"
              :disabled="currentPage === 1"
              class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <button
              @click="nextPage"
              :disabled="currentPage === totalPages"
              class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
          <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p class="text-sm text-gray-700">
                Showing {{ (currentPage - 1) * itemsPerPage + 1 }} to {{ Math.min(currentPage * itemsPerPage, users.length) }} of {{ users.length }} results
              </p>
            </div>
            <div>
              <nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                <button
                  @click="previousPage"
                  :disabled="currentPage === 1"
                  class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                <button
                  v-for="page in visiblePages"
                  :key="page"
                  @click="goToPage(page)"
                  :class="{
                    'bg-yellow-50 border-yellow-500 text-yellow-600': page === currentPage,
                    'bg-white border-gray-300 text-gray-500 hover:bg-gray-50': page !== currentPage
                  }"
                  class="relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                >
                  {{ page }}
                </button>
                <button
                  @click="nextPage"
                  :disabled="currentPage === totalPages"
                  class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Edit User Modal -->
    <div v-if="showEditModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div class="mt-3">
          <h3 class="text-lg font-medium text-gray-900 mb-4">Edit User</h3>
          <form @submit.prevent="saveUser">
            <div class="mb-4">
              <label class="block text-sm font-medium text-gray-700 mb-2">Username</label>
              <input
                v-model="editingUser.username"
                type="text"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                required
              />
            </div>
            <div class="mb-4">
              <label class="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input
                v-model="editingUser.email"
                type="email"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                required
              />
            </div>
            <div class="mb-4">
              <label class="block text-sm font-medium text-gray-700 mb-2">Role</label>
              <select
                v-model="editingUser.role"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
              >
                <option value="user">User</option>
                <option value="teacher">Teacher</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <div class="flex justify-end space-x-3">
              <button
                type="button"
                @click="showEditModal = false"
                class="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                class="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useToast } from '~/composables/useToast'
const { success: toastSuccess, error: toastError } = useToast()
const config = useRuntimeConfig()
const apiBase = config.public.apiBase.replace(/\/api$/, '')

// Check if user is admin
const { user, isAuthenticated, token } = useAuth()

// Redirect if not admin
if (!isAuthenticated.value || user.value?.role !== 'admin') {
  navigateTo('/dashboard/portfolio')
}

// Reactive data
const users = ref([])
const searchQuery = ref('')
const roleFilter = ref('')
const currentPage = ref(1)
const itemsPerPage = 10
const showEditModal = ref(false)
const editingUser = ref({})

// Computed properties
const stats = computed(() => {
  const totalUsers = users.value.length
  const activeUsers = users.value.filter(u => u.isActive).length
  const teachers = users.value.filter(u => u.role === 'teacher').length
  const admins = users.value.filter(u => u.role === 'admin').length
  
  return { totalUsers, activeUsers, teachers, admins }
})

const filteredUsers = computed(() => {
  let filtered = users.value

  // Filter by search query
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(user => 
      user.username?.toLowerCase().includes(query) ||
      user.email?.toLowerCase().includes(query) ||
      user.role?.toLowerCase().includes(query)
    )
  }

  // Filter by role
  if (roleFilter.value) {
    filtered = filtered.filter(user => user.role === roleFilter.value)
  }

  // Pagination
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return filtered.slice(start, end)
})

const totalPages = computed(() => {
  return Math.ceil(users.value.length / itemsPerPage)
})

const visiblePages = computed(() => {
  const pages = []
  const start = Math.max(1, currentPage.value - 2)
  const end = Math.min(totalPages.value, currentPage.value + 2)
  
  for (let i = start; i <= end; i++) {
    pages.push(i)
  }
  return pages
})

// Methods
const fetchUsers = async () => {
  try {
    const { token } = useAuth();
    
    // Get token from multiple sources
    let authToken = token.value;
    if (!authToken && import.meta.client) {
      authToken = localStorage.getItem('auth_token');
    }
    if (!authToken && import.meta.client) {
      const cookieToken = document.cookie
        .split('; ')
        .find(row => row.startsWith('token='))
        ?.split('=')[1];
      authToken = cookieToken;
    }
    
    if (!authToken) {
      throw new Error('No authentication token found');
    }
    
    const response = await $fetch('/api/admin/users', {
      method: 'GET',
      baseURL: apiBase,
      headers: {
        'Authorization': `Bearer ${authToken}`,
        'Content-Type': 'application/json',
      }
    });

    if (response.success) {
      users.value = response.data
    } else {
      throw new Error(response.error || 'Failed to fetch users')
    }
  } catch (error) {
    console.error('Error fetching users:', error)
    // Show empty state if API fails
    users.value = []
    toastError(error.message || 'Failed to fetch users')
  }
}

const refreshUsers = () => {
  fetchUsers()
}

const editUser = (user) => {
  editingUser.value = { ...user }
  showEditModal.value = true
}

const saveUser = async () => {
  try {
    const { $api } = useNuxtApp();
    const { token } = useAuth();
    
    // Get token from multiple sources
    let authToken = token.value;
    if (!authToken && import.meta.client) {
      authToken = localStorage.getItem('auth_token');
    }
    if (!authToken && import.meta.client) {
      const cookieToken = document.cookie
        .split('; ')
        .find(row => row.startsWith('token='))
        ?.split('=')[1];
      authToken = cookieToken;
    }
    
    if (!authToken) {
      throw new Error('No authentication token found');
    }
    
    const response = await $fetch(`/api/admin/users/${editingUser.value._id || editingUser.value.id}`, {
      method: 'PUT',
      baseURL: apiBase,
      headers: {
        'Authorization': `Bearer ${authToken}`,
        'Content-Type': 'application/json',
      },
      body: {
        username: editingUser.value.username,
        email: editingUser.value.email,
        role: editingUser.value.role
      }
    });
    
    if (response.success) {
      showEditModal.value = false
      toastSuccess('User updated successfully!')
      await fetchUsers()
    } else {
      throw new Error(response.error || 'Failed to update user')
    }
  } catch (error) {
    console.error('Error saving user:', error)
    toastError(error.message || 'Failed to update user')
  }
}

const toggleUserStatus = async (user) => {
  try {
    const { token } = useAuth();
    
    // Get token from multiple sources
    let authToken = token.value;
    if (!authToken && import.meta.client) {
      authToken = localStorage.getItem('auth_token');
    }
    if (!authToken && import.meta.client) {
      const cookieToken = document.cookie
        .split('; ')
        .find(row => row.startsWith('token='))
        ?.split('=')[1];
      authToken = cookieToken;
    }
    
    if (!authToken) {
      throw new Error('No authentication token found');
    }
    
    const userId = user._id || user.id;
    const response = await $fetch(`/api/admin/users/${userId}/status`, {
      method: 'POST',
      baseURL: apiBase,
      headers: {
        'Authorization': `Bearer ${authToken}`,
        'Content-Type': 'application/json',
      }
    });
    
    if (response.success) {
      const userIndex = users.value.findIndex(u => (u._id || u.id) === userId);
      if (userIndex !== -1) {
        users.value[userIndex].isActive = response.data.isActive;
      }
      toastSuccess(`User ${response.data.isActive ? 'activated' : 'deactivated'} successfully!`)
      await fetchUsers()
    } else {
      throw new Error(response.error || 'Failed to toggle user status')
    }
  } catch (error) {
    console.error('Error toggling user status:', error)
    toastError(error.message || 'Failed to toggle user status')
  }
}

const deleteUser = async (user) => {
  if (confirm(`Are you sure you want to delete ${user.username}? This action cannot be undone.`)) {
    try {
      const { token } = useAuth();
      
      // Get token from multiple sources
      let authToken = token.value;
      if (!authToken && import.meta.client) {
        authToken = localStorage.getItem('auth_token');
      }
      if (!authToken && import.meta.client) {
        const cookieToken = document.cookie
          .split('; ')
          .find(row => row.startsWith('token='))
          ?.split('=')[1];
        authToken = cookieToken;
      }
      
      if (!authToken) {
        throw new Error('No authentication token found');
      }
      
      const userId = user._id || user.id;
      const response = await $fetch(`/api/admin/users/${userId}`, {
        method: 'DELETE',
        baseURL: apiBase,
        headers: {
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'application/json',
        }
      });
      
      if (response.success) {
        users.value = users.value.filter(u => (u._id || u.id) !== userId);
        toastSuccess('User deleted successfully!')
        await fetchUsers()
      } else {
        throw new Error(response.error || 'Failed to delete user')
      }
    } catch (error) {
      console.error('Error deleting user:', error)
      toastError(error.message || 'Failed to delete user')
    }
  }
}

const formatDate = (date) => {
  return new Date(date).toLocaleDateString()
}

const previousPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
  }
}

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
  }
}

const goToPage = (page) => {
  currentPage.value = page
}

// Lifecycle
onMounted(() => {
  fetchUsers()
})
</script>
