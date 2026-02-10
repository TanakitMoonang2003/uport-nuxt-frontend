# Cookie Consent System Guide

## Overview
This project now includes a GDPR-compliant cookie consent popup that asks users for permission before storing cookies.

## Components Created

### 1. `CookieConsent.vue`
- **Location**: `components/CookieConsent.vue`
- **Purpose**: Displays a cookie consent popup at the bottom of the page
- **Features**:
  - Beautiful animated popup with accept/decline buttons
  - Shows cookie details when requested
  - Stores consent choice for 1 year
  - Auto-appears on first visit

### 2. `useCookieConsent.ts`
- **Location**: `composables/useCookieConsent.ts`
- **Purpose**: Manages cookie consent state across the app
- **Methods**:
  - `hasConsent`: Returns true if user accepted cookies
  - `consentGiven`: Returns true if user made any choice
  - `acceptCookies()`: Accept cookies
  - `declineCookies()`: Decline cookies
  - `resetConsent()`: Clear consent choice

### 3. Updated `useAuth.ts`
- **Purpose**: Now checks cookie consent before storing auth tokens
- **New Method**: `setToken(newToken)` - Only stores token if consent given

## How It Works

### First Visit
1. User visits the site
2. Cookie consent popup appears at the bottom (after 500ms delay)
3. User can choose to:
   - **Accept All**: Allows all cookies including auth tokens
   - **Decline**: No cookies stored, redirects to home
   - **Show Details**: View what cookies are used for

### Login Flow
1. User enters credentials
2. Backend returns auth token
3. System checks if cookie consent was given
4. If **consent given**: Token saved in cookie (7 days)
5. If **no consent**: Shows error message asking to accept cookies first

### After Consent
- **Accept**: Login works normally, stays logged in for 7 days
- **Decline**: Cannot stay logged in, must login each session

## Cookie Storage

### Cookies Used
1. **`cookie_consent`**
   - Value: `'accepted'` or `'declined'`
   - Duration: 1 year
   - Purpose: Remember user's choice

2. **`token`** (only if consent given)
   - Value: JWT authentication token
   - Duration: 7 days
   - Purpose: Keep user logged in

## Testing

### Test Cookie Consent Popup
1. Clear browser cookies
2. Visit the site
3. Cookie popup should appear at bottom
4. Click "Accept All" or "Decline"

### Test Login with Consent
1. Accept cookies (if not already)
2. Login with credentials
3. Close browser
4. Reopen → Should still be logged in

### Test Login without Consent
1. Decline cookies (or clear `cookie_consent` cookie)
2. Try to login
3. Should see error: "Please accept cookies to stay logged in..."

### Reset Consent (for testing)
Open browser console and run:
```javascript
document.cookie = "cookie_consent=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
location.reload();
```

## Customization

### Change Popup Position
Edit `CookieConsent.vue`:
```vue
<!-- Top instead of bottom -->
<div class="fixed top-0 left-0 right-0 ...">
```

### Change Cookie Duration
Edit `useCookieConsent.ts`:
```typescript
maxAge: 60 * 60 * 24 * 90, // 90 days instead of 365
```

### Change Token Duration
Edit `useAuth.ts`:
```typescript
maxAge: 60 * 60 * 24 * 30, // 30 days instead of 7
```

### Customize Popup Colors
Edit `CookieConsent.vue` Tailwind classes:
```vue
<!-- Change from amber to blue -->
<button class="bg-gradient-to-r from-blue-400 to-blue-500 ...">
```

## Files Modified
- ✅ `components/CookieConsent.vue` (NEW)
- ✅ `composables/useCookieConsent.ts` (NEW)
- ✅ `composables/useAuth.ts` (UPDATED)
- ✅ `pages/auth/login.vue` (UPDATED)
- ✅ `app.vue` (UPDATED)

## User Experience Flow

```
User visits site
       ↓
Cookie consent popup appears
       ↓
User clicks "Accept" → Consent stored → Can login and stay logged in
       ↓
User clicks "Decline" → Consent denied → Cannot stay logged in
```

## Privacy Compliance
- ✅ GDPR Compliant
- ✅ User must actively consent
- ✅ Clear explanation of cookie usage
- ✅ Option to decline
- ✅ Consent stored for appropriate duration
- ✅ No cookies set before consent (except the consent cookie itself)

## Troubleshooting

### Popup doesn't appear
- Clear all cookies and reload
- Check browser console for errors

### Login doesn't save
- Make sure you clicked "Accept All" in cookie popup
- Check cookie consent value in browser DevTools → Application → Cookies

### Popup appears every time
- Cookie consent might not be saving
- Check that cookies are enabled in browser

## Future Enhancements
- Add cookie policy page link
- Add "Manage Preferences" option
- Analytics cookies (optional)
- Remember user preference across subdomains

