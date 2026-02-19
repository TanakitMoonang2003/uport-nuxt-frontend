export const useAuth = () => {
  // Only log in client-side to avoid SSR noise
  if (import.meta.client) {
   
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
    
      localStorage.removeItem('auth_token')
    
    }
  }
  
  // Force reactivity with ref - use useState for global state
  const forceUpdate = useState('auth-force-update', () => 0)
  
  const user = computed(() => {
    // Force reactivity by accessing forceUpdate
    forceUpdate.value
    
    // Only log in client-side
    if (import.meta.client) {
     
    }
    
    // Try to get token from cookie first, then localStorage
    let currentToken: string | null = token.value
    
    if (!currentToken && import.meta.client) {
      currentToken = getTokenFromStorage()
    }
    
    if (!currentToken) {
      // Only log in client-side
      if (import.meta.client) {
      }
      return null
    }
    
    try {
      // Decode JWT token to get user info
      const parts = currentToken!.split('.')
 
      
      if (parts.length !== 3) {
 
        return null
      }
      
      const base64 = parts[1].replace(/-/g, '+').replace(/_/g, '/')
      const padded = base64.padEnd(base64.length + (4 - base64.length % 4) % 4, '=')
      const payload = JSON.parse(atob(padded))
      const userData = {
        id: payload.userId || null,
        email: payload.email || '',
        username: payload.username || '',
        role: payload.role || 'user'
      }
      
      // Only log in client-side to avoid SSR noise
      if (import.meta.client) {
     
        
        if (userData.role === 'admin') {
       
        } else if (userData.role === 'teacher') {
         
        } else if (userData.role === 'user') {
          
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
  
    
    // Set token in cookie
    tokenCookie.value = newToken
    
    // Also set in localStorage as backup
    setTokenToStorage(newToken)
    
    // Force reactivity update
    forceUpdate.value++
    

    
    // Verify token is actually stored

  }

  const logout = async () => {

    
    // Clear token from cookie
    tokenCookie.value = null

    
    // Clear token from localStorage
    removeTokenFromStorage()

    
    // Force reactivity update
    forceUpdate.value++

    
    // Navigate to login page

    try {
      await navigateTo('/auth/login')
  
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


