export const useAuth = () => {
  // Only log in client-side to avoid SSR noise
  if (import.meta.client) {
    console.log('=== USE AUTH - CREATING/ACCESSING INSTANCE ===');
  }
  
  const { hasConsent } = useCookieConsent()
  
  // Set cookie with 7 days expiration
  const tokenCookie = useCookie<string | null>('token', {
    maxAge: 60 * 60 * 24 * 7, // 7 days in seconds
    sameSite: 'lax',
    secure: false, // Set to false for development
    httpOnly: false, // Allow client-side access
    path: '/',
    default: () => null
  })
  
  // Alternative storage using localStorage as backup
  const getTokenFromStorage = () => {
    if (import.meta.client && typeof window !== 'undefined' && window.localStorage) {
      try {
        const token = localStorage.getItem('auth_token')
        return token
      } catch (e) {
        return null
      }
    }
    return null
  }
  
  const getTokenFromCookie = () => {
    if (import.meta.client && typeof document !== 'undefined' && document.cookie) {
      try {
        const cookieToken = document.cookie
          .split('; ')
          .find(row => row.startsWith('token='))
          ?.split('=')[1];
        return cookieToken || null;
      } catch (e) {
        return null
      }
    }
    return null
  }
  
  // Enhanced token getter that checks multiple sources
  const token = computed(() => {
    // Force reactivity by accessing forceUpdate
    forceUpdate.value
    
    // Always check cookie first (works in both SSR and client)
    let currentToken: string | null = tokenCookie.value;
    
    // If cookie token is null and we're on client, try localStorage
    if (!currentToken && import.meta.client) {
      currentToken = getTokenFromStorage();
    }
    
    // If still null and we're on client, try document.cookie directly
    if (!currentToken && import.meta.client) {
      currentToken = getTokenFromCookie() || null;
    }
    
    // Only log in client-side to avoid SSR noise
    if (import.meta.client) {
      console.log('🔍 Token computed - cookie:', tokenCookie.value, 'localStorage:', getTokenFromStorage(), 'document.cookie:', getTokenFromCookie(), 'final:', currentToken);
    }
    
    return currentToken;
  })
  
  const setTokenToStorage = (tokenValue: string) => {
    if (import.meta.client && typeof window !== 'undefined' && window.localStorage) {
      try {
        localStorage.setItem('auth_token', tokenValue)
      } catch (e) {
        console.error('Failed to set token to localStorage:', e);
      }
    }
  }
  
  const removeTokenFromStorage = () => {
    if (import.meta.client) {
      console.log('Removing token from localStorage');
      localStorage.removeItem('auth_token')
      console.log('Token removed from localStorage');
    }
  }
  
  // Force reactivity with ref - use useState for global state
  const forceUpdate = useState('auth-force-update', () => 0)
  
  const user = computed(() => {
    // Force reactivity by accessing forceUpdate
    forceUpdate.value
    
    // Only log in client-side
    if (import.meta.client) {
      console.log('=== USER COMPUTED TRIGGERED ===');
      console.log('Token value:', token.value);
    }
    
    // Try to get token from cookie first, then localStorage
    let currentToken: string | null = token.value
    
    if (!currentToken && import.meta.client) {
      currentToken = getTokenFromStorage()
    }
    
    if (!currentToken) {
      // Only log in client-side
      if (import.meta.client) {
        console.log('No token found in cookie or localStorage');
      }
      return null
    }
    
    try {
      // Decode JWT token to get user info
      const parts = currentToken!.split('.')
      console.log('Token parts length:', parts.length);
      
      if (parts.length !== 3) {
        console.log('Invalid token format');
        return null
      }
      
      const payload = JSON.parse(atob(parts[1]))
      const userData = {
        id: payload.userId || null,
        email: payload.email || '',
        username: payload.username || '',
        role: payload.role || 'user'
      }
      
      // Only log in client-side to avoid SSR noise
      if (import.meta.client) {
        console.log('=== AUTH ROLE CHECK ===');
        console.log('Token exists:', !!currentToken);
        console.log('User data:', userData);
        console.log('User role:', userData.role);
        
        if (userData.role === 'admin') {
          console.log('🎯 ADMIN ROLE DETECTED in useAuth');
        } else if (userData.role === 'teacher') {
          console.log('👨‍🏫 TEACHER ROLE DETECTED in useAuth');
        } else if (userData.role === 'user') {
          console.log('👤 USER ROLE DETECTED in useAuth');
        }
      }
      
      return userData
    } catch (error) {
      console.error('Error decoding token:', error)
      return null
    }
  })

  const isAuthenticated = computed(() => {
    // Force reactivity by accessing forceUpdate
    forceUpdate.value
    
    // Check both cookie and localStorage
    const cookieToken = token.value
    const storageToken = import.meta.client ? getTokenFromStorage() : null
    const hasToken = !!(cookieToken || storageToken)
    
    return hasToken && !!user.value
  })

  const setToken = (newToken: string) => {
    console.log('Setting token in useAuth:', newToken);
    console.log('Cookie consent status:', hasConsent.value);
    console.log('Cookie consent value:', useCookie('cookie_consent').value);
    
    // Set token in cookie
    tokenCookie.value = newToken
    
    // Also set in localStorage as backup
    setTokenToStorage(newToken)
    
    // Force reactivity update
    forceUpdate.value++
    
    console.log('Token set, user should be:', user.value);
    console.log('Force update triggered, value:', forceUpdate.value);
    console.log('Token value after setting:', token.value);
    
    // Verify token is actually stored
    console.log('Verification - token in cookie:', tokenCookie.value);
    console.log('Verification - token in localStorage:', getTokenFromStorage());
  }

  const logout = async () => {
    console.log('=== LOGOUT INITIATED ===');
    
    // Clear token from cookie
    tokenCookie.value = null
    console.log('Token cookie cleared:', tokenCookie.value);
    
    // Clear token from localStorage
    removeTokenFromStorage()
    console.log('Token removed from localStorage');
    
    // Force reactivity update
    forceUpdate.value++
    console.log('Force update triggered, value:', forceUpdate.value);
    
    // Navigate to login page
    console.log('Navigating to login page...');
    try {
      await navigateTo('/auth/login')
      console.log('✅ Successfully navigated to login page');
    } catch (error) {
      console.error('❌ Error navigating to login page:', error);
      // Fallback: redirect using window.location
      if (import.meta.client) {
        window.location.href = '/auth/login';
      }
    }
  }

  return {
    user,
    token,
    isAuthenticated,
    logout,
    setToken,
    hasConsent,
    forceUpdate
  }
}


