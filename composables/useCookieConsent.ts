export const useCookieConsent = () => {
  const cookieConsent = useCookie('cookie_consent', {
    maxAge: 60 * 60 * 24 * 365, // 1 year
    sameSite: 'lax',
    path: '/'
  })

  const hasConsent = computed(() => {
    return cookieConsent.value === 'accepted'
  })

  const consentGiven = computed(() => {
    return cookieConsent.value !== undefined && cookieConsent.value !== null
  })

  const acceptCookies = () => {
    cookieConsent.value = 'accepted'
  }

  const declineCookies = () => {
    cookieConsent.value = 'declined'
  }

  const resetConsent = () => {
    cookieConsent.value = null
  }

  return {
    hasConsent,
    consentGiven,
    acceptCookies,
    declineCookies,
    resetConsent,
    cookieConsent
  }
}

