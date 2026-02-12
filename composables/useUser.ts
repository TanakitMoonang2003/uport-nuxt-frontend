export const useUser = () => {
  // Get user profile from API
  const getUserProfile = async () => {
    try {
      const token = useCookie('token')?.value;
      if (!token) {
        throw new Error('No authentication token found');
      }

      const { $api } = useNuxtApp();
      const response = await $api.get('/user/profile');

      // Backend returns { success, data }
      if (response.data?.success && response.data.data) {
        return response.data.data;
      }

      return response.data || response;
    } catch (error) {
      console.error('Error fetching user profile:', error);
      throw error;
    }
  };

  // Update user profile
  const updateUserProfile = async (profileData: any) => {
    try {
      const token = useCookie('token')?.value;
      if (!token) {
        throw new Error('No authentication token found');
      }

      const { $api } = useNuxtApp();
      const response = await $api.put('/user/profile', profileData);

      // Backend returns { success, data }
      if (response.data?.success && response.data.data) {
        return response.data.data;
      }

      return response.data || response;
    } catch (error) {
      console.error('Error updating user profile:', error);
      throw error;
    }
  };

  // Upload avatar image
  const uploadAvatar = async (file: File) => {
    try {
      const token = useCookie('token')?.value;
      if (!token) {
        throw new Error('No authentication token found');
      }

      const formData = new FormData();
      formData.append('file', file);

      const { $api } = useNuxtApp();
      const response = await $api.post('/user/profile/avatar', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      return response.data || response;
    } catch (error) {
      console.error('Error uploading avatar:', error);
      throw error;
    }
  };

  // Check if user is authenticated
  const isAuthenticated = () => {
    const token = useCookie('token')?.value;
    return !!token;
  };

  // Logout user - Note: Use useAuth().logout() instead for full logout functionality
  const logout = () => {
    const token = useCookie('token');
    token.value = null;
    navigateTo('/auth/login');
  };

  // Get current user data
  const user = computed(() => {
    const token = useCookie('token')?.value;
    if (!token) return null;

    try {
      // Decode JWT token to get user info
      const parts = token.split('.');
      if (parts.length !== 3) return null;

      const payload = JSON.parse(atob(parts[1]));
      return {
        id: payload.userId || null,
        email: payload.email || '',
        username: payload.username || '',
        role: payload.role || 'user'
      };
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  });

  return {
    getUserProfile,
    updateUserProfile,
    uploadAvatar,
    isAuthenticated,
    logout,
    user
  };
};
